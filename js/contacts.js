let contacts = [];
let contactsLoaded = false; // Globale Variable zur Verfolgung des Ladezustands der Kontakte
var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];
let letters = [];


async function initContacts() {
    await initScript();
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    await loadContacts();
    // if (!contactsLoaded) {
    //     renderContactList();
    //     contactsLoaded = true; // Setze den Ladezustand auf true, um die Endlosschleife zu verhindern
    // }
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


// Alphabet Letters
async function sortContacts() {
    contacts.sort(function (a, b) {
        let nameA = a.name.toUpperCase(); // Großbuchstaben verwenden, um die Sortierung zu vereinheitlichen
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


async function loadInitialLetters() {
    document.getElementById('contactList').innerHTML = '';
    for (let l = 0; l < contacts.length; l++) {
        const contact = contacts[l];
        let initialLetter = contact['name'].charAt(0);

        setInitialLetters(initialLetter, contact, l);
    }
}

function setInitialLetters(initialLetter, contact, l) {
    
    if (!letters.includes(initialLetter)) {
        letters.push(initialLetter);
        addInitalLetterContainer(initialLetter, contact, l);
    } else {
        loadContactsLetter(initialLetter, contact, l);
    }
}


function addInitalLetterContainer(initialLetter, contact, l) {
    document.getElementById('contactList').innerHTML += `
        <div id="initialLetterContacts${initialLetter}">
            <div id="initialLetterContainer">
                ${initialLetter.toUpperCase()}
            </div>
        </div>

    `;
    loadContactsLetter(initialLetter, contact, l);
}


function loadContactsLetter(initialLetter, contact, l) {
    let nameFirstLetter = contact['name'].charAt(0);

    if (initialLetter === nameFirstLetter) {
        renderContactList(initialLetter, contact, l);
        contactsLoaded = true; // Setze den Ladezustand auf true, um die Endlosschleife zu verhindern
    }
}


async function renderContactList(initialLetter, contact, l) {
    let contactContainer = document.getElementById(`initialLetterContacts${initialLetter}`);
    contactContainer.innerHTML += memberHTML(l);

    assignRandomBackgroundColors();
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


async function openEditContacts(l) {
    document.getElementById('overlayContainer').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('addContactLeft');
        contentleft.innerHTML += generateLeftSideEditContact();
        let contentright = document.getElementById('addContactRightContent');
        for (let i = 0; i < contacts.length; i++) {
            contentright.innerHTML = generateRightSideEditContact(l);
        }
    }, 225);
}


function clearContactCard() {
    document.getElementById('addContactLeft').innerHTML = '';
    document.getElementById('addContactRightContent').innerHTML = '';
    document.getElementById('overlayContainer').classList.add('d-none');
}


async function deleteNewContact(l) {
    contacts.splice(l, 1);
    document.getElementById('overlayContainer').classList.add('d-none');
    clearContactCard();
    editing = false;
    await backend.setItem('contacts', JSON.stringify(contacts));
    document.getElementById('contactInfo').innerHTML = '';
    initContacts();
}


function assignRandomBackgroundColors() {
    var elements = document.querySelectorAll(".contact-bubble-BG");
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var color = getRandomColor();
        element.style.backgroundColor = color;
    }
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
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
    document.getElementById('contactList').innerHTML = '';
    clearContactCard();
    initContacts();
<<<<<<< HEAD
    renderContactList();
} 


async function editContact(i) {
    const fullName = document.getElementById('contactNameEdit').value;
    const email = document.getElementById('contactMailEdit').value;
    const phone = document.getElementById('contactPhoneEdit').value;
  
    const names = fullName.split(' ');
    const firstName = names[0].charAt(0).toUpperCase();
    const lastName = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';
  
    contacts[i] = {
      "name": fullName,
      "email": email,
      "phone": phone,
      "firstNameLetter": firstName,
      "lastNameLetter": lastName
    };
  
=======

}


async function editContact(l) {
    const editedFullName = contactNameEdit.value;
    const editedNames = editedFullName.split(' ');
    const editedFirstName = editedNames[0].charAt(0).toUpperCase();
    const editedLastName = editedNames.length > 1 ? editedNames[editedNames.length - 1].charAt(0).toUpperCase() : '';

    contacts[l].name = editedFullName;
    contacts[l].firstNameLetter = editedFirstName;
    contacts[l].lastNameLetter = editedLastName;

>>>>>>> 6fbf18cba9a4be56345f956e17a035ac6a1cccb5
    await backend.setItem('contacts', JSON.stringify(contacts));
    clearEditContacCard();

    initContacts();
<<<<<<< HEAD
    renderContactList();
    showContacts(i);
  }


  async function deleteContacts(i) {
    contacts.splice(i, 1);
  
    await backend.setItem('contacts', JSON.stringify(contacts));
    initContacts();
    closeNewContact();
    closeContactInfo();
    renderContactList();
  }
=======
}

function clearEditContactInput() {
    document.getElementById('contactNameEdit').value = '';
    document.getElementById('contactMailEdit').value = '';
    document.getElementById('contactPhoneEdit').value = '';
}

function clearEditContacCard() {
    document.getElementById('overlayContainer').classList.add('d-none');
    document.getElementById('contactInfo').innerHTML = '';
}
>>>>>>> 6fbf18cba9a4be56345f956e17a035ac6a1cccb5


function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
}


<<<<<<< HEAD
async function renderContactList() {
    await initContacts();
    contacts = JSON.parse(await backend.getItem('contacts')) || [];


    let contactContainer = document.getElementById('contactList');
    contactContainer.innerHTML = '';
    for (let i = 0; i < contacts.length; i++) {
    contactContainer.innerHTML += memberHTML(i, contacts);
    }

    assignRandomBackgroundColors();
}


async function showContacts(i) {
    await initContacts();
    const contact = contacts[i];
=======
async function showContacts(l) {
>>>>>>> 6fbf18cba9a4be56345f956e17a035ac6a1cccb5
    let contactsInfo = document.getElementById('contactInfo');
    contactsInfo.innerHTML = memberInfo(l);

    contactsInfo.style.display = "flex";

    var contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "block";

<<<<<<< HEAD

function closeContactInfo(){
=======
}

function closeContactInfo() {
>>>>>>> 6fbf18cba9a4be56345f956e17a035ac6a1cccb5
    var contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "none";
}


