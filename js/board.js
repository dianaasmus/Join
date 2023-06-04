let tasks = []
let assignedContacts = []
let prios = []
let categories = []
let colorsCategory = []
let prioImages = ['./assets/img/urgent.png', './assets/img/medium.png', './assets/img/low.png']
let prioImagesFullCard = ['./assets/img/urgentOnclick.png', './assets/img/mediumOnclick.png', './assets/img/lowOnclick.png']
let tasksToEdit = []
let subtasksToSave = []
let currentDragged
let percentOfDone
let colorOfBar
let checkboxState;
let checkedInput
let date = new Date();



async function initBoard() {
    includeHTML();
    try {
        setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
        await downloadFromServer();
        tasks = await JSON.parse(await backend.getItem('tasks')) || []
        contacts = JSON.parse(backend.getItem('contacts')) || [];
        document.getElementById("date").setAttribute("min", date.toISOString().split("T")[0]);
        renderTaskCards()
    } catch (er) {
        console.error(er)
    }
}


async function addToTasks() {


    let title = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let subtasks = subtasksToSave.splice(0, subtasksToSave.length)
    let category = document.getElementById('selectedCategoryInputValue');
    let assignedTo = assignedContacts.splice(0, assignedContacts.length)
    let prio = prios.slice(0).toString()
    let colorCategory = colorsCategory.slice(0).toString()


    let task = {
        title: title.value,
        description: description.value,
        category: category.value,
        colorCategory,
        assignedTo: assignedTo.value,
        date: date.value,
        prio,
        subtasks,
        readinessState: 'toDo',
        assignedTo,
        pace: 0


    };

    clearValuesOfAddTask(title, description, category, assignedTo, date)
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks))
    popTheAddedDesk()


}



async function popTheAddedDesk() {
    document.getElementById('popUpWhenAdded').classList.remove('displayNone')
    setTimeout(function () { document.getElementById('popUpWhenAdded').classList.add('displayNone') }, 2000)
}

function clearValuesOfAddTask(title, description, category, assignedTo, date) {
    title.value = '',
        description.value = '',
        category.value = '',
        assignedTo.value = '',
        date.value = '',
        assignedContacts = []
}


async function deleteTask(i) {

    tasks.splice(i, 1);
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
    document.getElementById('dialogFullCard').classList.add('displayNone')

}


async function addEditedPriority(i, j) {
    let selectedPriority = document.getElementById("prio" + j);
    let selectedUrgency = selectedPriority.getAttribute("value")
    tasks[i].prio = selectedUrgency
    editColorPrios(selectedUrgency, j)
    await backend.setItem('tasks', JSON.stringify(tasks))
}




function editColorPrios(selectedUrgency, i) {
    if (selectedUrgency == 'urgent') {
        document.getElementById("prio" + i).src = "./assets/img/urgentOnclick.png";
        document.getElementById("prio" + 5).src = "./assets/img/mediumImg.png";
        document.getElementById("prio" + 6).src = "./assets/img/lowImg.png";
    }
    if (selectedUrgency == 'medium') {
        document.getElementById("prio" + i).src = "./assets/img/mediumOnclick.png"
        document.getElementById("prio" + 4).src = "./assets/img/urgentImg.png"
        document.getElementById("prio" + 6).src = "./assets/img/lowImg.png"
    }
    if (selectedUrgency == 'low') {
        document.getElementById("prio" + i).src = "./assets/img/lowOnclick.png"
        document.getElementById("prio" + 4).src = "./assets/img/urgentImg.png"
        document.getElementById("prio" + 5).src = "./assets/img/mediumImg.png"
    }

}


async function renderTaskCards(i, j) {
    clearSubsections()
    let search = filterTasks()
    j = 0;
    let colorCircle = 0

    for (i = 0; i < tasks.length; i++) {

        if (tasks[i].title.toLowerCase().includes(search)) {

            checkForReadiness(i, j)
            document.getElementById('progressBar' + i).style.background = tasks[i].colorOfBar
            renderAssignedContactsOnBoard(i, colorCircle)
            hideProgressSection(i)
            j++
        }

    }


    function hideProgressSection(i) {
        if (tasks[i].subtasks.length == 0) {
            document.getElementById(`progressBarSection${i}`).classList.remove('progressBarSection');
            document.getElementById(`progressBarSection${i}`).classList.add('displayNone');
        }
    }

}


