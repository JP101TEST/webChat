function deletFrontWord(word) {
    return word.split("firebaseAuth@").join("");
}

function limitUsername(username, size) {
    let resalt = username;
    if (resalt.length > size) {
        resalt = resalt.substring(0, size) + "...";
    }
    return resalt;
}

function setDisplay(elementInPut, status) {
    elementInPut.style.display = status;
}

function setDisable(elementInPut, status) {
    elementInPut.disabled = status;
}

function setText(elementInPut, text) {
    elementInPut.innerText = text;
}

function setAttributeCustom(elementInPut, attribute, value) {
    elementInPut.setAttribute(attribute, value);
}

function setHTML(elementInPut, html) {
    elementInPut.innerHTML = html;
}

function setInputValue(elementInPut, value){
    elementInPut.value = value;
}