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


function disableButtonAddTask() {
    let button = document.getElementById('buttonCreateTaskPopUpTask')
    button.disabled = true;

    setTimeout(function () {
        button.disabled = false;
    }, 3000);
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
    setTimeout(() => {
        document.getElementById('popUpWhenAdded').remove();
        window.location.href = 'board.html';
    }, 1500);

}


function removeAddTaskPopup() {
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.remove('background-aniamtion-addTask');
    addTaskPopoup.classList.add('closeAddedPopUpAddTask');
    removeClassLists(addTaskPopoup);
}


function addTaskContactPopup() {
    addTaskNewContact = true;
    let addTaskPopoup = document.getElementById('addTaskPopUp');
    addTaskPopoup.classList.add('closeAddedPopUp');
    openAddContacts();
}


function removeClassLists(element) {
    setTimeout(() => {
        element.classList.remove('openPopUpAddTask');
        element.classList.remove('closeAddedPopUpAddTask');
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