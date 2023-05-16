/**
 * This function checks whether the login can take place or not.
 */
function checkUser() {
    if (userIsRegistered()) {
        window.open("./summary.html", "_self");
        resetLoginForm();
    } else {
        invalidInput();
    }
}

/**
 * This function checks whether the user email and password are registered and whether they match.
 */
function userIsRegistered() {
    const signedUserEmail = users[0]['email'];
    const signedUserPassword = users[0]['password'];
    let user = document.getElementById('emailLogin');
    let userPassword = document.getElementById('passwordLogin')
    return (signedUserEmail.includes(user.value) && signedUserPassword.includes(userPassword.value));
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
 * this function executes the function checkUser() as soon as the enter button is pressed.
 */
function enter(event, i) {
    if (event.keyCode === 13) {
        checkUser();
    }
}

/**
 * This function enables the checkbox button.
 */
function disableInput() {
    document.getElementById('checkbox').disabled = false;
    document.getElementById('checkmark').style.cursor = "pointer";
}

/**
 * 
 */
function rememberMe() {
    const checkbox = document.getElementById('checkbox');
    checkbox.addEventListener('change', function () {
        autocomplete();
    });
}

/**
 * With this function, the user's email and password are stored on the user's browser.
 */
function autocomplete() {
    if (this.checked && userIsRegistered()) {
        document.getElementById('emailLogin').autocomplete = "on";
        document.getElementById('passwordLogin').autocomplete = "current-password";
        console.log('hi');
    } else {
        document.getElementById('emailLogin').autocomplete = "off";
        document.getElementById('passwordLogin').autocomplete = "off";
        console.log('bye');
    }
}

/**
 * This function opens the Guest Login 
 */
function openGuestLogin() {
    window.open("./summary.html", "_self");
}


















