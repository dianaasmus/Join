/**
 * Initializes the board by executing necessary scripts and loading data from the server.
 */
async function initBoard() {
    await initScript();
    try {
        setURL("https://join.dianaasmus.com/smallest_backend_ever-master");
        await downloadFromServer();
        tasks = await JSON.parse(await backend.getItem('tasks')) || [];
        contacts = JSON.parse(backend.getItem('contacts')) || [];
        await renderTaskCards();
    } catch (er) {
        console.error(er);
    }
}


/**
 * Checks assigned contacts of a task and removes contacts not present in the contacts list.
 * @param {number} i - The index of the task to be checked.
 */
function checkForContacts(i) {
    if (tasks[i].assignedTo) {
        for (let k = 0; k < tasks[i].assignedTo.length; k++) {
            let assignedContact = tasks[i].assignedTo[k];
            if (!contacts.some(contact => contact.email === assignedContact.email)) {
                tasks[i].assignedTo.splice(k, 1);
            }
        }
    }
}


/**
 * Renders the content for a full dialog card associated with a task.
 * @param {number} i - The index of the task.
 * @param {number} counter - The counter for subtask rendering.
 */
async function renderDialogFullCardContent(i, counter) {
    tasks[i].subtasks.forEach(subtask => {
        document.getElementById('subtasksFullCard').innerHTML += HTMLrenderSubtasksDialogFullCard(i, subtask, counter)
        counter++
    })
    renderAssignedContactsOnFullCard(i);
    checkForChecked(i, `checkBox${counter}`);
    await backend.setItem('tasks', JSON.stringify(tasks));
    stopScrolling();
}


/**
 * Edits a task based on the provided index and updated information.
 * @param {number} i - The index of the task to be edited.
 */
async function editTask(i) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    let title = document.getElementById('editedTask');
    let description = document.getElementById('editedDescription');
    let date = document.getElementById('editedDate');
    continueScrolling();


    tasks[i] = {
        title: title.value,
        description: description.value,
        category: tasks[i].category,
        colorCategory: tasks[i].colorCategory,
        date: date.value,
        assignedTo: tasks[i].assignedTo,
        prio: tasks[i].prio,
        readinessState: tasks[i].readinessState,
        subtasks: tasks[i].subtasks,
        colorOfBar: tasks[i].colorOfBar,
        percentOfDone: tasks[i].percentOfDone,
        pace: tasks[i].pace,
    };

    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
    closeTask();
}


/**
 * Moves a task to a new readiness state.
 * @param {string} readinessState - The new readiness state.
 */
async function moveTo(readinessState) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    tasks[currentDragged].readinessState = readinessState
    await backend.setItem('tasks', JSON.stringify(tasks))
    await renderTaskCards()
}


/**
 * Counts tasks, updating pace, progress bar, and checked value for subtasks.
 * @param {number} i - Index of the task.
 * @param {number} j - Index of the subtask.
 */
async function countTasks(i, j) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    let addedSubtaskCheckboxes = document.getElementsByClassName('addedSubtaskOnEdit')

    if (checkSubtasksCheckedValues(i, j)) {
        increasePaceSubtask(addedSubtaskCheckboxes, i, j);
    } else {
        decreasePaceSubtask(addedSubtaskCheckboxes, i, j);
    }
    await updateSubtask(i);
}


/**
 * Checks if the checked value for subtasks needs to be increased.
 * @param {number} i - Index of the task.
 * @param {number} j - Index of the subtask.
 * @returns {boolean} - Whether the checked value needs to be increased.
 */
function checkSubtasksCheckedValues(i, j) {
    return tasks[i].subtasks[j].checkedValue == 0 && tasks[i].pace < tasks[i].subtasks.length;
}


/**
 * Increases pace and updates percent of done for subtasks.
 * @param {HTMLCollectionOf<Element>} addedSubtaskCheckboxes - Collection of checkboxes for subtasks.
 * @param {number} i - Index of the task.
 * @param {number} j - Index of the subtask.
 */
function increasePaceSubtask(addedSubtaskCheckboxes, i, j) {
    tasks[i].pace++
    percentOfDone = tasks[i].pace / addedSubtaskCheckboxes.length * 100
    tasks[i].subtasks[j].checkedValue = 1
}


