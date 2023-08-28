tasks = [];
assignedContacts = [];
prios = [];
categories = [];
colorsCategory = [];
prioImages = ['../assets/img/urgent.png', '../assets/img/medium.png', '../assets/img/low.png'];
prioImagesFullCard = ['../assets/img/urgentOnclick.png', '../assets/img/mediumOnclick.png', '../assets/img/lowOnclick.png'];
tasksToEdit = [];
subtasksToSave = [];
let currentDragged;
const filteredTasksArray = [];


/**
 * Sets the minimum date for the calendar input and returns the formatted date string.
 * @returns {string} - The formatted date string.
 */
function getTheDate() {
    let forCalender = document.getElementById("date").setAttribute("min", date.toISOString().split("T")[0]);
    return (forCalender)
}


/**
 * Renders task cards on the board, based on the search filter.
 */
async function renderTaskCards() {
    clearSubsections();
    j = 0;
    let search = filterTasks();

    for (let i = 0; i < tasks.length; i++) {
        let taskTitle = tasks[i].title.toLowerCase();
        let taskDescription = tasks[i].description.toLowerCase();

        if (taskTitle.includes(search) || taskDescription.includes(search)) {
            renderSingleTask(i, j);
            j++;
        }
    }
}


/**
 * Renders a single task on the board by performing various checks and UI updates.
 * @param {number} i - The index of the task to be rendered.
 * @param {number} j - The index for tracking task rendering order.
 */
function renderSingleTask(i, j) {
    checkForContacts(i);
    checkForReadiness(i, j);
    document.getElementById('progressBar' + i).style.background = tasks[i].colorOfBar;
    renderAssignedContactsOnBoard(i);
    hideProgressSection(i);
}



/**
 * Filters tasks based on the search input and returns the formatted search string.
 * @returns {string} - The formatted search string.
 */
function filterTasks() {
    let search = document.getElementById('findATask').value
    search = search.toLowerCase()
    return search
}


/**
 * Hides the progress section of a task if it has no subtasks.
 * @param {number} i - The index of the task.
 */
function hideProgressSection(i) {
    if (tasks[i].subtasks.length == 0) {
        document.getElementById(`progressBarSection${i}`).classList.remove('progressBarSection');
        document.getElementById(`progressBarSection${i}`).classList.add('displayNone');
    }
}


/**
 * Renders assigned contacts with colored circles on the board for a specific task.
 * @param {number} i - The index of the task.
 */
function renderAssignedContactsOnBoard(i) {
    if (tasks[i].assignedTo) {
        document.getElementById(`assignedToCircles${i}`).innerHTML = '';
        for (let c = 0; c < tasks[i].assignedTo.length; c++) {
            const contact = tasks[i].assignedTo[c];
            const contactColor = contact.color;

            document.getElementById(`assignedToCircles${i}`).innerHTML += `<span style="background-color:${contactColor}" class="assignedToAvatar">${tasks[i].assignedTo[c].firstNameLetter}${tasks[i].assignedTo[c].lastNameLetter}</span>`
        }
    }
}


/**
 * Renders assigned contacts with colored circles on the full task card.
 * @param {number} i - The index of the task.
 */
function renderAssignedContactsOnFullCard(i) {
    let container = document.getElementById(`assignedToFullCard`);

    if (tasks[i].assignedTo) {
        container.innerHTML = '';
        for (let c = 0; c < tasks[i].assignedTo.length; c++) {
            const contact = tasks[i].assignedTo[c];
            const contactColor = contact.color;

            container.innerHTML += `<div class="assignedToContact"><span style="background-color:${contactColor}" class="assignedToAvatar">${tasks[i].assignedTo[c].firstNameLetter}${tasks[i].assignedTo[c].lastNameLetter}</span><p>${tasks[i].assignedTo[c].name}</p><div>`;
        }
    }
}


/**
 * Sets the priority image for a task to be rendered on the board.
 * @param {number} i - The index of the task.
 * @param {number} j - The index for tracking task rendering order.
 */
