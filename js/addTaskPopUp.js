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
let dropDownCategory = false;
let categorySelected = false;


function disableButtonAddTask() {
    let button = document.getElementById('buttonCreateTaskPopUpTask')
    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 3000);
}

function addToTasks() {
    if (prioSelected && categoryIsSelected()) {
        prioSelected = false;
        createTask();
    } else if (!prioSelected) {
        alertPrioRequired();
    } 
    // else {
    //     categoryIsSelected();
    // }
}

function categoryIsSelected() {
    if (document.getElementById('selectedCategoryInputValue').value === '' && document.getElementById('selectedCategoryValue').innerHTML === '') {
        
        document.getElementById('dropdown').classList.add('required-field');
        document.getElementById('selectedCategoryInputValue').classList.add('required-field');
        console.log('no category');
        return false;
    } else {
        return true;
    }
}


function setCategory() {
    if (document.getElementById('selectedCategoryInputValue').value) {
        return document.getElementById('selectedCategoryInputValue').value;
    } else {
        return document.getElementById('selectedCategoryValue').innerHTML;
    }
}


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
        readinessState: 'toDo',
        assignedTo,
        pace: 0
    };

    clearValuesOfAddTask(title, description, category, assignedTo, date);
    tasks.push(task);
    disableButtonAddTask();
    await backend.setItem('tasks', JSON.stringify(tasks));
    popTheAddedDesk();
    continueScrolling();
}


function alertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        // setTimeout(() => {
            const prioElement = document.getElementById('prio' + i);
            prioElement.classList.add('required-field');
        // }, 500);
    }
}

function removeAlertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        // setTimeout(() => {
            const prioElement = document.getElementById('prio' + i);
            prioElement.classList.remove('required-field');
        // }, 500);
    }
}


