let loggedUser;
let joinUsers = [];
let tasks = [];

async function onLoad() {
    await includeHTML();
    await setUrl();
    getCheckboxFeedback();
    getTasks();
}


function getCheckboxFeedback() {
    let checkedBox = localStorage.getItem('checkedBox');
    if (checkedBox === 'true') {
        document.body.innerHTML += returnCheckboxFeedback();
    }
    getTime();
}


function returnCheckboxFeedback() {
    return `
                <div class="checkbox-feedback">
                Your login details are stored in your browser.
                </div>
            `;
}


async function setUrl() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    getUsers();
}


/**
 * This function parses the json array from the backend.
 */
async function getUsers() {
    try {
        joinUsers = JSON.parse(await backend.getItem('joinUsers')) || [];
        console.log(joinUsers);
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function getTime() {
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let greeting = document.getElementById('greeting');

    if (hour >= 1 && hour < 12) {
        greeting.innerHTML = "Guten Morgen,";
    } else if (hour >= 12 && hour < 18) {
        greeting.innerHTML = "Guten Tag,";
    } else {
        greeting.innerHTML = "Guten Abend,";
    }
    greetUser();
}


function greetUser() {
    let loginValue = localStorage.getItem('LogIn');
    if (loginValue === 'User') {
        greetUserName();
    }
}

function greetUserName() {
    loggedUser = localStorage.getItem('Logged User');

    for (let i = 0; i < joinUsers.length; i++) {
        const user = joinUsers[i];
        let loggedName = user['userName'];
        let loggedEmail = user['userEmail'];

        if (loggedEmail == loggedUser) {
            document.getElementById('greetUser').innerHTML = loggedName;
        }
    }
}


function hoverTodoOn() {
    document.getElementById('todo-icon').style = "filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(280deg) brightness(104%) contrast(104%);";
    document.getElementById('todo-number').style.color = "white";
}

function hoverDoneOn() {
    document.getElementById('done-icon').style = "filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(280deg) brightness(104%) contrast(104%);";
    document.getElementById('done-number').style.color = "white";
}

function hoverOff() {
    document.getElementById('todo-icon').style = "filter: none;";
    document.getElementById('done-icon').style = "filter: none;";
    document.getElementById('done-number').style.color = "black";
    document.getElementById('todo-number').style.color = "black";
}


 async function getTasks() {
    tasks = await JSON.parse( backend.getItem('tasks')) || [];
    tasksLength = tasks.length;

    tasksInBoard.innerHTML = tasksLength;
    // tasksInProgress.innerHTML = '';
}