function renderAssignedContactsOnBoard(i, colorCircle) {
    if (tasks[i].assignedTo.length > 0) {
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
    if (tasks[i].assignedTo.length > 0) {
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


function addPriority(i) {
    let selectedPriority = document.getElementById("prio" + i);
    let selectedUrgency = selectedPriority.getAttribute("value")
    if (prios.length == 0) {
        colorPrios(selectedUrgency, i)
        prios.push(selectedUrgency)
    } else {
        prios = []
        colorPrios(selectedUrgency, i)
        prios.push(selectedUrgency)
    }
}

function addCategoryOnTask() {
    let value = document.getElementById('selectedCategoryInputValue').value;
    if (value) {
        document.getElementById('labelCategory').innerHTML = '';
        document.getElementById('labelCategory').innerHTML = `<div class="assignedCategoryValues">
         ${value}
          <div class="colorPicker colorPickerAssigned" style="background-color: ${colorsCategory}"  id="assignedColor"></div>
         </div>` ;
        document.getElementById('hiddenInputCategory').classList.add('displayNone')
        document.getElementById('dropdownCategory').style = 'none'
    }
}



function addSubtaskOnPopUp() {
    let subtask = document.getElementById('subtaskPopUp');
    if (subtask.value) {
        subtasksToSave.push({
            subtask: subtask.value,
            checkedValue: 0,
        })}
        subtask.value = ''
        renderSubtasksOnPopUpAddTask()
    
}

function deleteSubtask(i) {
    subtasksToSave.splice(i, 1)
    renderSubtasksOnPopUpAddTask()

}


function renderSubtasksOnPopUpAddTask() {
    document.getElementById('subtasksPopUp').innerHTML = ''
    subtasksToSave.forEach((subtask, index) => {
        document.getElementById('subtasksPopUp').innerHTML += `<div class="checkBoxDiv">
        <label class="subtaskLabel">${subtask.subtask}</label><img src=".././assets/img/closeButtonBoard.png" onclick="deleteSubtask(${index})">
        </div>`
    })
}


function priorityImageForRenderTaskCards(i) {
    if (tasks[i].prio == 'urgent') { document.getElementById(`urgencyBoard${i}`).src = prioImages[0] }
    if (tasks[i].prio == 'medium') { document.getElementById(`urgencyBoard${i}`).src = prioImages[1] }
    if (tasks[i].prio == 'low') { document.getElementById(`urgencyBoard${i}`).src = prioImages[2] }

}


function priorityImageForRenderFullTaskCard(i) {
    if (tasks[i].prio == 'urgent') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[0] }
    if (tasks[i].prio == 'medium') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[1] }
    if (tasks[i].prio == 'low') { document.getElementById(`urgencyFullCard${i}`).src = prioImagesFullCard[2] }

}


async function renderDialogFullCard(i, colorCircle) {

    let counter = 0
    document.getElementById('dialogFullCard').classList.remove('displayNone')
    document.getElementById('dialogFullCard').innerHTML = HTMLrenderDialogFullCard(i)
    priorityImageForRenderFullTaskCard(i)
    tasks[i].subtasks.forEach(subtask => {
        document.getElementById('subtasksFullCard').innerHTML += HTMLrenderSubtasksDialogFullCard(i, subtask, counter)
        counter++
    })
    renderAssignedContactsOnFullCard(i)
    checkForChecked(i, `checkBox${counter}`)
    await backend.setItem('tasks', JSON.stringify(tasks))
}


function openEditTask(i) {

    document.getElementById('dialogEditCard').classList.remove('displayNone')
    document.getElementById('dialogEditCard').innerHTML = openEditTaskHTML(i)
    document.getElementById(`editedDate`).setAttribute("min", date.toISOString().split("T")[0]);
    listenToEvent()
}


async function editTask(i) {
    tasks = JSON.parse(await backend.getItem('tasks'))
    let title = document.getElementById('editedTask');
    let description = document.getElementById('editedDescription');
    let date = document.getElementById('editedDate');
    let assignedTo = assignedContacts.splice(0, assignedContacts.length)

    tasks[i] = {
        title: title.value,
        description: description.value,
        category: tasks[i].category,
        colorCategory: tasks[i].colorCategory,
        assignedTo,
        date: date.value,
        prio: tasks[i].prio,
        readinessState: tasks[i].readinessState,
        subtasks: tasks[i].subtasks,
        colorOfBar: tasks[i].colorOfBar,
        percentOfDone: tasks[i].percentOfDone,
        pace: tasks[i].pace,
    };

    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
    closeEditCard()
}


function closeEditCard() {
    document.getElementById('dialogFullCard').classList.add('displayNone')
    document.getElementById('dialogEditCard').classList.add('displayNone')
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


function filterTasks() {
    let search = document.getElementById('findATask').value
    search = search.toLowerCase()
    return search
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


function openTask() {
    document.getElementById('dialogFullCard').classList.remove('displayNone')

}


function closeTask() {
    document.getElementById('dialogFullCard').classList.add('displayNone')
    renderTaskCards();
}


function openPopUpAddTask() {
    document.getElementById('addTaskPopUp').classList.add('openPopUp')
}


function closePopUpAddTask() {
    document.getElementById('addTaskPopUp').classList.remove('openPopUp')
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



function checkForChecked(i, checkedbox) {
    for (let counter = 0; counter < tasks[i].subtasks.length; counter++) {
        checkedbox = document.getElementById(`checkBox${counter}`)

        if (tasks[i].subtasks[counter].checkedValue == 0) {
            checkedbox.checked = false
        } else { checkedbox.checked = true }
    }
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



document.addEventListener('DOMContentLoaded', function () {
    let contactList = document.getElementById('eventLisPopUp');
    let dropdownAddContact = document.getElementById('dropdownAddContactPopUp')
    contactList.addEventListener('mouseenter', function (event) {
        dropdownAddContact.innerHTML = ''
        contacts.forEach((contact, index) => {
            dropdownAddContact.innerHTML += `<div class="droppedContacts"><a>${contact.name}</a><input onclick="addToAssignedContacts('${index}')" type="checkbox"></div>`;
        });
    });
});


function listenToEvent() {
    var entireEditTaskCard = document.getElementById('entireEditTaskCard');
    if (entireEditTaskCard) {


        let contactList = document.getElementById('reassignContacts');
        let dropdownAddContact = document.getElementById('editedDropdownAddContact');
        contactList.addEventListener('mouseenter', function () {
            dropdownAddContact.innerHTML = ''
            contacts.forEach((contact, index) => {

                dropdownAddContact.innerHTML += `<div class="droppedContacts"><a>${contact.name}</a><input onclick="addToAssignedContacts('${index}')" type="checkbox"></div>`;
            });
        });

    }
}









function openInputAddCategory() {
    document.getElementById('selectedCategoryInputValue').value = ''
    document.getElementById('hiddenInputCategory').classList.remove('displayNone')
    document.getElementById('dropdownCategory').style = 'display:none'
}

function colorPrios(selectedUrgency, i) {
    if (selectedUrgency == 'urgent') {
        document.getElementById("prio" + i).src = "./assets/img/urgentOnclick.png";
        document.getElementById("prio" + 2).src = "./assets/img/mediumImg.png";
        document.getElementById("prio" + 3).src = "./assets/img/lowImg.png";
    }
    if (selectedUrgency == 'medium') {
        document.getElementById("prio" + i).src = "./assets/img/mediumOnclick.png"
        document.getElementById("prio" + 1).src = "./assets/img/urgentImg.png"
        document.getElementById("prio" + 3).src = "./assets/img/lowImg.png"
    }
    if (selectedUrgency == 'low') {
        document.getElementById("prio" + i).src = "./assets/img/lowOnclick.png"
        document.getElementById("prio" + 1).src = "./assets/img/urgentImg.png"
        document.getElementById("prio" + 2).src = "./assets/img/mediumImg.png"
    }

}


function addCategoryColorOnTask(i) {
    let value = document.getElementById('selectedCategoryInputValue').value;
    if (value) {
        let color = document.getElementById("color" + i).style.backgroundColor
        if (colorsCategory.length == 0) {
            colorsCategory.push(color)
        } else {
            colorsCategory = []
            colorsCategory.push(color)
        }
        addCategoryOnTask()
    }

}



function openInputAddContact() {
    document.getElementById('hiddenInputAddContact').classList.remove('displayNone')
    document.getElementById('dropdownAddContact').style = 'display:none'
}

function addToAssignedContacts(index) {
    if (index >= 0 && index < contacts.length) {
        let contact = contacts[index];

        if (!assignedContacts.includes(contact)) {
            assignedContacts.push(contact);
        } else {
            assignedContacts.splice(assignedContacts.indexOf(contact), 1);
        }
        console.log(assignedContacts)
    }
}








function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4) {
                    if (this.status == 200) { elmnt.innerHTML = this.responseText; }
                    if (this.status == 404) { elmnt.innerHTML = "Page not found."; }
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            /* Exit the function: */
            return;
        }
    }
}

