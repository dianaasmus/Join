let tasks = [];
let awaitingFeedback = [];
let toDo = [];
let inProgress = [];
let done = [];


async function onLoad() {
    await includeHTML();
    await setUrl();
    greetUser();
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
}


function greetUser() {
    let loignBtnClick = localStorage.getItem('LoginBtn');
    if (loignBtnClick == 'true') {

        // document.body.innerHTML += addWelcomeSummary();
        let loginValue = localStorage.getItem('LogIn');
        if (loginValue === 'User') {
            greetUserName();
        }
    }
    
    localStorage.setItem('LoginBtn', false);
}

function addWelcomeSummary() {
    return `
    <div id="welcomingSummary">
        <div id="welcomeGreeting">
            <div>
                <h3 id="greeting"></h3>
                <h4 id="greetUser"></h4>
            </div>
        </div>
    </div>
    `;
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
    getCheckboxFeedback();

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
    tasks = await JSON.parse(backend.getItem('tasks')) || [];

    for (let t = 0; t < tasks.length; t++) {
        const task = tasks[t];
        const taskReadinessState = task['readinessState'];
        await setTaskStates(taskReadinessState);
    }
    parseTaskStates();
}

async function setTaskStates(taskReadinessState) {
    switch (taskReadinessState) {
        case 'toDo':
            toDo.push(taskReadinessState);
            await backend.setItem('ToDo', JSON.stringify(toDo))
            break;
        case 'inProgress':
            inProgress.push(taskReadinessState);
            await backend.setItem('InProgress', JSON.stringify(inProgress))
            break;
        case 'awaitingProgress':
            awaitingFeedback.push(taskReadinessState);
            await backend.setItem('AwaitingFeedback', JSON.stringify(awaitingFeedback))
            break;
        case 'done':
            done.push(taskReadinessState);
            await backend.setItem('Done', JSON.stringify(done))
            break;
    }
}

function parseTaskStates() {
    tasksInBoard.innerHTML = tasks.length;;
    tasksInProgress.innerHTML = inProgress.length;
    // =================================================================================== urgent fehlt
    document.getElementById('awaiting-number').innerHTML = awaitingFeedback.length;
    document.getElementById('todo-number').innerHTML = toDo.length;
    document.getElementById('done-number').innerHTML = done.length;
}
