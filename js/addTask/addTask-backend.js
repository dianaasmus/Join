/**
 * Initializes the add task functionality by first initializing the script,
 * then performing 'addTask' adjustment, and finally downloading data from a server.
 * @async
 */
async function initAddTask() {
    await initScript();
    adjustAddTask();
    try {
        setURL("https://join.dianaasmus.com/smallest_backend_ever-master");
        await downloadFromServer();
        tasks = await JSON.parse(await backend.getItem('tasks')) || [];
        contacts = JSON.parse(backend.getItem('contacts')) || [];
    } catch (er) {
        console.error(er);
    }
}


/**
 * Adds a task to the list if a priority is selected and the category selection is valid;
 * otherwise, displays an alert about the required priority selection or category.
 */
function addToTasks() {
    if (prioSelected && checkCategorySelect()) {
        prioSelected = false;
        createTask();
    } else if (!prioSelected) {
        alertPrioRequired();
    }
}


/**
 * Creates a new task with the provided information and adds it to the task list.
 * @async
 */
async function createTask() {
    let title = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let subtasks = subtasksToSave.splice(0, subtasksToSave.length)
    let assignedTo = assignedContacts.splice(0, assignedContacts.length)
    let prio = prios.slice(0).toString()
    let colorCategory = colorsCategory.slice(0).toString();
    let category = setCategory();

    let task = {
        title: title.value,
        description: description.value,
        category: category,
        colorCategory,
        assignedTo: assignedTo.value,
        date: date.value,
        prio,
        subtasks,
        readinessState: selectedState(),
        assignedTo,
        pace: 0
    };

    await addTask(task);
    if (!addTaskPage) {
        clearPopUp();
        removeAddTaskPopup();
    } else {
        addTaskPage = false;
    }
}


/**
 * Adds a task to the tasks array, updates local storage, provides feedback, and renders task cards if needed.
 * @param {Object} task - The task object to be added.
 */
async function addTask(task) {
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    addTaskFeedback();
    if (!document.getElementById('addTaskPopUp').classList.contains('add-task-html-style')) {
        renderTaskCards();
    }
}


/**
 * Adds a subtask to the list of subtasks to be saved and rendered on the popup.
 */
function addSubtaskOnPopUp() {
    let subtask = document.getElementById('subtaskPopUp');
    if (subtask.value) {
        subtasksToSave.push({
            subtask: subtask.value,
            checkedValue: 0,
        })
    }
    subtask.value = '';
    renderSubtasksOnPopUpAddTask();
}


/**
 * Deletes a subtask from the list of subtasks to be saved and re-renders the subtasks on the popup.
 * @param {number} i - The index of the subtask to be deleted.
 */
function deleteSubtask(i) {
    subtasksToSave.splice(i, 1);
    renderSubtasksOnPopUpAddTask();
}


/**
 * Deletes a task from the tasks list, updates local storage, re-renders task cards, and performs related actions.
 * @param {number} i - The index of the task to be deleted.
 */
async function deleteTask(i) {
    tasks.splice(i, 1);
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
    closeTask();
    checkContinueScrolling();
}


/**
 * Adds a priority to the list of selected priorities, updates UI, and handles alert removal.
 * @param {number} i - The index of the selected priority.
 */
function addPriority(i) {
    let selectedPriority = document.getElementById("prio" + i);
    let selectedUrgency = selectedPriority.getAttribute("value")
    if (prios.length == 0) {
    } else {
        prios = []
    }
    if (!prioSelected) {
        removeAlertPrioRequired();
    }
    colorPrios(i, 'addedTask');
    prios.push(selectedUrgency)
}


/**
 * Adds a new category, including its color, to the task and updates related flags.
 * @param {number} i - The index of the selected category.
 */
function addNewcategoryToTask(i) {
    let value = document.getElementById('selectedCategoryInputValue').value;

    colorSelected = true;
    if (value) {
        let color = document.getElementById("color" + i).style.backgroundColor;
        if (colorsCategory.length == 0) {
            colorsCategory.push(color)
        } else {
            colorsCategory = []
            colorsCategory.push(color)
        }
        addCategoryOnTask(value);
    }
    colorSelected = false;
}


/**
 * Adds the selected category's color to the colorsCategory array.
 * @param {number} i - The index of the selected category.
 */
function addSelectedColorToTask(i) {
    let selectedValue = document.getElementById('selectedCategoryValue').innerHTML;
    let selectedColor = document.getElementById('assignedColor').style.backgroundColor;

    if (selectedValue) {
        if (colorsCategory.length == 0) {
            colorsCategory.push(selectedColor);
        } else {
            colorsCategory = []
            colorsCategory.push(selectedColor);
        }
    }
}


/**
 * Adds or removes a contact from the assigned contacts list based on the checkbox state.
 * @param {number} index - The index of the contact in the contacts array.
 */
function addToAssignedContacts(index) {
    let checkedbox = document.getElementById(`checkboxAssigned${index}`);

    if (index >= 0 && index < contacts.length) {
        let contact = contacts[index];

        if (checkedbox.checked == true) {
            assignedContacts.push(contact);
        } else {
            assignedContacts.splice(assignedContacts.indexOf(contact), 1);
        }

        localStorage.setItem(`checkboxAssigned${index}`, checkedbox.checked);
    }
}


/**
 * Adds selected contacts to a specified container in a pop-up.
 * @param {Array} assignedContacts - An array of contacts to be added.
 */
function addSelectedContactToPopUp() {
    let checkedContacts = document.getElementById('checkedContacts');
    checkedContacts.innerHTML = '';

    for (let i = 0; i < assignedContacts.length; i++) {
        checkedContacts.innerHTML += `
            <span id="assignedToCircles${i}" style="background-color: ${assignedContacts[i].color}" class="assignedToAvatar">${assignedContacts[i].firstNameLetter}${assignedContacts[i].lastNameLetter}</span>
        `;
    }
}