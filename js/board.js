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


function getTheDate() {
    let forCalender = document.getElementById("date").setAttribute("min", date.toISOString().split("T")[0]);
    return (forCalender)
}


async function renderTaskCards() {
    clearSubsections();
    j = 0;
    let colorCircle = 0
    let search = filterTasks();

    for (let i = 0; i < tasks.length; i++) {
        let taskTitle = tasks[i].title.toLowerCase();
        let taskDescription = tasks[i].description.toLowerCase();

        if (taskTitle.includes(search) || taskDescription.includes(search)) {
            renderSingleTask(i, j, colorCircle);
            j++;
        }
    }
}


function renderSingleTask(i, j, colorCircle) {
    checkForContacts(i);
    checkForReadiness(i, j);
    document.getElementById('progressBar' + i).style.background = tasks[i].colorOfBar;
    renderAssignedContactsOnBoard(i, colorCircle);
    hideProgressSection(i);
}


function filterTasks() {
    let search = document.getElementById('findATask').value
    search = search.toLowerCase()
    return search
}


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


function hideProgressSection(i) {
    if (tasks[i].subtasks.length == 0) {
        document.getElementById(`progressBarSection${i}`).classList.remove('progressBarSection');
        document.getElementById(`progressBarSection${i}`).classList.add('displayNone');
    }
}



function renderAssignedContactsOnBoard(i, colorCircle) {
    if (tasks[i].assignedTo) {
        document.getElementById(`assignedToCircles${i}`).innerHTML = ''
        for (let contact = 0; contact < tasks[i].assignedTo.length; contact++) {
            let element = document.getElementById(`colors${colorCircle}`);
            let backgroundColorCircle = element.style.backgroundColor;
            document.getElementById(`assignedToCircles${i}`).innerHTML += `<span style="background-color:${backgroundColorCircle}" class="assignedToAvatar">${tasks[i].assignedTo[contact].firstNameLetter}${tasks[i].assignedTo[contact].lastNameLetter}</span>`
            colorCircle++
            if (colorCircle == 6) { colorCircle = 0 }
        }
    }
}


function renderAssignedContactsOnFullCard(i) {
    let colorCircle = 0
    if (tasks[i].assignedTo) {
        document.getElementById(`assignedToFullCard`).innerHTML = ''
        for (let contact = 0; contact < tasks[i].assignedTo.length; contact++) {
            let element = document.getElementById(`colors${colorCircle}`);
            let backgroundColorCircle = element.style.backgroundColor;
            document.getElementById(`assignedToFullCard`).innerHTML += `<div class="assignedToContact"><span style="background-color:${backgroundColorCircle}" class="assignedToAvatar">${tasks[i].assignedTo[contact].firstNameLetter}${tasks[i].assignedTo[contact].lastNameLetter}</span><p>${tasks[i].assignedTo[contact].name}</p><div>`
            colorCircle++
            if (colorCircle == 6) { colorCircle = 0 }
        }
    }
}


function priorityImageForRenderTaskCards(i, j) {
    if (tasks[j].prio == 'urgent') { document.getElementById(`urgencyBoard${j}`).src = prioImages[0] }
    if (tasks[j].prio == 'medium') { document.getElementById(`urgencyBoard${j}`).src = prioImages[1] }
    if (tasks[j].prio == 'low') { document.getElementById(`urgencyBoard${j}`).src = prioImages[2] }
}


function priorityImageForRenderFullTaskCard(i) {
    if (tasks[i].prio == 'urgent') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[0] }
    if (tasks[i].prio == 'medium') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[1] }
    if (tasks[i].prio == 'low') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[2] }
}


async function renderDialogFullCard(i) {
    let counter = 0
    document.body.innerHTML += HTMLrenderDialogFullCard(i);
    priorityImageForRenderFullTaskCard(i);
    await renderDialogFullCardContent(i, counter);
    showDialogFullCard();
}