function priorityImageForRenderTaskCards(i, j) {
    if (tasks[j].prio == 'urgent') { document.getElementById(`urgencyBoard${j}`).src = prioImages[0] }
    if (tasks[j].prio == 'medium') { document.getElementById(`urgencyBoard${j}`).src = prioImages[1] }
    if (tasks[j].prio == 'low') { document.getElementById(`urgencyBoard${j}`).src = prioImages[2] }
}


/**
 * Sets the priority image for a task to be rendered on the full task card.
 * @param {number} i - The index of the task.
 */
function priorityImageForRenderFullTaskCard(i) {
    if (tasks[i].prio == 'urgent') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[0] }
    if (tasks[i].prio == 'medium') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[1] }
    if (tasks[i].prio == 'low') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[2] }
}


/**
 * Renders the content for a full dialog card associated with a task.
 * @param {number} i - The index of the task.
 */
async function renderDialogFullCard(i) {
    let counter = 0
    document.body.innerHTML += HTMLrenderDialogFullCard(i);
    priorityImageForRenderFullTaskCard(i);
    await renderDialogFullCardContent(i, counter);
    showDialogFullCard();
}


/**
 * Displays the full task card dialog.
 */
function showDialogFullCard() {
    document.getElementById('dialogFullCard').classList.add('openPopUpAddTask');
    document.getElementById('dialogFullCard').classList.add('background-aniamtion-addTask');
}


/**
 * Stops scrolling on the body element to prevent background scrolling.
 */
function stopScrolling() {
    document.body.classList.add('hide-overflow');
}


/**
 * Resumes scrolling on the body element.
 */
function continueScrolling() {
    document.body.classList.remove('hide-overflow');
}


/**
 * Opens the edit task dialog for a specific task.
 * @param {number} i - The index of the task to be edited.
 */
function openEditTask(i) {
    document.getElementById('dialogFullCard').innerHTML = openEditTaskHTML(i);
    document.getElementById(`editedDate`).setAttribute("min", date.toISOString().split("T")[0]);
    toggleDropdownAddContact(i);
    getPrio(i);
}


/**
 * Gets the priority index for colorPrios based on the priority of a task.
 * @param {number} i - The index of the task.
 */
function getPrio(i) {
    if (tasks[i].prio == 'urgent') {
        i = 4;
    } else if (tasks[i].prio == 'medium') {
        i = 5;
    } else if (tasks[i].prio == 'low') {
        i = 6;
    }
    colorPrios(i);
}


/**
 * Initiates the dragging process for a task.
 * @param {number} i - The index of the task being dragged.
 */
function startDragging(i) {
    currentDragged = i
}


/**
 * Allows dropping elements during a drag-and-drop operation.
 * @param {Event} ev - The drag event.
 */
function allowDrop(ev) {
    ev.preventDefault();
}


/**
 * Clears the subsections of the board.
 */
function clearSubsections() {
    document.getElementById('boardSubsectionToDo').innerHTML = ''
    document.getElementById('boardSubsectionInProgress').innerHTML = ''
    document.getElementById('boardSubsectionFeedback').innerHTML = ''
    document.getElementById('boardSubsectionDone').innerHTML = ''
}


/**
 * Checks the readiness state of a task and renders it in the appropriate subsection of the board.
 * @param {number} i - The index of the task.
 * @param {number} j - The index for rendering purposes.
 */
function checkForReadiness(i, j) {
    let localReadiness;
    if (tasks[i].readinessState == 'toDo') { localReadiness = 'boardSubsectionToDo'; }
    if (tasks[i].readinessState == 'inProgress') { localReadiness = 'boardSubsectionInProgress'; }
    if (tasks[i].readinessState == 'awaitingFeedback') { localReadiness = 'boardSubsectionFeedback'; }
    if (tasks[i].readinessState == 'done') { localReadiness = 'boardSubsectionDone'; }

    document.getElementById(localReadiness).innerHTML += HTMLrenderTaskCards(i, j);
    priorityImageForRenderTaskCards(i, j);
}


/**
 * Closes the task dialog, resumes scrolling, and updates the task board.
 */
