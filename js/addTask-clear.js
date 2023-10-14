/**
 * Clears the values and settings in the add task popup.
 */
function clearPopUp() {
    let title = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let assignedTo = assignedContacts.splice(0, assignedContacts.length)
    let category = setCategory();

    clearValuesOfAddTask(title, description, category, assignedTo, date);
    disableButtonAddTaskBtns();
    resetCheckboxStates();
    removeCheckedContactsContainer();
    emptySubtasks();
    removePrioColors('addedTask');
    removecategorySelection();
    enableButtonAddTaskBtns();
}


/**
 * Clears the input values in the add task popup.
 * @param {HTMLInputElement} title - The input element for the task title.
 * @param {HTMLInputElement} description - The input element for the task description.
 * @param {string} category - The category value.
 * @param {HTMLInputElement} assignedTo - The input element for assigned contacts.
 * @param {HTMLInputElement} date - The input element for the task due date.
 */
function clearValuesOfAddTask(title, description, category, assignedTo, date) {
    title.value = '';
    description.value = '';
    if (category) {
        category.innerHTML = '';
    }
    assignedTo.value = '';
    date.value = '';
    assignedContacts = []
}


/**
 * Empties the subtasks section in the add task popup.
 */
function emptySubtasks() {
    document.getElementById('subtasksPopUp').innerHTML = '';
}


/**
 * Removes priority colors and classes based on a condition.
 * @param {boolean} condition - A boolean value to determine if maximum priority is 3 or 6.
 */
function removePrioColors(condition) {
    const maxPriority = condition ? 3 : 6;

    for (let i = 1; i <= maxPriority; i++) {
        const prioElement = document.getElementById(`prio${i}`);
        prioElement.classList.remove(`prio${i}-clicked`);
        prioElement.classList.add('prio-hover');
    }
}


/**
 * Removes the selected category and associated elements from the add task popup.
 */
function removecategorySelection() {
    if (document.getElementById('assignedCategoryValues')) {
        document.getElementById('assignedCategoryValues').remove();
    }
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('labelCategory').innerHTML = 'Select task category';
    document.getElementById('dropdown').classList.remove('displayNone');
}


/**
 * Removes the 'required-field' class from priority elements, clearing the priority alert.
 */

function removeAlertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        const prioElement = document.getElementById('prio' + i);
        prioElement.classList.remove('required-field');
    }
}


/**
 * Removes the 'required-field' class from the selected category input and dropdown container.
 */
function removeAlertCategoryRequired() {
    let selectedCategoryInputValue = document.getElementById('selectedCategoryInputValue');
    let dropdownContainer = document.getElementById('dropdown');

    selectedCategoryInputValue.classList.remove('required-field');
    dropdownContainer.classList.remove('required-field');
}


/**
 * Closes the hidden input for adding a new category.
 */
function closeHiddenInput() {
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('dropdown').classList.remove('displayNone');
    document.getElementById('hiddenInputCategory').classList.add('displayNone');
}


/**
 * Removes the contact list dropdown.
 */
function removeAddTaskContactList() {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.add('displayNone');
    document.getElementById('assignArrow').style.transform = "rotate(180deg)";
}


/**
 * Removes the category dropdown from the UI.
 * @param {HTMLElement} dropdownCategory - The dropdown category element.
 */
function removeDropdownCategory(dropdownCategory) {
    isDropDownCategory = false;
    dropdownCategory.remove();
    document.getElementById('categoryArrow').style.transform = "rotate(180deg)";
}


/**
 * Removes the added task feedback popup after a delay and navigates to the board.
 */
function removeAddTaskFeedback() {
    setTimeout(() => {
        document.getElementById('popUpWhenAdded').remove();
        window.location.href = 'board.html';
    }, 1500);

}


/**
 * Removes animation classes and class lists from the add task popup element.
 */
function removeAddTaskPopup() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.remove('background-aniamtion-addTask');
    addTaskPopoup.classList.add('closeAddedPopUpAddTask');
    removeClassLists(addTaskPopoup);
}


/**
 * Removes class lists related to popup animation from an element after a delay.
 * @param {HTMLElement} element - The HTML element to remove class lists from.
 */
function removeClassLists(element) {
    setTimeout(() => {
        element.classList.remove('openPopUpAddTask');
        element.classList.remove('closeAddedPopUpAddTask');
    }, 200);
}


/**
 * Clears the add task popup, continues scrolling, and removes popup animations.
 */
function closePopUpAddTask() {
    clearPopUp();
    continueScrolling();
    removeAddTaskPopup();
}


/**
 * Clears the checked Contacts Container.
 */
function removeCheckedContactsContainer() {
    document.getElementById('checkedContacts').innerHTML = '';
}


/**
 * Resets the stored checkbox states for assigned contacts in local storage.
 */
function resetCheckboxStates() {
    for (let index = 0; index < contacts.length; index++) {
        localStorage.removeItem(`checkboxAssigned${index}`);
    }
}


/**
 * Removes the checked state from assigned contacts checkboxes.
 */
function removeCheckedContactsCheckbox() {
    if (!contactListDropped) {
        removeCheckedContacts();
        resetCheckboxStates();
        contactListDropped = true;
    }
}


/**
 * Removes the checked state from assigned contacts checkboxes.
 */
function removeCheckedContacts() {
    for (let index = 0; index < contacts.length; index++) {
        document.getElementById(`checkboxAssigned${index}`).checked = false;
    }
}


/**
 * Checks if a dropdown is not closed and takes specific actions after a timeout.
 */
function removeIfDropdownNotClosed(dropdownContent) {
    setTimeout(() => {
        if (!dropdownContent.classList.contains('displayNone')) {
            checkForCheckedAssignedPopUp();
            removeAddTaskContactList();
            addSelectedContactAfterClosedDropdown(dropdownContent);
        }
    }, 9000);
}


/**
 * Enables the "Clear" and "Add Task" buttons in the add task popup.
 */
function enableButtonAddTaskBtns() {
    document.getElementById('buttonClearTaskPopUpTask').disabled = false;
    document.getElementById('buttonCreateTaskPopUpTask').disabled = false;
}


/**
 * Applies new styling to a newly created category.
 * @param {HTMLElement} labelCategory - The label element for displaying the selected category.
 */
function newCategoryStyle(labelCategory) {
    document.getElementById('dropdown').classList.remove('displayNone');
    labelCategory.classList.add('setlabelCategory');
    document.getElementById('hiddenInputCategory').classList.add('displayNone');
    document.getElementById('assignedColor').classList.add('color-picker-picked');
}