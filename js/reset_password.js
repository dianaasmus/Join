let email = '';

async function onSubmit(event) {
    event.preventDefault(); // <form onsubmit="onSubmit(event); return false;">
    let formData = new FormData(event.target);
    let response = await action(formData);
    if (response.ok) {
        sentMailContainer();
    } else {
        alert('E-mail could not be sent!')
    }
}

function action(formData) {
    const input = 'server php datei';
    const requestInit = {
        method : 'post',
        body: formData
    };
}

function onPageLoad() {
    email = getEmailUrlParameter();
    users = getUsers();
}

function getEmailUrlParameter() {
    const queryString = window.location.search();
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function getUsers() {
    return JSON.parse(localStorage.getItem('users')) || [];
}

