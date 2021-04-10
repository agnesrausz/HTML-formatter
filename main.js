let htmlSource = document.getElementById('source')
let htmlTarget = document.getElementById('target')
let submitButton = document.getElementById('submit')

submitButton.onclick = function () {
    htmlTarget.textContent = htmlSource.value}
