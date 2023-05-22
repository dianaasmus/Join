let contacts = [];

async function initContacts(){
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();

    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    loadContacts();
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

/*
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


function addAndSaveContact() {
    saveOnServer();
    clearInput();
}


async function saveOnServer() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}
*/
//TEST

async function addContact(){
    contacts.push({
        "name": contactName.value,
        "email": contactMail.value,
        "phone": contactPhone.value,
    });

    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInput();
}

function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactEmail').value = '';
    document.getElementById('contactPhone').value = '';
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await backend.getItem('contacts')) || [];
    }  catch (e) {
        console.error('Loading error:', e);
    }
}
