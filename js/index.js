let lastUser = [];
let checkedBox;
let loggedUser;

/**
 * Is executed as soon as the html page loads and initialises a new function.
 */
async function init() {
    await setUrl();
    loadUsers();
}


/**
 * Loads the specified variables that are stored in the backend.
 */
async function setUrl() {
    setURL("https://join.dianaasmus.com/smallest_backend_ever-master");
    await downloadFromServer();
}


/**
 * Loads all the registered users or displays an error.
 */
async function loadUsers() {
    try {
        joinUsers = JSON.parse(await backend.getItem('joinUsers')) || [];
    } catch (e) {
        console.error('Loading error:', e);
    }
    parseCheckbox();
}


/**
 * Executes the function checkUser() as soon as the enter button is pressed.
 * @param {string} event - This refers to an event object that contains information about the triggered event.
 */
function enter(event, i) {
    if (event.keyCode === 13) {
        checkUser();
    }
}


/**
 * Checks whether the login can take place or not.
 */
function checkUser() {
    if (userIsRegistered()) {
        disableBtn();
    } else {
        invalidInput();
    }
}


/**
 * Disables a button during the loading process.
 */
function disableBtn() {
    loginBtn.disabled = true;
    rememberMe();
}


/**
 * Checks whether the user email and password are registered and whether they match.
 */
function userIsRegistered() {
    for (let i = 0; i < joinUsers.length; i++) {
        const user = joinUsers[i];
        const signedUserEmail = user['userEmail'];
        const signedUserPassword = user['password'];
        let correctUser = (signedUserEmail == emailLogin.value && signedUserPassword == passwordLogin.value);
        if (correctUser) {
            return correctUser;
        }
    }
}


/**
 * Saves the Boolean Value of the checkbox.
 */
function rememberMe() {
    checkbox = document.getElementById('checkbox');
    checkedBox = checkbox.checked;

    localStorage.setItem('checkedBox', checkedBox);
    saveLastUser();
}


/**
 * Saves the input values and saves them remote.
 */
async function saveLastUser() {
    let lastUserData = 0;
    let user = document.getElementById('emailLogin').value;
    let userPassword = document.getElementById('passwordLogin').value;
    lastUserData = {
        'lastEmail': user,
        'lastPassword': userPassword
    };

    saveLastUserBackend(lastUserData);
}


/**
 * Saves the last user who logged in.
 */
async function saveLastUserBackend(lastUserData) {
    let lastUserAsString = JSON.stringify(lastUserData);
    await localStorage.setItem('lastUsers', lastUserAsString);
    resetLoginForm();
}


/**
 * Deletes the entered values of the input field.
 */
function resetLoginForm() {
    let loggedUser = emailLogin.value;
    localStorage.setItem('Logged User', loggedUser);

    emailLogin.value = '';
    passwordLogin.value = '';
    logIn();
}


/**
 * Adds an animation when the user email and/or password is wrong.
 */
function invalidInput() {
    emailLogin.classList.add('shake-animation');
    passwordLogin.classList.add('shake-animation');
    resetValues();
}


/**
 * Resets the inputs and animations.
 */
function resetValues() {
    emailLogin.value = '';
    passwordLogin.value = '';

    setTimeout(function () {
        emailLogin.classList.remove('shake-animation');
        passwordLogin.classList.remove('shake-animation');
    }, 1000)
}


/**
 * Checks onload if the checkbox is checked.
 */
async function parseCheckbox() {
    let checkedBox = localStorage.getItem('checkedBox');
    if (checkedBox === 'true') {
        checkbox.checked = true;
        parseLastUser();
    } else {
        checkbox.checked = false;
    }
}


/**
 * Parses the last Users email and password, if ,remember me' checkbox is checked.
 */
async function parseLastUser() {
    let lastUserAsString = localStorage.getItem('lastUsers')
    lastUserData = JSON.parse(lastUserAsString);
    let emailValue = lastUserData['lastEmail'];
    let passwordValue = lastUserData['lastPassword'];
    emailLogin.value = emailValue;
    passwordLogin.value = passwordValue;
}


/**
 * Opens the Guest Login.
 */
function openGuestLogin() {
    loginGuest.disableBtn = true;
    localStorage.setItem('LogIn', 'Guest');
    window.open("./summary.html", "_self");
}


/**
 * Adds an animation when a user logs is.
 */
async function logIn() {
    localStorage.setItem('LogIn', 'User');
    localStorage.setItem('LoginBtn', true);
    window.open("./summary.html", "_self");
}