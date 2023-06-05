let contacts = [];
let contactsLoaded = false; // Globale Variable zur Verfolgung des Ladezustands der Kontakte
var colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff", "#ff00ff"];


async function initContacts() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();
    initScript();
    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    loadContacts();
    if (!contactsLoaded) {
        renderContactList();
        contactsLoaded = true; // Setze den Ladezustand auf true, um die Endlosschleife zu verhindern
    }
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


async function openEditContacts() {
    contacts = JSON.parse(await backend.getItem('contacts')) || [];

    document.getElementById('overlayContainer').classList.remove('d-none');
    setTimeout(() => {
        let contentleft = document.getElementById('addContactLeft');
        contentleft.innerHTML += generateLeftSideEditContact();
        let contentright = document.getElementById('addContactRightContent');
        for (let i = 0; i < contacts.length; i++) {
            contentright.innerHTML = generateRightSideEditContact(i, contacts);
        }
        assignRandomBackgroundColors(); 
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
    closeNewContact();
    initContacts();
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
  
    await backend.setItem('contacts', JSON.stringify(contacts));
    closeNewContact();
    initContacts();
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


function clearInput() {
    document.getElementById('contactName').value = '';
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
}


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
    let contactsInfo = document.getElementById('contactInfo');
    contactsInfo.innerHTML = memberInfo(contact);

    contactsInfo.style.display = "flex";
    assignRandomBackgroundColors();

    var contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "block";
    }


function closeContactInfo(){
    var contactContainer = document.querySelector(".contact-container");
    contactContainer.style.display = "none";
}