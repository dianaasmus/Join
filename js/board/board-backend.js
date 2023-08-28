/**
 * Initializes the board by executing necessary scripts and loading data from the server.
 */
async function initBoard() {
    await initScript();
    try {
        setURL("https://diana-asmus.developerakademie.net/Join/smallest_backend_ever-master");
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


async function countTasks(i, j) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    let addedSubtaskCheckboxes = document.getElementsByClassName('addedSubtaskOnEdit')

    if (tasks[i].subtasks[j].checkedValue == 0 && tasks[i].pace < tasks[i].subtasks.length) {
        tasks[i].pace++
        percentOfDone = tasks[i].pace / addedSubtaskCheckboxes.length * 100
        tasks[i].subtasks[j].checkedValue = 1
    } else {
        if (tasks[i].pace > 0)
            tasks[i].pace--
        percentOfDone = tasks[i].pace / addedSubtaskCheckboxes.length * 100
        tasks[i].subtasks[j].checkedValue = 0
    }
    colorOfBar = document.getElementById('progressBar' + i).style.background = `linear-gradient(to right, #29ABE2 ${percentOfDone}%, #e9e7e7 ${percentOfDone}%)`;
    tasks[i].colorOfBar = colorOfBar
    tasks[i].percentOfDone = percentOfDone
    await backend.setItem('tasks', JSON.stringify(tasks))
}


async function addDeleteReassignedContacts(i, index) {
    let checkedbox = document.getElementById(`checkboxAssigned${index}`)
    if (checkedbox.checked == true) { addReassigned(i, index) }
    if (checkedbox.checked == false) { deleteReassigned(i) }
    await backend.setItem('tasks', JSON.stringify(tasks));
}


function deleteReassigned(i, index) {
    tasks[i].assignedTo.splice(tasks[i].assignedTo[index], 1);
}


function addReassigned(i, index) {
    tasks[i].assignedTo.push(contacts[index])
}


async function addEditedPriority(i, j) {
    let selectedPriority = document.getElementById("prio" + j);
    let selectedUrgency = selectedPriority.getAttribute("value");
    tasks[i].prio = selectedUrgency;
    colorPrios(j);
    await backend.setItem('tasks', JSON.stringify(tasks));
}


async function statusInProgress(i) {
    tasks[i].readinessState = "inProgress"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}

async function statusAwaitingFeedback(i) {
    tasks[i].readinessState = "awaitingFeedback"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}

async function statusDone(i) {
    tasks[i].readinessState = "done"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}

async function statusToDo(i) {
    tasks[i].readinessState = "toDo"
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards(i)
}