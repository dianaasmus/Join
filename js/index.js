
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
                <input class="input-field" placeholder="Name" type="text" id="userName" required>
                <input class="input-field" placeholder="Email" type="email" id="email" required>
                <input class="input-field" placeholder="Password" type="password" id="password" autocomplete="on" required>
                <button id="registerBtn">Sign up</button>
            </form>
            `;
}

function backToLogin() {
    document.getElementById('empty-container').innerHTML = '';
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('container-style');
}

function openGuestLogin() {
    document.getElementById('email-input').disabled = true; //====================================================enable
    document.getElementById('password-input').disabled = true;
    window.open("https://www.google.com", "_self");
    // window.location.href = "summary.html", "_blank";
}

function openForgotPasswordForm() {
    document.getElementById('empty-container').innerHTML = `
            <div id="login-container">
            <form onsubmit="" class="login-form">
                <h1>Log in</h1>
                <hr>
                <input class="input-field" placeholder="Email" type="email" id="email-input" required>
                <input class="input-field" placeholder="Password" type="password" id="password-input" required>
                <div class="login-settings">
                    <label class="container">
                        <input id="checkbox" type="checkbox">
                        <p>Remember me</p>
                        <span class="checkmark"></span>
                    </label>
                    <a onclick="openForgotPasswordForm()" id="forget-password">Forgot my password</a>
                </div>
                <div class="login-btns">
                    <button id="login-btn-Two">Log in</button>
                    <button onclick="openGuestLogin()" id="login-guest">Guest Log in</button>
                </div>
            </form>
        </div>
            `;
}

//Forgot Password 
function openForgotPasswordForm() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('container-style');
    document.getElementById('empty-container').innerHTML = returnForgotPasswordForm();
}

function returnForgotPasswordForm() {
    return `
    <form onsubmit=""" class="login-form forgotten-password-from">
        <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
        <h1>I forgot my password</h1>
        <hr>
        <p>Don't worry! We will send you an email with the instructions to reset your password.</p>
        
        <input class="input-field" placeholder="Email" type="email" id="email-forgot-password" required>
        
        <button id="login-btn-Two">Send me the email</button>
    </form>
    `;
}