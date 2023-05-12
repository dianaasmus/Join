function openSignUpContainer() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('container-style');
    document.getElementById('empty-container').innerHTML = returnSignupForm();
}

function returnSignupForm() {
    return `
            <form onsubmit="register(); return false;" class="login-form">
                <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
                <h1>Sign up</h1>
                <hr>
                <input class="input-field" placeholder="Name" type="text" id="userName" autocomplete="on" required>
                <input class="input-field" placeholder="Email" type="email" id="email" autocomplete="on" required>
                <input class="input-field" placeholder="Password" type="password" id="password" autocomplete="on"
                title="The password must be at least 8 characters long, contain at least one uppercase letter and one special character." required>
                <button type="submit" id="registerBtn">Sign up</button>
            </form>
            `;
}

//pattern="(?=.*\d)(?=.*[A-Z])(?=.*[!@#$%^&*()_+])[0-9a-zA-Z!@#$%^&*()_+]{8,}"

function backToLogin() {
    document.getElementById('empty-container').innerHTML = '';
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('container-style');
}

function openGuestLogin() {
    window.open("./summary.html", "_self");
}


//Forgot Password 
function openForgotPasswordForm() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('wider-container-style');
    document.getElementById('empty-container').innerHTML = returnForgotPasswordForm();
}

function returnForgotPasswordForm() {
    return `
    <form onsubmit="onSubmit(event)" class="login-form forgotten-password-from">
        <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
        <h1>I forgot my password</h1>
        <hr>
        <p>Don't worry! We will send you an email with the instructions to reset your password.</p>
        
        <input class="input-field" placeholder="Email" type="email" id="email-forgot-password" required>
        
        <button type="submit" id="forgot-password-btn">Send me the email</button>
    </form>
    `;
}

function sentMailContainer() {
    document.getElementById('empty-container').innerHTML += `
    <div class="sent-mail-container">
        <div class="sent-mail-message">
            <img src="./assets/img/SendCheck.png">
            An E-Mail has been sent to you
        </div>
    </div>
    `;
}

//Check User -> Log in -> summary.html
function checkUser() {
    
    if (userIsRegistered()) {
        window.open("./summary.html", "_self");
        resetLoginForm();
    } else {
        // if (emailLogin.includes('shake-animation')) {
        //     // removeAnimation();
        //     console.log('hi');
        // }
        invalidInput();
    }
}

function invalidInput() {

    // setTimeout(function () {
        emailLogin.classList.add('shake-animation');
        passwordLogin.classList.add('shake-animation');
    // }, 700)

    emailLogin.value = '';
    passwordLogin.value = '';
}

function removeAnimation() {
    emailLogin.classList.remove('shake-animation');
    passwordLogin.classList.remove('shake-animation');
}

function userIsRegistered() {
    const signedUserEmail = users[0]['email'];
    const signedUserPassword = users[0]['password'];
    let user = document.getElementById('emailLogin');
    let userPassword = document.getElementById('passwordLogin')
    return (signedUserEmail.includes(user.value) && signedUserPassword.includes(userPassword.value));
}

function resetLoginForm() {
    emailLogin.value = '';
    passwordLogin.value = '';
}

function rememberMe() { // ================================================== check for 
    document.getElementById('emailLogin').autocomplete = "on";
    document.getElementById('passwordLogin').autocomplete = "on";
}

