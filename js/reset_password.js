let email = '';
let joinUsers;


/**
 * This function generates the values of the variables as soon as the page loads.
 */
async function onPageLoad() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();

    email = getEmailUrlParameter();
    joinUsers = getUsers();
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
    event.preventDefault();

    if (emailResetPassword.value === emailConfirmPassword.value) {
        changePassword();
    } else {
        console.log('Password muss übereinstimmen.');
    }
    resetPasswordFrom();
}

/**
 * This function selects the user in the json array 'joinUsers'.
 */
function changePassword() {
    for (let i = 0; i < joinUsers.length; i++) {
        const user = joinUsers[i];
        const userName = user['userName'];
        const userEmail = user['emailSignUp'];

        if (email == userEmail) {
            deleteUserData(user);
            setNewUserData(userName, userEmail);
        }
    }
}

/**
 * This function deletes the user's current data.
 * @param {string} user - This is an array in the json array 'joinUsers'.
 */
async function deleteUserData(user) {
    let currentUser = joinUsers.indexOf(user);
    joinUsers.splice(currentUser, 1);
    await backend.deleteItem('joinUsers', JSON.stringify(currentUser));
}

/**
 * This function creates the user with the new password as a new user.
 * @param {string} userName - This is the name of a user that was entered during registration.
 * @param {string} userEmail - This is the email of a user that was entered during registration.
 */
async function setNewUserData(userName, userEmail) {
    joinUsers.push({
        'userName': userName,
        'userEmail': userEmail,
        'password': emailConfirmPassword.value
    })

    await backend.setItem('joinUsers', JSON.stringify(joinUsers));
}


/**
 * This function resets the password inputs.
 */
function resetPasswordFrom() {
    emailResetPassword.value = '';
    emailConfirmPassword.value = '';
}