/**
 * Decreases pace and updates percent of done for subtasks.
 * @param {HTMLCollectionOf<Element>} addedSubtaskCheckboxes - Collection of checkboxes for subtasks.
 * @param {number} i - Index of the task.
 * @param {number} j - Index of the subtask.
 */
function decreasePaceSubtask(addedSubtaskCheckboxes, i, j) {
    if (tasks[i].pace > 0) {
        tasks[i].pace--
        percentOfDone = tasks[i].pace / addedSubtaskCheckboxes.length * 100
        tasks[i].subtasks[j].checkedValue = 0
    }
}


/**
 * Updates subtask information and progress bar on task.
 * @param {number} i - Index of the task.
 */
async function updateSubtask(i) {
    colorOfBar = document.getElementById('progressBar' + i).style.background = `linear-gradient(to right, #29ABE2 ${percentOfDone}%, #e9e7e7 ${percentOfDone}%)`;
    tasks[i].colorOfBar = colorOfBar;
    tasks[i].percentOfDone = percentOfDone;
    await backend.setItem('tasks', JSON.stringify(tasks));
}


/**
 * Adds or deletes reassigned contacts for a task based on checkbox state.
 * @param {number} i - Index of the task.
 * @param {number} index - Index of the contact.
 */
async function addDeleteReassignedContacts(i, index) {
    let checkedbox = document.getElementById(`checkboxAssigned${index}`)
    if (checkedbox.checked == true) { addReassigned(i, index) }
    if (checkedbox.checked == false) { deleteReassigned(i) }
    await backend.setItem('tasks', JSON.stringify(tasks));
}


/**
 * Deletes a reassigned contact from a task.
 * @param {number} i - Index of the task.
 * @param {number} index - Index of the contact.
 */
function deleteReassigned(i, index) {
    tasks[i].assignedTo.splice(tasks[i].assignedTo[index], 1);
}


/**
 * Adds a reassigned contact to a task.
 * @param {number} i - Index of the task.
 * @param {number} index - Index of the contact.
 */
function addReassigned(i, index) {
    tasks[i].assignedTo.push(contacts[index])
}


/**
 * Adds edited priority to a task and updates its color.
 * @param {number} i - Index of the task.
 * @param {number} j - Index of the priority.
 */
async function addEditedPriority(i, j) {
    let selectedPriority = document.getElementById("prio" + j);
    let selectedUrgency = selectedPriority.getAttribute("value");
    tasks[i].prio = selectedUrgency;
    colorPrios(j);
    await backend.setItem('tasks', JSON.stringify(tasks));
}


/**
 * Updates task's readiness state to 'inProgress' and saves changes.
 * @param {number} i - Index of the task.
 */
async function statusInProgress(i) {
    tasks[i].readinessState = "inProgress"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}


/**
 * Updates task's readiness state to 'awaitingFeedback' and saves changes.
 * @param {number} i - Index of the task.
 */
async function statusAwaitingFeedback(i) {
    tasks[i].readinessState = "awaitingFeedback"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}


/**
 * Updates task's readiness state to 'done' and saves changes.
 * @param {number} i - Index of the task.
 */
async function statusDone(i) {
    tasks[i].readinessState = "done"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}


/**
 * Updates task's readiness state to 'toDo' and saves changes.
 * @param {number} i - Index of the task.
 */
async function statusToDo(i) {
    tasks[i].readinessState = "toDo"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}

/**
 * Checks the readiness state of a task and renders it in the appropriate subsection of the board.
 * @param {number} i - The index of the task.
 * @param {number} j - The index for rendering purposes.
 */
function checkForReadiness(i, j) {
    let localReadiness;
    const readinessMappings = {
        'toDo': 'boardSubsectionToDo',
        'inProgress': 'boardSubsectionInProgress',
        'awaitingFeedback': 'boardSubsectionFeedback',
        'done': 'boardSubsectionDone'
    };

    const readinessState = tasks[i].readinessState;
    localReadiness = readinessMappings[readinessState];

    document.getElementById(localReadiness).innerHTML += HTMLrenderTaskCards(i, j);
    priorityImageForRenderTaskCards(i, j);
}