let tasks = []
let assignedContacts = []
let prios = []
let categories = []
let colorsCategory = []
let prioImages = ['../assets/img/urgent.png', '../assets/img/medium.png', '../assets/img/low.png']
let prioImagesFullCard = ['../assets/img/urgentOnclick.png', '../assets/img/mediumOnclick.png', '../assets/img/lowOnclick.png']
let tasksToEdit = []
let subtasksToSave = []
let date = new Date();
contacts = []
let colorSelected = false;
let prioSelected = false;
let isDropDownCategory = false;
let existingCategorySelected = false;
let categorySelected = false;
let setReadinessState;


/**
 * Adjusts the 'addTaskPopUp' element, sets the minimum date for an element with ID 'date',
 * updates the readiness state, and sets the 'addTaskPage'.
 */
function adjustAddTask() {
    document.getElementById('addTaskPopUp').classList.add('add-task-html-style');
    document.getElementById(`date`).setAttribute("min", date.toISOString().split("T")[0]);
    setReadinessState = 'toDo';
    addTaskPage = true;
}


/**
 * Checks the category selection and applies required-field styling if no category is selected.
 * @returns {boolean} Returns true if a category is selected, otherwise returns false.
 */
function checkCategorySelect() {
    let selectedCategoryInputValue = document.getElementById('selectedCategoryInputValue');
    let dropdownContainer = document.getElementById('dropdown');

    if (!categorySelected) {
        selectedCategoryInputValue.classList.add('required-field');
        dropdownContainer.classList.add('required-field');
        categorySelected = false;
        return false;
    } else {
        return true;
    }
}


/**
 * Sets the category for the task based on user input.
 * @returns {string|boolean} The selected category, or false if no category is selected.
 */
function setCategory() {
    if (document.getElementById('selectedCategoryInputValue').value) {
        return document.getElementById('selectedCategoryInputValue').value;
    } else if (document.getElementById('selectedCategoryValue')) {
        return document.getElementById('selectedCategoryValue').innerHTML;
    } else {
        return false;
    }
}


/**
 * Returns the selected readiness state based on the value of 'setReadinessState'.
 * @returns {string} The selected readiness state.
 */
function selectedState() {
    if (setReadinessState === 'awaitingFeedback') {
        return 'awaitingFeedback';
    } else if (setReadinessState === 'inProgress') {
        return 'inProgress';
    } else if (setReadinessState === 'toDo') {
        return 'toDo';
    }
}


/**
 * Disables the buttons in the add task popup.
 */
function disableButtonAddTaskBtns() {
    document.getElementById('buttonClearTaskPopUpTask').disabled = true;
    document.getElementById('buttonCreateTaskPopUpTask').disabled = true;
}


/**
 * Displays a visual alert by adding the 'required-field' class to priority elements,
 * indicating that priority selection is required.
 */
function alertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        const prioElement = document.getElementById('prio' + i);
        prioElement.classList.add('required-field');
    }
}


/**
 * Renders the list of subtasks on the add task popup.
 */
function renderSubtasksOnPopUpAddTask() {
    document.getElementById('subtasksPopUp').innerHTML = '';
    subtasksToSave.forEach((subtask, index) => {
        document.getElementById('subtasksPopUp').innerHTML += `<div class="checkBoxDiv">
        <label class="subtaskLabel">${subtask.subtask}</label><img src="../assets/img/addSubtaskButton.png" onclick="deleteSubtask(${index})">
        </div>`
    });
}


/**
 * Opens the add task popup with a specified readiness state.
 * @param {string} state - The readiness state to set.
 */
function openPopUpAddTask(state) {
    setReadinessState = state;

    if (!window.matchMedia("(max-width: 1000px)").matches) {
        openPopUpMedia();
    } else {
        window.location.href = 'addTask.html';
    }
}


/**
 * Opens the add task popup with animation and adjusts the date input.
 */
function openPopUpMedia() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.add('background-aniamtion-addTask');
    addTaskPopoup.classList.add('openPopUpAddTask');
    document.getElementById(`date`).setAttribute("min", date.toISOString().split("T")[0]);
    stopScrolling();
}


