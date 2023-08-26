let contacts = [];
let contactsLoaded = false; // Globale Variable zur Verfolgung des Ladezustands der Kontakte
var colors = ["#0048cd", "#81adfd", "#b6fa81", "#f99090", "#845400", "#fac66e", "#07ab1d"];
let letters = [];
let addTaskNewContact;
let addTaskPage = false;


async function initContacts() {
    await initScript();
    setURL("https://diana-asmus.developerakademie.net/Join/smallest_backend_ever-master");
    await downloadFromServer();
    await loadContacts();
    letters = [];
    sortContacts();
}


async function loadContacts() {
    try {
        contacts = JSON.parse(await backend.getItem('contacts')) || [];
    } catch (e) {
        console.error('Loading error:', e);
    }
}


/**
 * This function sorts the keys 'name' in the json object 'conatcts' in an alphabetic order.
 */
async function sortContacts() {
    contacts.sort(function (a, b) {
        let nameA = a.name.toUpperCase();
        let nameB = b.name.toUpperCase();
        if (nameA < nameB) {
            return -1;
        }
        if (nameA > nameB) {
            return 1;
        }
        return 0;
    });
    await backend.setItem('contacts', JSON.stringify(contacts));
    loadInitialLetters();
}


/**
 * This function generates for each contact its inital letter.
 */
async function loadInitialLetters() {
    document.getElementById('contactList').innerHTML = '';
    for (let l = 0; l < contacts.length; l++) {
        const contact = contacts[l];
        let initialLetter = contact['firstNameLetter'];

        setInitialLetters(initialLetter, contact, l);
    }
}


/**
 * This funtcion pushes the initial letter in the letters array or executes the function loadContactsLetter().
 * @param {string} initialLetter - carries the value of the current inital letter.
 * @param {string} contact - carries all the data of the contact.
 * @param {string} l - carries the nummber of the current contact in the json object.
 */
function setInitialLetters(initialLetter, contact, l) {
    if (!letters.includes(initialLetter)) {
        letters.push(initialLetter);
        addInitalLetterContainer(initialLetter, contact, l);
    } else {
        loadContactsLetter(initialLetter, contact, l);
    }
}


/**
 * This function creates a container with the inital letter of a new added contact.
 * @param {string} initialLetter - carries the value of the current inital letter.
 * @param {string} contact - carries all the data of the contact.
 * @param {string} l - carries the nummber of the current contact in the json object.
 */
function addInitalLetterContainer(initialLetter, contact, l) {
    document.getElementById('contactList').innerHTML += `
        <div class="initial-letter-container" id="initialLetterContacts${initialLetter}">
            <div id="initialLetterContainer">
                ${initialLetter.toUpperCase()}
            </div>
        </div>

    `;
    loadContactsLetter(initialLetter, contact, l);
}



/**
 * This function checks if the generated inital letter is already in the letters array.
 * @param {string} initialLetter - carries the value of the current inital letter.
 * @param {string} contact - carries all the data of the contact.
 * @param {string} l - carries the nummber of the current contact in the json object.
 */
function loadContactsLetter(initialLetter, contact, l) {
    let nameFirstLetter = contact['firstNameLetter'];

    if (initialLetter === nameFirstLetter) {
        renderContactList(initialLetter, contact, l);
        contactsLoaded = true; // Setze den Ladezustand auf true, um die Endlosschleife zu verhindern
    }
}


async function renderContactList(initialLetter, contact, l) {
    let contactContainer = document.getElementById(`initialLetterContacts${initialLetter}`);
    contactContainer.innerHTML += memberHTML(l);
}


function openAddContacts() {

    if (addTaskPage) {
        window.location.href = "contacts.html";
    } else {
        document.body.innerHTML += addContactPopUp();

        let overlayContainer = document.getElementById('overlayContainer');
        let addContactOverlay = document.getElementById('addContactOverlay');
        document.getElementById('addContactLeft').innerHTML += generateLeftSideNewContact();
        document.getElementById('addContactRightContent').innerHTML += generateRightSideNewContact();

        openPopupAnimation(overlayContainer, addContactOverlay);
    }
}


