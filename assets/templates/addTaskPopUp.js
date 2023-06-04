document.addEventListener('DOMContentLoaded', function () {
    
 
    const contactList = document.getElementById('eventLisPopUp');
    const dropdownAddContact = document.getElementById('dropdownAddContactPopUp')

    contactList.addEventListener('mouseenter', function (event) {
        dropdownAddContact.innerHTML = ''
        dropdownAddContact.innerHTML = '<a href="#" onclick="openInputAddContact()">New contact</a>'
        contacts.forEach((contact, index) => {
            dropdownAddContact.innerHTML += `<div class="droppedContacts"><a>${contact.name}</a><input onclick="addToAssignedContacts('${index}')" type="checkbox"></div>`;
        });
    });})