let htmlSource = document.getElementById('source');
let htmlTarget = document.getElementById('target');
let submitButton = document.getElementById('submit');
let openTagsRegex = /<\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/;
let closeTagsRegex = /<\s*\/\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)\s*>/;
let allTagsRegex = /<\s*\/?\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/;
let tagsRegex = /<\s*\/?\s*(\w*\d*-*)[^><]*>/;
let onlyText = />([^><]+)</;  //  >text< add angle brackets to string when try to test : '>'+ text +'<'
let selfClosingTagsRegex = /<\s*(br|meta|input|link)[^><]*>/;
let tagStartRegex = /^<\s*\/?\s*(\w*\d*-*)/;
let tagEndRegex = />$/;
let tagAttribute = /(\w*\d*-*)[^><"](=|\s+)/;
let tagValue = /"[^><=]*"/;


submitButton.onclick = function () {
    htmlTarget.textContent = ""
    let text = htmlSource.value;
    let textNoEnterNoTab = text.replace(/\n/g, '').replace(/\t/g, '').replace(/\s\s\s+/g, '');
    let textArray = arrayText(textNoEnterNoTab);
    if (invalidTag(textArray)) {
        htmlTarget.textContent = 'Not valid HTML! Unknown tag: ' + invalidTag(textArray);
    }else if (invalidNesting(textArray)){
        htmlTarget.textContent = 'Not valid HTML! No pair for ' + invalidNesting(textArray) + '!';
    }else {
        let textIndent = indentText(textArray);

        let codeColorize = colorize(arrayText(textIndent))
        htmlTarget.appendChild(codeColorize)
    }
}

function arrayText(text) {
    let textArray = [];
    let word = '';
    for (let i = 0; i < text.length; i++) {
        if (tagsRegex.test(word) || onlyText.test(text[i-word.length-1] + word + text[i])) {
            textArray.push(word);
            word = '';
        }
        word += text[i];
    }
    textArray.push(word)
    return textArray
}

function indentText(text) {
    let textIndent = "";
    let indentation = "    ";
    let indentationRate = 0;
    let currentOpenTagsList = []
    for (let i = 0; i < text.length; i++) {

        if (selfClosingTagsRegex.test(text[i])) {
            if (text[i] === '<br>') {
                textIndent += text[i] + '\n';
            }else {
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            }
        }else if (closeTagsRegex.test(text[i]) && (onlyText.test('>'+text[i-1]+'<') || (tagPair(currentOpenTagsList[currentOpenTagsList.length-1],text[i]) && currentOpenTagsList[currentOpenTagsList.length-1] === text[i-1] ))) { // nem jó mert az összes close tag elé belerakja de nekünk csak ott kell ahol nincs közte semmi
            textIndent += text[i] + '\n';
            indentationRate += -1;
            currentOpenTagsList.pop()
        }else if (closeTagsRegex.test(text[i])) {
            indentationRate += -1;
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            currentOpenTagsList.pop()
        }else if (openTagsRegex.test(text[i]) && (onlyText.test('>'+text[i+1]+'<') || tagPair(text[i],text[i+1]))) {
            textIndent += indentation.repeat(indentationRate) + text[i];
            indentationRate += 1;
            currentOpenTagsList.push(text[i])
        }else if (openTagsRegex.test(text[i])) {
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            indentationRate += 1;
            currentOpenTagsList.push(text[i])
        }else if (onlyText.test('>'+text[i]+'<') && (tagPair(currentOpenTagsList[currentOpenTagsList.length-1],text[i+1]) || text[i+1] === '<br>')){
            if (text[i-1] === '<br>'){
                textIndent += indentation.repeat(indentationRate-1) + text[i];
            }else {
                textIndent += text[i];
            }
        }else if (onlyText.test('>'+text[i]+'<') && text[i-1] === '<br>'){
            textIndent += indentation.repeat(indentationRate-1) + text[i];
        }else if (onlyText.test('>'+text[i]+'<')){
            textIndent += text[i] + '\n';
        }else {
            textIndent += '\n' + text[i] + '\n\n';
            console.log('why?  ' + text[i]);
        }
    }
    return textIndent;
}

function tagPair(openTag,closeTag) {
    let openCloseTag = openTag + closeTag;
    let tags = ['html','head','meta','script','title','link','body','div', 'p','h1','h2','h3','h4',
        'h5','h6','ul','ol','li','a','strong','em','span','code','table','tr','td', 'form','button',
        'br','input','option','select','textarea'];
    for (let tag of tags) {
        let tagRegexp = new RegExp('<\s*('+ tag +')[^><]*><\s*\/\s*('+ tag +')\s*>');
        if (tagRegexp.test(openCloseTag)) {
            return true
        }
    }
    return false
}

function invalidTag(array) {
    for(let tag of array) {
        if (tagsRegex.test(tag) && !allTagsRegex.test(tag)){
            return tag
        }
    }
    return false
}

function invalidNesting (array) {
    let currentOpenTagsList = []
    for (let i = 0; i < array.length; i++) {
        if (allTagsRegex.test(array[i]) && !selfClosingTagsRegex.test(array[i])){
            if (openTagsRegex.test(array[i])){
                currentOpenTagsList.push(array[i])
            }else if (closeTagsRegex.test(array[i])){
                if (!tagPair(currentOpenTagsList[currentOpenTagsList.length-1], array[i])) {
                    if (tagPair(currentOpenTagsList[currentOpenTagsList.length-2], array[i])) {
                        return currentOpenTagsList[currentOpenTagsList.length-1]
                    }else {
                        return array[i]
                    }
                }else {
                currentOpenTagsList.pop()
                }
            }
        }
    }
    return false
}

function colorize (array) {
    let code = document.createElement('code')
    for (let i = 0; i < array.length; i++) {
        let span = document.createElement('span')
        code.appendChild(span)
        if (tagsRegex.test(array[i])) {
            span.classList.add('tag')
            // span.textContent = array[i]
            let tagArray = arrayTag(array[i])
            for (let j = 0; j < tagArray.length; j++) {
                let spanTagPart = document.createElement('span')
                span.appendChild(spanTagPart)
                spanTagPart.textContent = tagArray[j]
                if (tagStartRegex.test(tagArray[j]) || tagArray[j-1] === '<') {
                    spanTagPart.classList.add('tag')
                }else if (tagEndRegex.test(tagArray[j])) {
                    spanTagPart.classList.add('tag')
                }else if (tagAttribute.test(tagArray[j])) {
                    spanTagPart.classList.add('attribute')
                }else if (tagValue.test(tagArray[j])) {
                    spanTagPart.classList.add('value')
                }else {console.log('tagpartcolor???')}
            }
        }else if (onlyText.test('>'+array[i]+'<')) {
            span.classList.add('text')
            span.textContent = array[i]
        }else {
            console.log('color???')
            span.textContent = array[i]
        }
    }
    return code
}

function arrayTag (text){
    let tagArray = [];
    let phrase = '';
    for (let i = 0; i < text.length; i++) {
        if (tagStartRegex.test(phrase) || tagEndRegex.test(phrase) ||
            tagAttribute.test(phrase) || tagValue.test(phrase)) {
            tagArray.push(phrase);
            phrase = '';
        }
        phrase += text[i];
    }
    tagArray.push(phrase);
    return tagArray
    }