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
let existingCategorySelected = false;
let categorySelected = false;
let setReadinessState;
let addTaskPage = false;


function disableButtonAddTask() {
    let button = document.getElementById('buttonCreateTaskPopUpTask')
    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 3000);
}


function addToTasks() {
    if (prioSelected && checkCategorySelect()) {
        prioSelected = false;
        createTask();
    } else if (!prioSelected) {
        alertPrioRequired();
    }
}


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
    clearPopUp();
    removeAddTaskPopup();
}


function setCategory() {
    if (document.getElementById('selectedCategoryInputValue').value) {
        return document.getElementById('selectedCategoryInputValue').value;
    } else if (document.getElementById('selectedCategoryValue')) {
        return document.getElementById('selectedCategoryValue').innerHTML;
    } else {
        return false;
    }
}


function selectedState() {
    if (setReadinessState === 'awaitingFeedback') {
        return 'awaitingFeedback';
    } else if (setReadinessState === 'inProgress') {
        return 'inProgress';
    } else if (setReadinessState === 'toDo') {
        return 'toDo';
    }
}


async function addTask(task) {
    tasks.push(task);
    await backend.setItem('tasks', JSON.stringify(tasks));
    addTaskFeedback();
    if (!document.getElementById('addTaskPopUp').classList.contains('add-task-html-style')) {
        renderTaskCards();
    }
}


function addTaskFeedback() {
    if (addTaskPage) {
        document.body.innerHTML += addedTaskFeedback();
        removeAddTaskFeedback();
    } else {
        continueScrolling();
    }
    addTaskPage = false;
}


function removeAddTaskFeedback() {
    // setTimeout(() => {
    //     document.getElementById('popUpWhenAdded').classList.add('removeAddedTaskAnimtion');
    // }, 1500);
    setTimeout(() => {
        document.getElementById('popUpWhenAdded').remove();
        window.location.href = 'board.html';
    }, 1500);

}


function clearPopUp() {
    let title = document.getElementById('task');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let assignedTo = assignedContacts.splice(0, assignedContacts.length)
    let category = setCategory();


    clearValuesOfAddTask(title, description, category, assignedTo, date);
    disableButtonAddTaskBtns();
    emptySubtasks();
    removePrioColors('addedTask');
    removecategorySelection();
    enableButtonAddTaskBtns();
}


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


function disableButtonAddTaskBtns() {
    document.getElementById('buttonClearTaskPopUpTask').disabled = true;
    document.getElementById('buttonCreateTaskPopUpTask').disabled = true;
}


function emptySubtasks() {
    document.getElementById('subtasksPopUp').innerHTML = '';
}


function removePrioColors(condition) {
    const maxPriority = condition ? 3 : 6;

    for (let i = 1; i <= maxPriority; i++) {
        const prioElement = document.getElementById(`prio${i}`);
        prioElement.classList.remove(`prio${i}-clicked`);
        prioElement.classList.add('prio-hover');
    }
}


function removecategorySelection() {
    if (document.getElementById('assignedCategoryValues')) {
        document.getElementById('assignedCategoryValues').remove();
    }
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('labelCategory').innerHTML = 'Select task category';
    document.getElementById('dropdown').classList.remove('displayNone');
}


function removeAddTaskPopup() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.remove('background-aniamtion');
    addTaskPopoup.classList.add('closeAddedPopUp');
    removeClassLists(addTaskPopoup);
}


function addTaskContactPopup() {
    addTaskNewContact = true;
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.add('closeAddedPopUp');
    openAddContacts();
}


function removeClassLists(addTaskPopoup) {
    setTimeout(() => {
        addTaskPopoup.classList.remove('openPopUp');
        addTaskPopoup.classList.remove('closeAddedPopUp');
    }, 200);
}


function enableButtonAddTaskBtns() {
    document.getElementById('buttonClearTaskPopUpTask').disabled = false;
    document.getElementById('buttonCreateTaskPopUpTask').disabled = false;
}


function closePopUpAddTask() {
    clearPopUp();
    continueScrolling();
    removeAddTaskPopup();
}


function alertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        const prioElement = document.getElementById('prio' + i);
        prioElement.classList.add('required-field');
    }
}


