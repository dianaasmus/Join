let eventListener;

let editEventListener;
let dialogEventListener;
let addTaskEventListener;

let contactsEventListener;
let editContactsEventListener;

let assignDropdownEventListener;
let assignTaskEventListener;
let categoryEventListener;

const eventListenerElements = {
    'entireEditTaskCard': 'editEventListener',
    'dialogFullCardContent': 'dialogEventListener',
    'contentPopUpTask': 'addTaskEventListener',

    'addContactOverlay': 'contactsEventListener',
    'addContactOverlay': 'editContactsEventListener',

    'reassignContacts': 'assignDropdownEventListener',
    'eventLisPopUp': 'assignTaskEventListener',
    'dropdown': 'categoryEventListener',
};


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
            removeEventListeners(elementId);
        }
    };

    document.body.addEventListener("click", eventListener);
    return eventListener;
}


/**
 * Removes the event listener added to handle clicks outside the eventListener element.
 */
function removeEventListeners(elementId) {
    const listener = eventListenerElements[elementId];
    if (listener) {
        document.body.removeEventListener("click", window[listener]);
    }
}