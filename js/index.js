/**
 * This function displays the Sign Up form and hides the Login form.
 */
function openSignUpContainer() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('container-style');
    document.getElementById('empty-container').innerHTML = returnSignupForm();
}

/**
 * This function returns the Sign up Form.
 */
function returnSignupForm() {
    return `
            <form onsubmit="register(); return false;" class="login-form">
                <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
                <h1>Sign up</h1>
                <hr>
                <input class="input-field" placeholder="Name" type="text" id="userName" autocomplete="on" required>
                <input class="input-field" placeholder="Email" type="email" id="emailSignUp" name="emailSignUp" autocomplete="on" required>
                <input class="input-field" placeholder="Password" type="password" id="password" autocomplete="on" pattern="(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}"
                title="The password must be at least 8 characters long, contain at least one uppercase letter and one special character." required>
                <button type="submit" id="registerBtn">Sign up</button>
            </form>
            `;
}

/**
 * This function displays the Login form and hides the Sign up form.
 */
function backToLogin() {
    document.getElementById('empty-container').innerHTML = '';
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('container-style');
}

/**
 * This function opens the Guest Login 
 */
function openGuestLogin() {
    window.open("./summary.html", "_self");
}

/**
 * This function displays the Forgot-Password form and hides the Login form.
 */
function openForgotPassword() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('wider-container-style');
    document.getElementById('empty-container').innerHTML = returnForgotPasswordForm();
}

/**
 * This function dreturns the Forgot-Password form.
 */
function returnForgotPasswordForm() {
    return `
    <form onsubmit="onSubmit(event)" class="login-form forgotten-password-from">
        <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
        <h1>I forgot my password</h1>
        <hr>
        <p>Don't worry! We will send you an email with the instructions to reset your password.</p>
        
        <input class="input-field" name="email" placeholder="Email" type="email" id="email" required>
        
        <button type="submit" id="forgot-password-btn">Send me the email</button>
    </form>
    `;
}

/**
 * This function displays the Forgot-Password form and hides the Login form.
 */
function openLogIn() {
    window.open("index.html", "_self");
}

/**
 * This function opens a container that confirms the sending of the email.
 */
function sentMailContainer() {
    document.getElementById('empty-container').innerHTML += `
    <div class="sent-mail-container" onclick="linkToLogin()">
        <div class="sent-mail-message">
            <img src="./assets/img/SendCheck.png">
            An E-Mail has been sent to you
        </div>
    </div>
    `;
}

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

    emailLogin.value = '';
    passwordLogin.value = '';
    checkmark.style.display = "none";//checkmark delete 

    setTimeout(function () {
        emailLogin.classList.remove('shake-animation');
        passwordLogin.classList.remove('shake-animation');
    }, 1000)
}

function disableInput() {
    document.getElementById('checkbox').disabled = false;
    document.getElementById('checkmark').style.cursor = "pointer";
}

/**
 * This function 
 */
function rememberMe() { // ================================================== check for 
    const checkbox = document.getElementById('checkbox');
    checkbox.addEventListener('change', function () {
        autocomplete();
    });
}


function autocomplete() {
    if (this.checked && userIsRegistered()) {
        document.getElementById('emailLogin').autocomplete = "on";
        document.getElementById('passwordLogin').autocomplete = "on";
    } else {
        document.getElementById('emailLogin').autocomplete = "off";
        document.getElementById('passwordLogin').autocomplete = "off";
        console.log('bye');
    }
}


/**
 * This function checks whether the login can take place or not.
 */
function backToLogin() {
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('wider-container-style');
    document.getElementById('empty-container').innerHTML = '';
}