function removeAlertPrioRequired() {
    for (let i = 1; i <= 3; i++) {
        const prioElement = document.getElementById('prio' + i);
        prioElement.classList.remove('required-field');
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
    subtask.value = '';
    renderSubtasksOnPopUpAddTask();
}


function renderSubtasksOnPopUpAddTask() {
    document.getElementById('subtasksPopUp').innerHTML = '';
    subtasksToSave.forEach((subtask, index) => {
        document.getElementById('subtasksPopUp').innerHTML += `<div class="checkBoxDiv">
        <label class="subtaskLabel">${subtask.subtask}</label><img src="../assets/img/addSubtaskButton.png" onclick="deleteSubtask(${index})">
        </div>`
    });
}


function deleteSubtask(i) {
    subtasksToSave.splice(i, 1);
    renderSubtasksOnPopUpAddTask();
}


function openPopUpAddTask(state) {
    setReadinessState = state;
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.add('background-aniamtion');
    addTaskPopoup.classList.add('openPopUp');
    document.getElementById(`date`).setAttribute("min", date.toISOString().split("T")[0]);
    stopScrolling();
}


async function deleteTask(i) {
    tasks.splice(i, 1);
    await backend.setItem('tasks', JSON.stringify(tasks))
    renderTaskCards();
    document.getElementById('dialogFullCard').classList.add('displayNone');
    checkContinueScrolling();
}

function checkContinueScrolling() {
    if (!addTaskPage) {
        continueScrolling();
    }
}


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


function colorPrios(i, condition) {
    let prioElement = document.getElementById('prio' + i);

    removePrioColors(condition);
    prioSelected = true;
    prioElement.classList.add('prio' + i + '-clicked');
    prioElement.classList.remove('prio-hover');
}


function addCategoryOnTask(existingCategorySelected, i) {
    let value = document.getElementById('selectedCategoryInputValue').value;
    let labelCategory = document.getElementById('labelCategory');
    categorySelected = true;
    removeAlertCategoryRequired();

    if (value && colorSelected) {
        labelCategory.innerHTML = '';
        labelCategory.innerHTML = newCategoryHTML(value);

        newCategoryStyle(labelCategory);
    } else if (existingCategorySelected === 'true') {
        let selectedCategoryValue = document.getElementById(`categoryValue${i}`).innerHTML;
        let selectedCategoryColor = document.getElementById(`categorColor${i}`).style.backgroundColor;

        labelCategory.innerHTML = '';
        labelCategory.innerHTML = selectedCategoryHTML(selectedCategoryValue, selectedCategoryColor);

        document.getElementById('assignedColor').classList.add('color-picker-picked');
        addSelectedColorToTask(i);
    }
}

function removeAlertCategoryRequired() {
    let selectedCategoryInputValue = document.getElementById('selectedCategoryInputValue');
    let dropdownContainer = document.getElementById('dropdown');

    selectedCategoryInputValue.classList.remove('required-field');
    dropdownContainer.classList.remove('required-field');
}

function newCategoryStyle(labelCategory) {
    document.getElementById('dropdown').classList.remove('displayNone');
    labelCategory.classList.add('setlabelCategory');
    document.getElementById('hiddenInputCategory').classList.add('displayNone');
    document.getElementById('assignedColor').classList.add('color-picker-picked');
}


function openInputAddCategory() {
    document.getElementById('dropdown').classList.add('displayNone');
    document.getElementById('selectedCategoryInputValue').value = '';
    document.getElementById('hiddenInputCategory').classList.remove('displayNone');
    document.getElementById('dropdownCategory').style = 'display:none';
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
    document.getElementById('hiddenInputCategory').classList.add('displayNone');
    // document.getElementById('dropdownCategory').style = 'display:inlineBlock';
}


function contactList() {
    // let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');

    let droppedContacts = document.getElementById('droppedContacts');
    let dropdownAddContactPopUp = document.getElementById('dropdownAddContactPopUp');
    let dropdownContent = document.getElementById('dropdownContent');

    if (dropdownContent.classList.contains('displayNone')) {
        // document.getElementById('eventLisPopUp').innerHTML += addDropdownContainer();
        dropdownContent.classList.remove('displayNone');
        document.getElementById('assignArrow').style.transform = "rotate(0deg)";

        addDropdownContacts();
    } else {
        checkForCheckedAssignedPopUp();
        removeAddTaskContactList();
    }
}


function removeAddTaskContactList() {
    let dropdownContent = document.getElementById('dropdownContent');
    dropdownContent.classList.add('displayNone');
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
        <div class="dropdownCategory" onclick="addCategoryOnTask('true', ${i})">
            <div id="categorColor${i}" class="colorPicker colorPickerAssigned" style="background-color: ${task.colorCategory}"></div>
            <a class="dropdown-link" id="categoryValue${i}">${task.category}</a> 
        </div>
    `;
    }
}