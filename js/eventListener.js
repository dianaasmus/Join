let eventListener;
let editEventListener;
let dialogEventListener;
let addTaskEventListener;
let contactsEventListener;
let editContactsEventListener;


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
            removeEventListeners();
        }
    };

    document.body.addEventListener("click", eventListener);

    return eventListener;
}


/**
 * Removes the specified event listeners from the document body.
 */
function removeEventListeners() {
    const eventListeners = [dialogEventListener, addTaskEventListener, contactsEventListener, editContactsEventListener];

    eventListeners.forEach((listener) => {
        if (listener) {
            document.body.removeEventListener("click", listener);
        }
    });
}