function closeTask() {
    let dialogFullCard = document.getElementById('dialogFullCard');
    continueScrolling();

    dialogFullCard.classList.add('closeAddedPopUpAddTask');
    dialogFullCard.classList.remove('background-aniamtion-addTask');

    renderTaskCards();
    setTimeout(() => {
        dialogFullCard.remove();
    }, 500);
}


/**
 * Toggles the visibility of the dropdown for adding contacts during task editing.
 * @param {number} i - The index of the task being edited.
 */
function toggleDropdownAddContact(i) {
    let entireEditTaskCard = document.getElementById('entireEditTaskCard');
    if (entireEditTaskCard) {
        let dropdownAddContact = document.getElementById('editedDropdownAddContact');
        dropdownAddContact.innerHTML += ''
        contacts.forEach((contact, index) => {
            dropdownAddContact.innerHTML += `<div class="droppedContacts"><a>${contact.name}</a><input onclick="addDeleteReassignedContacts(${i},${index})" id="checkboxAssigned${index}"  type="checkbox"></div>`;
        });
        checkForCheckedAssigned(i);
    }
}


/**
 * Checks and updates the checkboxes for subtasks' checked values.
 * @param {number} i - The index of the task being edited.
 * @param {string} checkedbox - The ID of the checkbox element.
 */
function checkForChecked(i, checkedbox) {
    for (let counter = 0; counter < tasks[i].subtasks.length; counter++) {
        checkedbox = document.getElementById(`checkBox${counter}`)

        if (tasks[i].subtasks[counter].checkedValue == 0) {
            checkedbox.checked = false
        } else { checkedbox.checked = true }
    }
}


/**
 * Checks and updates the checkboxes for assigned contacts during task editing.
 * @param {number} i - The index of the task being edited.
 */
function checkForCheckedAssigned(i) {
    let checkedbox

    contacts.forEach((contact, index) => {

        tasks[i].assignedTo.forEach(assigned => {
            checkedbox = document.getElementById(`checkboxAssigned${index}`)
            if (contact.email === assigned.email) {
                checkedbox.checked = true;
            }
        });
    });
}


function openContactEdit() {
    openAddContacts()
}


/**
 * Toggles the visibility of the dropdown for adding contacts during task editing.
 */
function opendropdownEditTask() {
    const editedDropdownAddContact = document.getElementById('editedDropdownAddContact');
    const arrowDownEditTask = document.getElementById('arrowDownEditTask');

    if (editedDropdownAddContact.style.display == "block") {
        removeEditTaskDropdown(editedDropdownAddContact, arrowDownEditTask);
    } else {
        editedDropdownAddContact.style.display = "block";
        arrowDownEditTask.style.transform = "rotate(0deg)";
    }
}


/**
 * Removes the dropdown for adding contacts during task editing.
 * @param {HTMLElement} editedDropdownAddContact - The element of the edited dropdown.
 * @param {HTMLElement} arrowDownEditTask - The element of the arrow indicating dropdown state.
 */
function removeEditTaskDropdown(editedDropdownAddContact, arrowDownEditTask) {
    editedDropdownAddContact.style.display = "none";
    arrowDownEditTask.style.transform = "rotate(180deg)";
}


/**
 * Opens the change status dropdown for a task.
 * @param {number} i - The index of the task.
 * @param {Event} event - The event triggering the function.
 */
function openChangeStatus(i, event) {
    let changeStatus = document.getElementById(`dropdown-contentForMobileDevices${i}`);

    if (changeStatus.style.display === 'block') {
        changeStatus.style.display = 'none';
    } else {
        changeStatus.style.display = 'block'
    }

    event = event || window.event;
    event.stopPropagation();
    openChangeStatusContent(i);
    let droppedContent = document.getElementById(`statusesDropdown${i}`);
    if (changeStatus.style.display === 'none') {
        droppedContent.style.display = 'none'
    }
}


/**
 * Opens the content of the change status dropdown for a task.
 * @param {number} i - The index of the task.
 */
function openChangeStatusContent(i) {
    ifStatusToDoForMobile(i)
    ifStatusInProgressForMobile(i)
    ifStatusAwaitingFeedbackForMobile(i)
    ifStatusDoneForMobile(i)
}