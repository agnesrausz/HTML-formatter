let htmlSource = document.getElementById('source');
let htmlTarget = document.getElementById('target');
let submitButton = document.getElementById('submit');
let openTagsRegexG = /<\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/g;
let openTagsRegex = /<\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/;
let closeTagsRegexG = /<\s*\/\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)\s*>/g;
let closeTagsRegex = /<\s*\/\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)\s*>/;
let allTagsRegexG = /<\s*\/?\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/g;
let allTagsRegex = /<\s*\/?\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/;
let tagsRegexG = /<\s*\/?\s*(\w*\d*-*)[^><]*>/g;
let tagsRegex = /<\s*\/?\s*(\w*\d*-*)[^><]*>/;
let onlyTextG = />([^><]+)</g;
let onlyText = />([^><]+)</;  //  >text< add angle brackets to string when try to test
let selfClosingTagsRegexG = /<\s*(br|meta|input|link)[^><]*>/g;
let selfClosingTagsRegex = /<\s*(br|meta|input|link)[^><]*>/;

// function pairTagRegex(a) {
//     return new RegExp('<\s*' + a + '[^><]*>(.*?)<\s*\/\s*' + a + '\s*>');
// }

submitButton.onclick = function () {
    let text = htmlSource.value;
    let textNoEnterNoTab = text.replace(/\n/g, '').replace(/\t/g, '').replace(/\s\s\s+/g, '');
    let textArray = arrayText(textNoEnterNoTab);
    let textIndent = indentText(textArray);
    htmlTarget.textContent = textIndent;
}

function arrayText(text) {
    let textArray = [];
    let word = '';
    for (let i = 0; i < text.length; i++) {
        if (allTagsRegexG.test(word) || onlyTextG.test(text[i-word.length-1] + word + text[i])) {
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
    let tagList = []
    for (let i = 0; i < text.length; i++) {

        if (selfClosingTagsRegex.test(text[i])) {
            if (text[i] === '<br>') {
                textIndent += text[i] + '\n';
            }else {
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            }
        }else if (closeTagsRegex.test(text[i]) && (onlyText.test('>'+text[i-1]+'<') || (tagPair(tagList[tagList.length-1],text[i]) && tagList[tagList.length-1] === text[i-1] ))) { // nem jó mert az összes close tag elé belerakja de nekünk csak ott kell ahol nincs közte semmi
            textIndent += text[i] + '\n';
            indentationRate += -1;
            tagList.pop()
        }else if (closeTagsRegex.test(text[i])) {
            indentationRate += -1;
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            tagList.pop()
        }else if (openTagsRegex.test(text[i]) && (onlyText.test('>'+text[i+1]+'<') || tagPair(text[i],text[i+1]))) {
            textIndent += indentation.repeat(indentationRate) + text[i];
            indentationRate += 1;
            tagList.push(text[i])
        }else if (openTagsRegex.test(text[i])) {
            textIndent += indentation.repeat(indentationRate) + text[i] + '\n';
            indentationRate += 1;
            tagList.push(text[i])
        }else if (onlyText.test('>'+text[i]+'<') && (tagPair(tagList[tagList.length-1],text[i+1]) || text[i+1] === '<br>')){
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

