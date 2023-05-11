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