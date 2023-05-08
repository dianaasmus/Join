function openSignUpContainer() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('container-style');
    document.getElementById('empty-container').innerHTML = returnSignupForm();
}

function returnSignupForm() {
    return `
            <form onsubmit="" class="login-form">
                <img class="arrow-left" onclick="backToLogin()" src="assets/img/arrow-left.png">
                <h1>Sign up</h1>
                <hr>
                <input class="input-field" placeholder="Name" type="text" id="name-input" required>
                <input class="input-field" placeholder="Email" type="email" id="email-input-signup" required>
                <input class="input-field" placeholder="Password" type="password" id="password-input-signup" required>
                <button id="new-signup">Sign up</button>
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
    window.open("summary.html");
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
