


let tasks = []
let prios = []
let categories = []
let colorsCategory = []
let prioImages = ['./assets/img/urgent.png', './assets/img/medium.png', './assets/img/low.png']
let prioImagesFullCard = ['./assets/img/urgentOnclick.png', './assets/img/mediumOnclick.png', './assets/img/lowOnclick.png']
let tasksToEdit = []
let subtasksToSave = []
let currentDragged



async function initAddTask() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = await JSON.parse(await backend.getItem('tasks')) || []
    let date = new Date();
    document.getElementById("date").setAttribute("min", date.toISOString().split("T")[0]);
    includeHTML();


}


async function initBoard() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    tasks = await JSON.parse(await backend.getItem('tasks')) || []
    includeHTML();
    renderTaskCards()
}


async function deleteTask(i) {

    tasks.splice(i, 1);
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();


    document.getElementById('dialogFullCard').classList.add('displayNone')

}


async function addToTasks() {


    let title = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let subtasks = subtasksToSave.splice(0, subtasksToSave.length)
    let category = document.getElementById('selectedCategoryInputValue');
    let assignedTo = document.getElementById('hiddenInputAddContact');
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
        readinessState: 'toDo'
    };

    title.value = '',
        description.value = '',
        category.value = '',
        assignedTo.value = '',
        date.value = '',

        tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks))

    popTheAddedDesk()
    await renderTaskCards()

}


async function popTheAddedDesk() {
    document.getElementById('popUpWhenAdded').classList.remove('displayNone')
    setTimeout(function () { document.getElementById('popUpWhenAdded').classList.add('displayNone') }, 2000)
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


function addEditedPriority(i) {
    let selectedPriority = document.getElementById("prio" + i);
    let selectedUrgency = selectedPriority.getAttribute("value")
    if (prios.length == 0) {
        editColorPrios(selectedUrgency, i)
        prios.push(selectedUrgency)
    } else {
        prios = []
        editColorPrios(selectedUrgency, i)
        prios.push(selectedUrgency)
    }
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


async function removeAll() {
    tasks = JSON.parse(await backend.getItem('tasks'))
    tasks.length = 0
    await backend.setItem('tasks', JSON.stringify(tasks))
}


async function renderTaskCards(i, j) {
    clearSubsections()
    let search = filterTasks()
    tasks = JSON.parse(await backend.getItem('tasks'))
    j = 0;
    for (i = 0; i < tasks.length; i++) {
        if (tasks[i].title.toLowerCase().includes(search)) {
            checkForReadiness(i, j)
        }
        j++
    }
}


function addSubtask() {
    let subtask = document.getElementById('subtask');
    subtasksToSave.push(subtask.value)
    subtask.value = ''
    renderSubtasksOnAddTask()
    console.log(subtasksToSave)
}


function renderSubtasksOnAddTask() {
    document.getElementById('subtasksOnAddTask').innerHTML = ''
    subtasksToSave.forEach(subtask => {
        document.getElementById('subtasksOnAddTask').innerHTML += `<div class="checkBoxDiv">
        <label class="subtaskLabel">${subtask}</label><input type="checkbox" class="addedSubtask" value="${subtask}">
        </div>`
    })
}


function addSubtaskOnPopUp() {
    let subtask = document.getElementById('subtaskPopUp');
    subtasksToSave.push(subtask.value)
    subtask.value = ''
    renderSubtasksOnPopUpAddTask()
    console.log(subtasksToSave)
}


function renderSubtasksOnPopUpAddTask() {
    document.getElementById('subtasksPopUp').innerHTML = ''
    subtasksToSave.forEach(subtask => {
        document.getElementById('subtasksPopUp').innerHTML += `<div class="checkBoxDiv">
        <label class="subtaskLabel">${subtask}</label><input type="checkbox" class="addedSubtask" value="${subtask}">
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


function openInputAddCategory() {
    document.getElementById('selectedCategoryInputValue').value = ''
    document.getElementById('hiddenInputCategory').classList.remove('displayNone')
    document.getElementById('dropdownCategory').style = 'display:none'

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


function renderDialogFullCard(i) {

    document.getElementById('dialogFullCard').classList.remove('displayNone')
    document.getElementById('dialogFullCard').innerHTML = HTMLrenderDialogFullCard(i)
    priorityImageForRenderFullTaskCard(i)

}


function openEditTask(i) {
    document.getElementById('dialogEditCard').classList.remove('displayNone')
    document.getElementById('dialogEditCard').innerHTML = openEditTaskHTML(i)
    tasks[i].subtasks.forEach(subtask => {
        document.getElementById('subtasksFullCard').innerHTML +=
            `<span>${subtask}</span>`
    })

}


async function editTask(i) {
    tasks = JSON.parse(await backend.getItem('tasks'))

    let category = tasks[i].category;
    let colorCategory = tasks[i].colorCategory;
    let prio = prios.slice(0).toString()
    let readinessState = tasks[i].readinessState
    let title = document.getElementById('editedTask');
    let description = document.getElementById('editedDescription');
    let date = document.getElementById('editedDate');
    let assignedTo = document.getElementById('editedHiddenInputAddContact');
    let subtasks = tasks[i].subtasks

    tasks[i] = {
        title: title.value,
        description: description.value,
        category,
        colorCategory,
        assignedTo: assignedTo.value,
        date: date.value,
        prio,
        readinessState,
        subtasks

    };

    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
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


function closeHiddenInput() {
    document.getElementById('hiddenInputCategory').classList.add('displayNone')
    document.getElementById('dropdownCategory').style = 'display:inlineBlock'
    console.log('yes')
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
}


function openPopUpAddTask() {
    document.getElementById('addTaskPopUp').classList.add('openPopUp')
}


function closePopUpAddTask() {
    document.getElementById('addTaskPopUp').classList.remove('openPopUp')
}