function showDialogFullCard() {
    document.getElementById('dialogFullCard').classList.add('openPopUpAddTask');
    document.getElementById('dialogFullCard').classList.add('background-aniamtion-addTask');
}


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


function stopScrolling() {
    document.body.classList.add('hide-overflow');
}


function continueScrolling() {
    document.body.classList.remove('hide-overflow');
}


function openEditTask(i) {
    document.getElementById('dialogFullCard').innerHTML = openEditTaskHTML(i);
    document.getElementById(`editedDate`).setAttribute("min", date.toISOString().split("T")[0]);
    listenToEvent(i);
    getPrio(i);
}


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


function startDragging(i) {
    currentDragged = i
}


async function moveTo(readinessState) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    tasks[currentDragged].readinessState = readinessState
    await backend.setItem('tasks', JSON.stringify(tasks))
    await renderTaskCards()
}


function allowDrop(ev) {
    ev.preventDefault();
}


function clearSubsections() {
    document.getElementById('boardSubsectionToDo').innerHTML = ''
    document.getElementById('boardSubsectionInProgress').innerHTML = ''
    document.getElementById('boardSubsectionFeedback').innerHTML = ''
    document.getElementById('boardSubsectionDone').innerHTML = ''
}


function checkForReadiness(i, j) {
    if (tasks[i].readinessState == 'toDo') {
        document.getElementById('boardSubsectionToDo').innerHTML += HTMLrenderTaskCards(i, j)
        priorityImageForRenderTaskCards(i, j)
    }
    if (tasks[i].readinessState == 'inProgress') {
        document.getElementById('boardSubsectionInProgress').innerHTML += HTMLrenderTaskCards(i, j)
        priorityImageForRenderTaskCards(i, j)
    }
    if (tasks[i].readinessState == 'awaitingFeedback') {
        document.getElementById('boardSubsectionFeedback').innerHTML += HTMLrenderTaskCards(i, j)
        priorityImageForRenderTaskCards(i, j)
    }
    if (tasks[i].readinessState == 'done') {
        document.getElementById('boardSubsectionDone').innerHTML += HTMLrenderTaskCards(i, j)
        priorityImageForRenderTaskCards(i, j)
    }
}


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


document.addEventListener('DOMContentLoaded', function () {

    const fullCard = document.getElementById('dialogFullCard');
    const fullCardEdit = document.getElementById('dialogEditCard');
    var fileName = 'addTask.html';

    if (fullCard) {
        fullCard.addEventListener('click', function (event) {
            if (event.target === fileName) {
                fileName.classList.add('displayNone');
                renderTaskCards();
            }
        });
    }

    if (fullCardEdit) {
        fullCardEdit.addEventListener('click', function (event) {
            if (event.target === fileName) {
                fileName.classList.add('displayNone');
                fullCard.classList.add('displayNone');
                renderTaskCards();
            }
        });
    }
});


function listenToEvent(i) {
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


function checkForChecked(i, checkedbox) {
    for (let counter = 0; counter < tasks[i].subtasks.length; counter++) {
        checkedbox = document.getElementById(`checkBox${counter}`)

        if (tasks[i].subtasks[counter].checkedValue == 0) {
            checkedbox.checked = false
        } else { checkedbox.checked = true }
    }
}


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


function openContactEdit() {
    openAddContacts();
}


async function addEditedPriority(i, j) {
    let selectedPriority = document.getElementById("prio" + j);
    let selectedUrgency = selectedPriority.getAttribute("value");
    tasks[i].prio = selectedUrgency;
    colorPrios(j);
    await backend.setItem('tasks', JSON.stringify(tasks));
}


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

function removeEditTaskDropdown(editedDropdownAddContact, arrowDownEditTask) {
    editedDropdownAddContact.style.display = "none";
    arrowDownEditTask.style.transform = "rotate(180deg)";
}


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

function openChangeStatusContent(i) {
    ifStatusToDoForMobile(i)
    ifStatusInProgressForMobile(i)
    ifStatusAwaitingFeedbackForMobile(i)
    ifStatusDoneForMobile(i)
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