let contacts = [];
let contactsLoaded = false; // Globale Variable zur Verfolgung des Ladezustands der Kontakte

async function initContacts() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();

    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    loadContacts();
    if (!contactsLoaded) {
        renderContactList();
        contactsLoaded = true; // Setze den Ladezustand auf true, um die Endlosschleife zu verhindern
    }
//    getFirstLetter();
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await backend.getItem('contacts')) || [];
    } catch (e) {
        console.error('Loading error:', e);
    }
}


function openAddContacts() {
    clearContactCard();
    document.getElementById('overlayContainer').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('addContactLeft');
        contentleft.innerHTML += generateLeftSideNewContact();
        let contentright = document.getElementById('addContactRightContent');
        contentright.innerHTML += generateRightSideNewContact();
    }, 225);
}


function clearContactCard() {
    document.getElementById('addContactLeft').innerHTML = '';
    document.getElementById('addContactRightContent').innerHTML = '';
}


function closeNewContact() {
    document.getElementById('overlayContainer').classList.add('d-none');
    clearContactCard();
    editing = false;
}


async function addContact() {
    const fullName = contactName.value;
    const names = fullName.split(' ');
    const firstName = names[0].charAt(0).toUpperCase();
    const lastName = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
    
    contacts.push({
        "name": fullName,
        "email": contactMail.value,
        "phone": contactPhone.value,
        "firstNameLetter": firstName,
        "lastNameLetter": lastName,
    });

    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInput();
    closeNewContact();
    initContacts();
}


function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
}






async function renderContactList() {
    await initContacts();
    contacts = JSON.parse(await backend.getItem('contacts')) || [];


    let contactContainer = document.getElementById('contactList');
    for (let i = 0; i < contacts.length; i++) {
    contactContainer.innerHTML+=memberHTML(i, contacts);
}
    }

    async function showContacts(i){
        await initContacts();
        const contact = contacts[i];
        let contactsInfo = document.getElementById('contactInfo');
        contactsInfo.innerHTML=memberInfo(contact);

        contactsInfo.style.display= "flex";
    }