/**
 * Checks if the continue scrolling action needs to be triggered based on the addTaskPage status.
 */
function checkContinueScrolling() {
    if (!addTaskPage) {
        continueScrolling();
    }
}


/**
 * Applies styling and selected status to a priority element.
 * @param {number} i - The index of the priority to be colored.
 * @param {string} condition - The condition for coloration, e.g., 'addedTask'.
 */
function colorPrios(i, condition) {
    let prioElement = document.getElementById('prio' + i);

    removePrioColors(condition);
    prioSelected = true;
    prioElement.classList.add('prio' + i + '-clicked');
    prioElement.classList.remove('prio-hover');
}


/**
 * Adds a new category or selects an existing category for a task.
 * @param {string} existingCategorySelected - A flag indicating if an existing category is selected.
 * @param {number} i - The index of the selected category.
 */
function addCategoryOnTask(existingCategorySelected, i) {
    let value = document.getElementById('selectedCategoryInputValue').value;
    let labelCategory = document.getElementById('labelCategory');
    categorySelected = true;
    removeAlertCategoryRequired();

    if (value && colorSelected) {
        addNewcategory(labelCategory, value);

    } else if (existingCategorySelected === 'true') {
        addSelectedCategory(labelCategory, i);
    }
}


/**
 * Adds a new category label with the provided value and applies styling.
 * @param {HTMLElement} labelCategory - The label element for displaying the selected category.
 * @param {string} value - The value of the new category.
 */
function addNewcategory(labelCategory, value) {
    labelCategory.innerHTML = '';
    labelCategory.innerHTML = newCategoryHTML(value);

    newCategoryStyle(labelCategory);
}


/**
 * Adds the selected category and its associated color to the task.
 * @param {number} i - The index of the selected category.
 */
function addSelectedCategory(labelCategory, i) {
    let selectedCategoryValue = document.getElementById(`categoryValue${i}`).innerHTML;
    let selectedCategoryColor = document.getElementById(`categorColor${i}`).style.backgroundColor;

    labelCategory.innerHTML = '';
    labelCategory.innerHTML = selectedCategoryHTML(selectedCategoryValue, selectedCategoryColor);

    document.getElementById('assignedColor').classList.add('color-picker-picked');
    addSelectedColorToTask(i);
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


/**
 * Opens the input for adding a new category and hides the dropdown.
 */
function openInputAddCategory() {
    document.getElementById('dropdown').classList.add('displayNone');
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('hiddenInputCategory').classList.remove('displayNone');
    document.getElementById('dropdownCategory').style = 'display:none';
}


/**
 * Toggles the visibility of the contact list dropdown.
 */
function contactList() {
    let dropdownContent = document.getElementById('dropdownContent');

    if (dropdownContent.classList.contains('displayNone')) {
        dropdownContent.classList.remove('displayNone');
        document.getElementById('assignArrow').style.transform = "rotate(0deg)";
        addDropdownContacts();
        removeIfDropdownNotClosed(dropdownContent);
        getCheckedContact();
    } else {
        checkForCheckedAssignedPopUp();
        removeAddTaskContactList();
    }
    addSelectedContactAfterClosedDropdown(dropdownContent);
}


function resetCheckboxStates() {
    for (let index = 0; index < contacts.length; index++) {
        localStorage.removeItem(`checkboxAssigned${index}`);
    }
}


function getCheckedContact() {
    for (let index = 0; index < contacts.length; index++) {
        // const element = array[index];
        const checkedState = localStorage.getItem(`checkboxAssigned${index}`);
        if (checkedState !== null) {
            document.getElementById(`checkboxAssigned${index}`).checked = checkedState === 'true';
        }
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
    }, 4000);
}


/**
 * Executes addSelectedContactToPopUp() if dropdownContent is not diaplayed.
 */
function addSelectedContactAfterClosedDropdown(dropdownContent) {
    if (dropdownContent.classList.contains('displayNone')) {
        addSelectedContactToPopUp();
    }
}


