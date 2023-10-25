let eventListener;
let editEventListener;
let dialogEventListener;


/**
 * Adds an event listener to handle clicks outside a specified element.
 * @param {string} elementId - The ID of the element to monitor for clicks outside.
 * @param {Function} actionOnOutsideClick - The function to execute when a click occurs outside the element.
 */
function addEventListenerForElement(elementId, actionOnOutsideClick) {
    const eventListener = function (event) {
        const element = document.getElementById(elementId);
        if (element && !element.contains(event.target)) {
            actionOnOutsideClick();
        }
    };

    document.body.addEventListener("click", eventListener);

    return eventListener;
}


/**
 * Removes the event listener added to handle clicks outside the dialogFullCardContent element.
 */
function removeDialogEventListener() {
    if (dialogEventListener) {
        document.body.removeEventListener("click", dialogEventListener);
    }
}