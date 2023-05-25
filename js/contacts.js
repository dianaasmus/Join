let contacts = [];

<<<<<<< HEAD

=======
>>>>>>> 533be13ea1fec8191260b574ef47ddd230e17240
async function initContacts() {
    setURL("https://gruppe-559.developerakademie.net/smallest_backend_ever-master");
    await downloadFromServer();

    contacts = JSON.parse(await backend.getItem('contacts')) || [];
    loadContacts();
    getFirstLetter();
<<<<<<< HEAD
=======
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

async function addContact() {
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
    document.getElementById('contactMail').value = '';
    document.getElementById('contactPhone').value = '';
>>>>>>> 533be13ea1fec8191260b574ef47ddd230e17240
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
    let contactContainer = document.getElementById('contactList');
    for (let i = 0; i < contacts.length; i++) {
    contactContainer.innerHTML+=memberHTML(i);
}
    }


function memberHTML(i) {
    return ` 
                <div>
                    <div>${contacts[i]['name']}</div>
                    <div>${contacts[i]['email']}</div>
                </div>
                `;
}


/*

async function showContactList(){
    JSON.parse(await backend.getItem('contacts')) || [];
    let firstArea=document.getElementById('contactList');
    firstArea.innerHTML="";
    for (let i = 0; i < contacts.length; i++) {
        const contacts = contacts[i];        
    }
    firstArea.innerHTML+=`
    <div><span>${contacts[i]['name']}</span></div>
    <div>${contacts[i]['email']}</div>
    <div>${contacts[i]['phone']}</div>
    </div>`
}



function showContactList(){
    sortContacts();
    let firstArea = document.getElementById('contactList');
    firstArea.innerHTML="";
    for (let i = 0; i < contacts.length; i++) {
        const contact = contacts[i];
        let lastNameLetter=contact.lastNameLetter[0].toUpperCase();
        if (lastNameLetter !== currentLetter){
            firstArea.innerHTML+=`<span class="area-letter">${lastNameLetter}</span>`;
            currentLetter=lastNameLetter;
        }
        firstArea.innerHTML+= generateContactList();
    }
}


async function addContact(){
    contacts.push({
        "name": contactName.value,
        "email": contactMail.value,
        "phone": contactPhone.value,
    });


    await backend.setItem('contacts', JSON.stringify(contacts));
    clearInput();
    closeNewContact();
}


async function pushFirstLetterJSON() {
    alphabet = [];
    for (let i = 0; i < contacts.length; i++) {
        const member = contacts[i];
        const memberFistLetter = member['name'].charAt(0);
        const firstLetter = memberFistLetter.toUpperCase();
        if (!alphabet.includes(firstLetter))
            alphabet.push(firstLetter);
    }
    await backend.setItem('contacts', JSON.stringify(contacts));
    alphabet.sort();
}


function generateContactList(contact){
    return `<div>
    <div>
      <div style="color: white">${contact.lastNameLetter}</div>
    </div>
    <div>
     <div>${contact.name}</div>
     <a>${contact.email}</a>
    </div>
  </div>`
}
*/