/**
 * Populates the contact dropdown with available contacts.
 */
function addDropdownContacts() {
    let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.style.display = "block";

    dropdownAddContactPopUp.innerHTML = ''
    contacts.forEach((contact, index) => {
        dropdownAddContactPopUp.innerHTML += `
            <div class="dropdownContact">
            <a>${contact.name}</a>
            <input id="checkboxAssigned${index}" onclick="addToAssignedContacts('${index}')" type="checkbox">
            </div>
            `;
    })
}


/**
 * Checks for assigned contacts and updates their checkboxes in the contact list dropdown.
 */
function checkForCheckedAssignedPopUp() {
    let checkedbox;

    contacts.forEach((contact, index) => {

        assignedContacts.forEach(assigned => {
            checkedbox = document.getElementById(`checkboxAssigned${index}`)
            if (contact.email === assigned.email) {
                checkedbox.checked = true;
            }
        });
    });
}


/**
 * Toggles the visibility of the category dropdown and manages its content.
 */
function dropdownCategory() {
    let dropdownCategory = document.getElementById('dropdownCategory');

    if (!isDropDownCategory) {
        addDropdownCategory();
    } else {
        removeDropdownCategory(dropdownCategory);
    }
}


/**
 * Adds the category dropdown and its content to the UI.
 */
function addDropdownCategory() {
    isDropDownCategory = true;
    document.getElementById('dropdown').innerHTML += addDropdownCategoryHTML();
    document.getElementById('dropdownCategory').style.display = "block";
    document.getElementById('categoryArrow').style.transform = "rotate(0deg)";

    addDropdownContentCategory();
}


/**
 * Populates the category dropdown with available categories.
 */
function addDropdownContentCategory() {
    let dropdownAddCategoryPopUp = document.getElementById('dropdownAddCategoryPopUp');
    const uniqueCategories = new Set();

    dropdownAddCategoryPopUp.innerHTML = ''
    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        checkAndWriteCategories(dropdownAddCategoryPopUp, uniqueCategories, task, i);
    }
}


/**
 * Checks task categories and writes unique categories to the dropdown content.
 * @param {HTMLElement} dropdownAddCategoryPopUp - The dropdown category popup element.
 * @param {Set} uniqueCategories - A set to keep track of unique categories.
 * @param {Object} task - The task object.
 * @param {number} i - The index of the task.
 */
function checkAndWriteCategories(dropdownAddCategoryPopUp, uniqueCategories, task, i) {
    if (!uniqueCategories.has(task.category)) {
        uniqueCategories.add(task.category);

        dropdownAddCategoryPopUp.innerHTML += `
        <div class="dropdownCategory" onclick="addCategoryOnTask('true', ${i})">
            <div id="categorColor${i}" class="colorPicker colorPickerAssigned" style="background-color: ${task.colorCategory}"></div>
            <a class="dropdown-link" id="categoryValue${i}">${task.category}</a> 
        </div>
    `;
    }
}


/**
 * Disables the "Add Task" button and re-enables it after a delay.
 */
function disableButtonAddTask() {
    let button = document.getElementById('buttonCreateTaskPopUpTask')
    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 3000);
}



/**
 * Provides feedback after adding a task, handles UI updates, and scrolls as needed.
 */
function addTaskFeedback() {
    if (addTaskPage) {
        document.body.innerHTML += addedTaskFeedback();
        removeAddTaskFeedback();
    } else {
        continueScrolling();
    }
    addTaskPage = false;
}


/**
 * Initiates the process of adding a task contact, triggers animations and UI updates.
 */
function addTaskContactPopup() {
    window.location.href = 'contacts.html';
}


/**
 * Enables the "Clear" and "Add Task" buttons in the add task popup.
 */
function enableButtonAddTaskBtns() {
    document.getElementById('buttonClearTaskPopUpTask').disabled = false;
    document.getElementById('buttonCreateTaskPopUpTask').disabled = false;
}