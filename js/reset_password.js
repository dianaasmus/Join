let email = '';
let joinUsers;


/**
 * This function generates the values of the variables as soon as the page loads.
 */
async function onPageLoad() {
    await setUrl();
    email = getEmailUrlParameter();
    getUsers();
    resetPasswordBtn.disabled = false;
}


/**
 * This function loads the specified variables that are stored in the backend.
 */
async function setUrl() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
}


/**
 * This function takes the email from the search parameter.
 */
function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}


/**
 * This function parses the json array from the backend.
 */
async function getUsers() {
    joinUsers = JSON.parse(await backend.getItem('joinUsers')) || [];
}


/**
 * This function opens the summary.html for the guest user.
 */
function linkToLogin() {
    window.open("index.html", "_self");
}


/**
 * This function checks if both entered passwords are the same.
 * @param {string} event - This refers to an event object that contains information about the triggered event.
 */
async function checkUserPassword(event) {
    // event.preventDefault();
    resetPasswordBtn.disabled = true;
    feedbackContainer.innerHTML = '';
    if (emailResetPassword.value === emailConfirmPassword.value) {
        changePassword();
    } else {
        // console.log('Password muss übereinstimmen.');
        feedbackContainer.innerHTML += `
        Your passwords do not match!
        `;
        resetPasswordBtn.disabled = false;
        resetPasswordFrom();
    }
}


/**
 * This function selects the user in the json array 'joinUsers'.
 */
function changePassword() {
    for (let i = 0; i < joinUsers.length; i++) {
        const user = joinUsers[i];
        const userName = user['userName'];
        const userEmail = user['userEmail'];

        checkEmail(user, userName, userEmail);
    }
}


/**
 * This function checks when the email matches the email input.
 * @param {string} userName - This parameter has the name of the user as value.
 * @param {string} userEmail - This parameter has the email of the user as value.
 */
function checkEmail(user, userName, userEmail) {
    if (email == userEmail) {
        deleteUserData(user);
        setNewUserData(userName, userEmail);
    }
}


/**
 * This function deletes the user's current data.
 * @param {string} user - This parameter represets one user in the json array 'joinUsers';
 */
async function deleteUserData(user) {
    let currentUser = joinUsers.indexOf(user);
    joinUsers.splice(currentUser, 1);
    await backend.deleteItem('joinUsers', JSON.stringify(currentUser));
}


/**
 * This function creates the user with the new password as a new user.
 * @param {string} userName - This parameter has the name of the user as value.
 * @param {string} userEmail - This parameter has the email of the user as value.
 */
async function setNewUserData(userName, userEmail) {
    joinUsers.push({
        'userName': userName,
        'userEmail': userEmail,
        'password': emailConfirmPassword.value
    })

    await backend.setItem('joinUsers', JSON.stringify(joinUsers));
    sendResetFeedback();
}


/**
 * This function resets the password inputs.
 */
function resetPasswordFrom() {
    emailResetPassword.value = '';
    emailConfirmPassword.value = '';
}


function sendResetFeedback() {
    document.getElementById('wider-container-style').innerHTML += `
    <div class="sent-mail-container" onclick="linkToLogin()">
        <div class="sent-mail-message">
            <img src="assets/img/checkmark-icon.png">
            You reseted your password.
        </div>
    </div>
    `;
    resetPasswordFrom();
}