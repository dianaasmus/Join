let loggedUser;
let joinUsers;

async function onLoad() {
    await includeHTML(); 
    getCheckboxFeedback();
    setUrl();
}


function getCheckboxFeedback() {
    let checkedBox = localStorage.getItem('checkedBox');
    if (checkedBox === 'true') {
        document.body.innerHTML += `
                <div class="checkbox-feedback">
                Your login details are stored in your browser.
                </div>
            `;
    }
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
    joinUsers = JSON.parse(await backend.getItem('joinUsers')) || [];
    greetUser();
}


function greetUser() {
    let loginValue = localStorage.getItem('LogIn');
    if (loginValue === 'User') {
        console.log('The value of "LogIn" key is "Guest".');
        // greetUser.classList.remove('d-none');
        greetUserName();
    } else {
        // profile.src = "./assets/img/name-icon";
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
            console.log(loggedName);
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