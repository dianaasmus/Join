let email = '';
let users;

function onPageLoad() {
    email = getEmailUrlParameter();
    users = getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

function onSubmit(event) {
    event.preventDefault();
}

function linkToLogin() {
    window.open("index.html", "_self");
}