let lastUser = [];
let checkedBox;


/**
 * this function executes the function checkUser() as soon as the enter button is pressed.
 */
function enter(event, i) {
    if (event.keyCode === 13) {
        checkUser();
    }
}


/**
 * This function checks whether the login can take place or not.
 */
function checkUser() {
    if (userIsRegistered()) {
        rememberMe();
        saveLastUser();
        resetLoginForm();
        window.open("./summary.html", "_self");
    } else {
        invalidInput();
    }
}


/**
 * This function checks whether the user email and password are registered and whether they match.
 */
function userIsRegistered() {
    for (let i = 0; i < joinUsers.length; i++) {
        const user = joinUsers[i];
        const signedUserEmail = user['emailSignUp'];
        const signedUserPassword = user['password'];
        let loginUser = document.getElementById('emailLogin');
        let loginUserPassword = document.getElementById('passwordLogin');

        return (signedUserEmail.includes(loginUser.value) && signedUserPassword.includes(loginUserPassword.value));
    }
}


/**
 * This function saves the Boolean Value of the checkbox.
 */
function rememberMe() {
    checkbox = document.getElementById('checkbox');
    checkedBox = checkbox.checked;

    localStorage.setItem('checkedBox', checkedBox);
}


/**
 * This function saves the input values and saves them remote.
 */
async function saveLastUser() {
    let user = document.getElementById('emailLogin').value;
    let userPassword = document.getElementById('passwordLogin').value;

    lastUser.length = 0;
    lastUser.push({
        lastEmail: user,
        lastPassword: userPassword
    });

    await setItem('lastUsers', JSON.stringify(lastUser));
}


/**
 * This function deletes the entered values of the input field.
 */
function resetLoginForm() {
    emailLogin.value = '';
    passwordLogin.value = '';
}


/**
 * This function adds an animation when the user email and/or password is wrong.
 */
function invalidInput() {
    emailLogin.classList.add('shake-animation');
    passwordLogin.classList.add('shake-animation');
    resetValues();
}


/**
 * This function resets the inputs and animations.
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
 * This function checks onload if the checkbox is checked.
 */
async function parseCheckbox() {
    let checkbox = document.getElementById('checkbox');
    let checkedBox = await localStorage.getItem('checkedBox');

    if (checkedBox === 'true') {
        checkbox.checked = true;
        parseLastUser();
    } else {
        checkbox.checked = false;
    }
}


/**
 * This function parses the last Users email and password, if ,remember me' checkbox is checked.
 */
async function parseLastUser() {
    lastUser = JSON.parse(await getItem('lastUsers'));
    let emailValue = lastUser[0]['lastEmail'];
    let passwordValue = lastUser[0]['lastPassword'];
    emailLogin.value = emailValue;
    passwordLogin.value = passwordValue;
}


/**
 * This function opens the Guest Login.
 */
function openGuestLogin() {
    window.open("./summary.html", "_self");
}