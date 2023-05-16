let users = [];

/**
 * This function is executed as soon as the html page loads and initialises a new function.
 */
async function init() {
    loadUsers();
}

/**
 * This function loads all the registered users or displays an error.
 */
async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

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
 * This function pushes the new registered users and saves them.
 */
async function register() {
    registerBtn.disabled = true;
    users.push({
        userName: userName.value,
        emailSignUp: emailSignUp.value,
        password: password.value
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

/**
 * This function resets all the inputs and enables the register button.
 */
function resetForm() {
    userName.value = '';
    emailSignUp.value = '';
    password.value = '';
    registerBtn.disabled = false;
}

/**
 * This function displays the Login form and hides the Sign up form.
 */
function backToLogin() {
    document.getElementById('empty-container').innerHTML = '';
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('container-style');
}