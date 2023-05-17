let contacts = [];

async function initContacts(){
    setURL('https://gruppe-559.developerakademie.net/smallest_backend_ever-master');
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts'))
}

function openAddContacts() {
    clearContactCard();
    document.getElementById('overlay-container').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('add-contact-left');
        contentleft.innerHTML += generateLeftSideNewContact();
        let contentright = document.getElementById('add-contact-right-content');
        contentright.innerHTML += generateRightSideNewContact();
    }, 225);
}


function clearContactCard() {
    document.getElementById('add-contact-left').innerHTML = '';
    document.getElementById('add-contact-right-content').innerHTML = '';
}


function closeNewContact() {
    document.getElementById('overlay-container').classList.add('d-none');
    clearContactCard();
    editing = false;
}


function addContact() {
    let name = document.getElementById('contact-name');
    let email = document.getElementById('contact-mail');
    let phone = document.getElementById('contact-phone');
    let addContact = {
        "name": name.value,
        "email": email.value,
        "phone": phone.value,
    };
    contacts.push(addContact);
    addAndSaveContact();
    closeNewContact();
}


async function saveOnServer() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}

function addAndSaveContact() {
    saveOnServer();
    clearInput();
}


function clearInput() {
    document.getElementById('contact-name').value = "";
    document.getElementById('contact-email').value = "";
    document.getElementById('contact-phone').value = "";
}
