// ======================================================================= Beispiel User:

// let users;

// async function onPageLoad() {
//     users = await fetchRandomUsers();
//     saveUsers();
//     displayUsers();
// }

// async function fetchRandomUsers() {
//     let response = await fetch('https://randomuser.me/api/?results=10');
//     return (await response.json()).results;
// }

// function saveUsers() {
//     localStorage.setItem('users', JSON.stringify(users));
// }

// function displayUsers() {
//     users.forEach((user) => {
//         document.body.insertAdjacentElement('beforeend', `
//         <div>
//             <span>${user.name.first} ${user.name.last}</span><br>
//             <span>${user.email}</span>
//         </div>
//         `)
//     });
// }

// function saveUsers() {
//     localStorage.setItem('users', JSON.stringify(users));
// }

async function onSubmit(event) {
    event.preventDefault(); // <form onsubmit="onSubmit(event); return false;">
    let formData = new FormData(event.target);
    // formData.append('name-der-variable', 'wert-der-variable');
    // const recipient = emailForgotPassword.value;
    // formData.append('recipient', recipient);
    // formData.append('name', 'Diana');
    // formData.append('message', 'Dein Passwort wurde zurückgesetzt.');
    let response = await action(formData);
    if (response.ok) {
        sentMailContainer();
    } else {
        alert('E-mail could not be sent!');
    }
}

function action(formData) {
    const input = 'https://gruppe-559.developerakademie.net/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(input, requestInit);
}