async function openEditContacts(l) {
    document.body.innerHTML += addContactPopUp();
    let overlayContainer = document.getElementById('overlayContainer');
    let addContactOverlay = document.getElementById('addContactOverlay');

    document.getElementById('addContactLeft').innerHTML += generateLeftSideEditContact();
    for (let i = 0; i < contacts.length; i++) {
        document.getElementById('addContactRightContent').innerHTML = generateRightSideEditContact(l);
    }

    openPopupAnimation(overlayContainer, addContactOverlay);
}


function openPopupAnimation(elementContainer, element) {
    elementContainer.classList.add('background-aniamtion');
    element.classList.add('openPopUp');
}


function removePopupAnimation(elementContainer, element) {
    elementContainer.classList.remove('background-aniamtion');
    element.classList.add('closePopUp');

    setTimeout(() => {
        element.classList.remove('openPopUp');
        element.classList.remove('closePopUp');
    }, 1000);
}


function clearContactCard() {
    let overlayContainer = document.getElementById('overlayContainer');
    let addContactOverlay = document.getElementById('addContactOverlay');
    removePopupAnimation(overlayContainer, addContactOverlay);
    checkOrigin();
    removeClearContactCardContainer();
}


function removeClearContactCardContainer() {
    setTimeout(() => {
        document.getElementById('addContactLeft').innerHTML = '';
        document.getElementById('addContactRightContent').innerHTML = '';
        document.getElementById('overlayContainer').remove();
    }, 1000);
}


function checkOrigin() {
    if (addTaskNewContact) {
        let addTaskPopoup = document.getElementById('addTaskPopUp');
        addTaskPopoup.classList.remove('closeAddedPopUp');
    }
    addTaskNewContact = false;
}


async function deleteNewContact(l) {
    contacts.splice(l, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    initContacts();
    document.getElementById('contactInfo').innerHTML = '';
    if (window.matchMedia("(max-width: 850px)").matches) {
        closeContactInfo();
    }
}


function deleteNewContactsSettings(l) {
    deleteNewContact(l);
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
    if (window.matchMedia("(max-width: 700px)").matches) {
        contactCreatedSuccessfuly();
    }
    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInput();
    if (!addTaskNewContact) {
        document.getElementById('contactList').innerHTML = '';
        initContacts();
    }
    clearContactCard();
}


function contactCreatedSuccessfuly() {
    document.getElementById('contactCreated').classList.remove('d-none');
    document.getElementById('contactCreated').classList.add('contact-created');
    setTimeout(() => {
        document.getElementById('contactCreated').classList.remove('contact-created');
        document.getElementById('contactCreated').classList.add('d-none');
    }, 3000);
}


function getContactBackgroundColor(index) {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
}


async function editContact(l) {
    const editedFullName = contactNameEdit.value;
    const editedMail = contactMailEdit.value;
    const editedPhone = contactPhoneEdit.value;
    const editedNames = editedFullName.split(' ');
    const editedFirstName = editedNames[0].charAt(0).toUpperCase();
    const editedLastName = editedNames.length > 1 ? editedNames[editedNames.length - 1].charAt(0).toUpperCase() : '';

    contacts[l].name = editedFullName;
    contacts[l].email = editedMail;
    contacts[l].phone = editedPhone;
    contacts[l].firstNameLetter = editedFirstName;
    contacts[l].lastNameLetter = editedLastName;

    await backend.setItem('contacts', JSON.stringify(contacts));
    clearContactCard();
    showContacts(l);
    initContacts();
}


function clearEditContactInput() {
    document.getElementById('contactNameEdit').value = '';
    document.getElementById('contactMailEdit').value = '';
    document.getElementById('contactPhoneEdit').value = '';
}

function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
}


function showContacts(l) {
    let contactsInfo = document.getElementById('contactInfo');

    contactsInfo.innerHTML = memberInfo(l);
    contactsInfo.style.display = "flex";
    document.querySelector(".contact-container").style.display = "flex";
    if (window.matchMedia("(max-width: 700px)").matches) {
        document.getElementById('addContactButton').classList.add('d-none');
    }
}


function closeContactInfo() {
    let contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "none";
    document.getElementById('addContactButton').classList.remove('d-none');
}