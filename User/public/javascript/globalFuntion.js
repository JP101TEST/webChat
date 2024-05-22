/**
 * This function removes the substring "firebaseAuth@" from the given string.
 * 
 * @param {string} word - The string from which to remove the substring.
 * @returns {string} The modified string with all occurrences of "firebaseAuth@" removed.
 */
function deleteFrontWord(word) {
    return word.split("firebaseAuth@").join("");
}

/**
 * This function limits the length of a username to a specified size, appending "..." if truncated.
 * @example
 * // returns "Alexande..."
 * newUsername = limitUsername("Alexander Harold", 8);
 * @param {string} username - The username to be truncated.
 * @param {number} size - The maximum allowed length of the username.
 * @returns {string} The truncated username with "..." appended if it exceeds the specified size.
 */
function limitUsername(username, size) {
    let resalt = username;
    if (resalt.length > size) {
        resalt = resalt.substring(0, size) + "...";
    }
    return resalt;
}

/**
 * Sets the display style of an HTML element.
 *
 * @param {HTMLElement} elementInPut - The HTML element to modify.
 * @param {string} status - The display status to set (e.g., "none", "block").
 */
function setDisplay(elementInPut, status) {
    elementInPut.style.display = status;
}

/**
 * Sets the disabled property of an HTML element.
 *
 * @param {HTMLElement} elementInPut - The HTML element to modify.
 * @param {boolean} status - The disabled status to set (true to disable, false to enable).
 */
function setDisable(elementInPut, status) {
    elementInPut.disabled = status;
}

/**
 * Sets the inner text of an HTML element.
 *
 * @param {HTMLElement} elementInPut - The HTML element to modify.
 * @param {string} text - The text to set as the inner text.
 */
function setText(elementInPut, text) {
    elementInPut.innerText = text;
}

/**
 * Sets a custom attribute of an HTML element.
 *
 * @param {HTMLElement} elementInPut - The HTML element to modify.
 * @param {string} attribute - The attribute to set.
 * @param {string} value - The value to set for the attribute.
 */
function setAttributeCustom(elementInPut, attribute, value) {
    elementInPut.setAttribute(attribute, value);
}

/**
 * Sets the inner HTML of an HTML element.
 *
 * @param {HTMLElement} elementInPut - The HTML element to modify.
 * @param {string} html - The HTML string to set as the inner HTML.
 */
function setHTML(elementInPut, html) {
    elementInPut.innerHTML = html;
}

/**
 * Sets the value of an input element.
 *
 * @param {HTMLInputElement} elementInPut - The input element to modify.
 * @param {string} value - The value to set for the input element.
 */
function setInputValue(elementInPut, value){
    elementInPut.value = value;
}