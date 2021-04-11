let htmlSource = document.getElementById('source');
let htmlTarget = document.getElementById('target');
let submitButton = document.getElementById('submit');
let openTagsRegex = /<\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/g
let closeTagsRegex = /<\s*\/\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)\s*>/g
let allTagsRegex = /<\s*\/?\s*(html|head|meta|script|title|link|body|div|p|h1|h2|h3|h4|h5|h6|ul|ol|li|a|strong|em|span|code|table|tr|td|form|button|br|input|option|select|textarea)[^><]*>/g
let onlyText = />([^><]+)</g;


// function pairTagRegex(a) {
//     return new RegExp('<\s*' + a + '[^><]*>(.*?)<\s*\/\s*' + a + '\s*');
// }

submitButton.onclick = function () {
    let text = htmlSource.value
    let textNoEnter = text.replace(/\n/g, '')
    let textArray = arrayText(textNoEnter)
    let textIndent = indentText(textArray)
    htmlTarget.textContent = indentText(textIndent);
}

function arrayText(text) {
    let textArray = []
    let word = ''
    for (let i = 0; i < text.length; i++) {
        if (allTagsRegex.test(word) || onlyText.test(text[i-word.length-1] + word + text[i])) {
            textArray.push(word)
            console.log(word)
            word = ''
        }
        word += text[i]
    }
    // console.log(textArray)
    return textArray
}

function indentText(text) {
    return text;
}