function addSubtaskOnPopUp() {
    let subtask = document.getElementById('subtaskPopUp');
    if (subtask.value) {
        subtasksToSave.push({
            subtask: subtask.value,
            checkedValue: 0,
        })
    }
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
        <label class="subtaskLabel">${subtask.subtask}</label><img src="../assets/img/closeButtonBoard.png" onclick="deleteSubtask(${index})">
        </div>`
    })
}


function openPopUpAddTask() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.add('background-aniamtion');
    addTaskPopoup.classList.add('openPopUp');
    document.getElementById(`date`).setAttribute("min", date.toISOString().split("T")[0]);
    stopScrolling();
}


function closePopUpAddTask() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.remove('background-aniamtion');
    addTaskPopoup.classList.remove('openPopUp')
    continueScrolling();
}


async function popTheAddedDesk() {
    document.getElementById('popUpWhenAdded').classList.remove('displayNone')
    // setTimeout(function () { 
        document.getElementById('popUpWhenAdded').classList.add('displayNone') 
    // }, 2000)
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
        document.getElementById("prio" + i).src = "../assets/img/urgentOnclick.png";
        document.getElementById("prio" + 5).src = "../assets/img/mediumImg.png";
        document.getElementById("prio" + 6).src = "../assets/img/lowImg.png";
    }
    if (selectedUrgency == 'medium') {
        document.getElementById("prio" + i).src = "../assets/img/mediumOnclick.png"
        document.getElementById("prio" + 4).src = "../assets/img/urgentImg.png"
        document.getElementById("prio" + 6).src = "../assets/img/lowImg.png"
    }
    if (selectedUrgency == 'low') {
        document.getElementById("prio" + i).src = "../assets/img/lowOnclick.png"
        document.getElementById("prio" + 4).src = "../assets/img/urgentImg.png"
        document.getElementById("prio" + 5).src = "../assets/img/mediumImg.png"
    }

}


function addPriority(i) {
    let selectedPriority = document.getElementById("prio" + i);
    let selectedUrgency = selectedPriority.getAttribute("value")
    if (prios.length == 0) {
        // colorPrios(selectedUrgency, i)
        // prios.push(selectedUrgency)
    } else {
        prios = []
        // colorPrios(selectedUrgency, i)
        // prios.push(selectedUrgency)
    }
    if (!prioSelected) {
        removeAlertPrioRequired();
    }
    colorPrios(i);
    prios.push(selectedUrgency)
}


function colorPrios(i) {
    for (let i = 1; i <= 3; i++) {
        const prioElement = document.getElementById('prio' + i);
        prioElement.classList.remove('prio' + i + '-clicked');
    }
    prioSelected = true;
    document.getElementById('prio' + i).classList.add('prio' + i + '-clicked');
}


function addCategoryOnTask(categorySelected, i) {
    let value = document.getElementById('selectedCategoryInputValue').value;
    let labelCategory = document.getElementById('labelCategory');

    if (value && colorSelected) {
        labelCategory.innerHTML = '';
        labelCategory.innerHTML = newCategoryHTML(value);

        newCategoryStyle(labelCategory);
    } else if (categorySelected === 'categorySelected') {
        let selectedCategoryValue = document.getElementById(`categoryValue${i}`).innerHTML;
        let selectedCategoryColor = document.getElementById(`categorColor${i}`).style.backgroundColor;

        labelCategory.innerHTML = '';
        labelCategory.innerHTML = selectedCategoryHTML(selectedCategoryValue, selectedCategoryColor);

        document.getElementById('assignedColor').classList.add('color-picker-picked');
        addSelectedColorToTask(i);
    }
}

function newCategoryStyle(labelCategory) {
    document.getElementById('dropdown').classList.remove('displayNone');
    labelCategory.classList.add('setlabelCategory');
    document.getElementById('hiddenInputCategory').classList.add('displayNone');
    document.getElementById('assignedColor').classList.add('color-picker-picked');
}


function openInputAddCategory() {
    document.getElementById('dropdown').classList.add('displayNone');
    document.getElementById('selectedCategoryInputValue').value = ''
    document.getElementById('hiddenInputCategory').classList.remove('displayNone')
    document.getElementById('dropdownCategory').style = 'display:none'
}


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


function addToAssignedContacts(index) {
    if (index >= 0 && index < contacts.length) {
        let contact = contacts[index];

        if (!assignedContacts.includes(contact)) {
            assignedContacts.push(contact);
        } else {
            assignedContacts.splice(assignedContacts.indexOf(contact), 1);
        }
    }
}


function closeHiddenInput() {
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('dropdown').classList.remove('displayNone');
    document.getElementById('hiddenInputCategory').classList.add('displayNone')
    // document.getElementById('dropdownCategory').style = 'display:inlineBlock';
}


function contactList() {
    // let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');

    let droppedContacts = document.getElementById('droppedContacts');
    let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');
    let dropdownContent = document.getElementById('dropdownContent');

    if (!dropdownContent) {
        document.getElementById('eventLisPopUp').innerHTML += addDropdownContainer();
        document.getElementById('assignArrow').style.transform = "rotate(0deg)";

        addDropdownContacts();
    } else {
        checkForCheckedAssignedPopUp();
        removeAddTaskContactList();
    }
}


function removeAddTaskContactList() {
    dropdownContent.remove();
    document.getElementById('assignArrow').style.transform = "rotate(180deg)";
}


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


function checkForCheckedAssignedPopUp() {
    let checkedbox

    contacts.forEach((contact, index) => {

        assignedContacts.forEach(assigned => {
            checkedbox = document.getElementById(`checkboxAssigned${index}`)
            if (contact.email === assigned.email) {
                checkedbox.checked = true;
            }
        });
    });
}


function dropdownCategory() {
    // document.getElementById('dropdownCategory').style.display = "block";

    let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');
    let dropdownCategory = document.getElementById('dropdownCategory');

    if (!dropDownCategory) {
        dropDownCategory = true;
        document.getElementById('dropdown').innerHTML += addDropdownCategory();
        document.getElementById('dropdownCategory').style.display = "block";
        document.getElementById('categoryArrow').style.transform = "rotate(0deg)";

        addDropdownContentCategory();
    } else {
        dropDownCategory = false;
        dropdownCategory.remove();
        document.getElementById('categoryArrow').style.transform = "rotate(180deg)";
    }
}

function addDropdownContentCategory() {
    let dropdownAddCategoryPopUp = document.getElementById('dropdownAddCategoryPopUp');
    const uniqueCategories = new Set();

    dropdownAddCategoryPopUp.innerHTML = ''

    for (let i = 0; i < tasks.length; i++) {
        const task = tasks[i];
        checkAndWriteCategories(dropdownAddCategoryPopUp, uniqueCategories, task, i);
    }
}

function checkAndWriteCategories(dropdownAddCategoryPopUp, uniqueCategories, task, i) {
    if (!uniqueCategories.has(task.category)) {
        uniqueCategories.add(task.category);

        dropdownAddCategoryPopUp.innerHTML += `
        <div class="dropdownCategory" onclick="addCategoryOnTask('categorySelected', ${i})">
            <div id="categorColor${i}" class="colorPicker colorPickerAssigned" style="background-color: ${task.colorCategory}"></div>
            <a class="dropdown-link" id="categoryValue${i}">${task.category}</a> 
        </div>
    `;
    }
}