/**
 * This function displays the Forgot-Password form and hides the Login form.
 */
function openForgotPassword() {
    document.getElementById('login-main').classList.add('d-none');
    document.getElementById('empty-container').classList.add('wider-container-style');
    document.getElementById('empty-container').innerHTML = returnForgotPasswordForm();
}

/**
 * This function returns the Forgot-Password form.
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
 * This function checks whether the email has been sent or not.
 */
async function onSubmit(event) {
    event.preventDefault();
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) {
        sentMailContainer();
    } else {
        alert('E-mail could not be sent!');
    }
}

/**
 * This function directs the email to the php file to send a message to it.
 */
function action(formData) {
    const input = 'https://gruppe-559.developerakademie.net/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(input, requestInit);
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
 * This function opens back the Login Container.
 */
function backToLogin() {
    document.getElementById('login-main').classList.remove('d-none');
    document.getElementById('empty-container').classList.remove('wider-container-style');
    document.getElementById('empty-container').innerHTML = '';
}