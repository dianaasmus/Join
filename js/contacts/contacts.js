let contacts = [];
let contactsLoaded = false;
let letters = [];
let addTaskPage = false;


/**
 * Initializes the contacts by loading them from the backend and sorting them.
 * @returns {Promise<void>}
 */
async function initContacts() {
    await initScript();
    setURL("https://diana-asmus.developerakademie.net/Join/smallest_backend_ever-master");
    await downloadFromServer();
    await loadContacts();
    letters = [];
    sortContacts();
}


/**
 * Loads contacts from the backend and handles any loading errors.
 */
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
        contactsLoaded = true;
    }
}


/**
 * Renders a contact in the contact list container for the specified initial letter.
 * @param {string} initialLetter - The initial letter of the contact's name.
 * @param {object} contact - The contact to be rendered.
 * @param {number} l - Index or counter for the contact.
 */
async function renderContactList(initialLetter, contact, l) {
    let contactContainer = document.getElementById(`initialLetterContacts${initialLetter}`);
    contactContainer.innerHTML += memberHTML(l);
}


/**
 * Opens the add contacts popup, either redirecting to the contacts page or showing the popup.
 */
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


/**
 * Opens the edit contacts popup and populates it with the contact information.
 * @param {number} l - Index or counter for the contact.
 */
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


/**
 * Animates the opening of a popup by adding appropriate CSS classes.
 * @param {HTMLElement} elementContainer - The container element.
 * @param {HTMLElement} element - The element to be animated.
 */
function openPopupAnimation(elementContainer, element) {
    elementContainer.classList.add('background-aniamtion');
    element.classList.add('openPopUp');
}


/**
 * Removes animation classes from an element after a certain time interval.
 * @param {HTMLElement} elementContainer - The container element.
 * @param {HTMLElement} element - The element to be animated.
 */
function removePopupAnimation(elementContainer, element) {
    elementContainer.classList.remove('background-aniamtion');
    element.classList.add('closePopUp');

    setTimeout(() => {
        element.classList.remove('openPopUp');
        element.classList.remove('closePopUp');
    }, 1000);
}


/**
 * Clears the contact card and removes the popup container after a certain time interval.
 */
function clearContactCard() {
    let overlayContainer = document.getElementById('overlayContainer');
    let addContactOverlay = document.getElementById('addContactOverlay');
    removePopupAnimation(overlayContainer, addContactOverlay);
    // checkOrigin();
    removeClearContactCardContainer();
}


/**
 * Removes the container for clearing the contact card after a certain time interval.
 */
function removeClearContactCardContainer() {
    setTimeout(() => {
        document.getElementById('addContactLeft').innerHTML = '';
        document.getElementById('addContactRightContent').innerHTML = '';
        document.getElementById('overlayContainer').remove();
    }, 1000);
}


// /**
//  * Checks the origin of the action and adjusts the class of the add task popup.
//  */
// function checkOrigin() {
//     if (addTaskNewContact) {
//         let addTaskPopoup = document.getElementById('addTaskPopUp');
//         addTaskPopoup.classList.remove('closeAddedPopUp');
//     }
//     addTaskNewContact = false;
// }


/**
 * Deletes a new contact from the contacts list.
 * @param {number} l - The index of the contact to be deleted.
 */
async function deleteNewContact(l) {
    contacts.splice(l, 1);
    await backend.setItem('contacts', JSON.stringify(contacts));
    initContacts();
    document.getElementById('contactInfo').innerHTML = '';
    if (window.matchMedia("(max-width: 850px)").matches) {
        closeContactInfo();
    }
}


/**
 * Deletes a new contact and clears the contact card.
 * @param {number} l - The index of the contact to be deleted.
 */
function deleteNewContactsSettings(l) {
    deleteNewContact(l);
    clearContactCard();
    editing = false;
}


/**
 * Adds a new contact to the contacts list.
 */
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
        "color" : getRandomColor()
    });
    if (window.matchMedia("(max-width: 700px)").matches) {
        contactCreatedSuccessfuly();
    }
    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInput();
    clearContactCard();
}


/**
 * Displays a success message when a new contact is created.
 */
function contactCreatedSuccessfuly() {
    document.getElementById('contactCreated').classList.remove('d-none');
    document.getElementById('contactCreated').classList.add('contact-created');
    setTimeout(() => {
        document.getElementById('contactCreated').classList.remove('contact-created');
        document.getElementById('contactCreated').classList.add('d-none');
    }, 3000);
}


/**
 * Retrieves the background color for a contact based on its index.
 * @param {number} index - The index of the contact.
 * @returns {string} The background color for the contact.
 */
function getContactBackgroundColor(index) {
    const colorIndex = index % colors.length;
    return colors[colorIndex];
}


/**
 * Edits an existing contact in the contacts list.
 * @param {number} l - The index of the contact to be edited.
 */
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


/**
 * Clears the input fields in the edit contact form.
 */
function clearEditContactInput() {
    document.getElementById('contactNameEdit').value = '';
    document.getElementById('contactMailEdit').value = '';
    document.getElementById('contactPhoneEdit').value = '';
}


/**
 * Clears the input fields in the add contact form.
 */
function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
}


/**
 * Displays detailed information about a contact.
 * @param {number} l - The index of the contact to display information for.
 */
function showContacts(l) {
    let contactsInfo = document.getElementById('contactInfo');

    contactsInfo.innerHTML = memberInfo(l);
    contactsInfo.style.display = "flex";
    document.querySelector(".contact-container").style.display = "flex";
    if (window.matchMedia("(max-width: 700px)").matches) {
        document.getElementById('addContactButton').classList.add('d-none');
    }
}


/**
 * Closes the displayed contact information.
 */
function closeContactInfo() {
    let contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "none";
    document.getElementById('addContactButton').classList.remove('d-none');
}


function getRandomColor() {
    const letters = '0123456789ABCDEF'; // Zeichen für Farbwerte
    let color = '#';

    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]; // Wähle zufälliges Zeichen
    }

    return color;
}