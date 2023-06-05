function generateLeftSideNewContact() {
    return `
                    <div class="add-contact-logo" id="contact-logo">
                        <img src="../assets/img/logo-white.png">
                    </div>
                    <span class="contact-left-headline" id="contact-left-add">Add Contact</span>
                    <span class="contact-left-better" id="contact-left-tasks">Tasks are better with a team!</span>
                    <div class="new-contact-left-line" id="blue-line">
                    </div>
    `;
}

function generateRightSideNewContact() {
    return ` <form class="new-contact-circle-name" onsubmit="addContact(); return false;" id="new-contact-circle-name">
                        <div class="edit-contact-circle">
                            <div class="contact-circle-big contact-circle-card bg0" id="circle-new-contact">
                                <img src=".//assets/img/name_input.svg">
                            </div>  
                        </div>
                        <div class="contact-new-inputs" id="contact-new-inputs">
                            <span class="close-contact-cross" onclick="closeNewContact()">&#10005;</span>
                                <div class="warning-message" id="warning-contact-new-edit">
                                </div>
                                <div class="input-form-new-contact">
                                    <input required type="text" id="contactName" placeholder ="first and last name">
                                    <img src="../assets/img/name_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                    <input required type="email" id="contactMail" placeholder ="e-mail">
                                    <img src="../assets/img/email_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                <input required type="tel" pattern="[0-9]+" id="contactPhone" placeholder ="phone">
                                <img src="../assets/img/icon-phone.svg">
                                </div>
                            <div class="create-cancel-box" id="create-edit-content">
                                <button type="button" class="contact-new-cancel" id="contact-new-cancel" onclick="closeNewContact()">
                                    <span>Cancel</span>
                                    <span>X</span>
                                </button>
                                <button type="submit" class="contact-new-create">
                                    <span>Create Contact</span>
                                    <img src="../assets/img/icon-check.svg">
                                </button>
                            </div>
                        </div>
                    </form>
    `;
}


function generateLeftSideEditContact() {
    return `
                    <div class="add-contact-logo" id="contact-logo">
                        <img src="../assets/img/logo-white.png">
                    </div>
                    <span class="contact-left-headline" id="contact-left-add">Edit Contact</span>
                    <div class="edit-contact-left-line" id="blue-line">
                    </div>
    `;
}


function generateRightSideEditContact(i, contacts) {
    return ` <form class="new-contact-circle-name" onsubmit="editContact(); return false;" id="new-contact-circle-name">
                        <div class="edit-contact-circle-for-edit contact-bubble-BG">
                            <div class="contact-circle-big contact-circle-card" id="circle-new-contact">
                            ${contacts[i]['firstNameLetter']}${contacts[i]['lastNameLetter']}
                            </div>  
                        </div>
                        <div class="contact-new-inputs" id="contact-new-inputs">
                            <span class="close-contact-cross" onclick="closeNewContact()">&#10005;</span>
                                <div class="warning-message" id="warning-contact-new-edit">
                                </div>
                                <div class="input-form-new-contact">
                                    <input required type="text" value="${contacts[i]['name']}" id="contactNameEdit" placeholder ="${contacts[i]['name']}">
                                    <img src="../assets/img/name_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                    <input required type="email" value="${contacts[i]['email']}" id="contactMailEdit" placeholder ="${contacts[i]['email']}">
                                    <img src="../assets/img/email_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                <input required value="${contacts[i]['phone']}" type="tel" pattern="[0-9]+" id="contactPhoneEdit" placeholder ="${contacts[i]['phone']}">
                                <img src="../assets/img/icon-phone.svg">
                                </div>
                            <div class="create-cancel-box edit-submit-box" id="create-edit-content">
                                <button type="button" class="contact-new-cancel" id="contact-new-cancel" onclick="closeNewContact()">
                                    <span>Delete</span>
                                </button>
                                <button type="submit" class="contact-new-create">
                                    <span>Save</span>
                                </button>
                            </div>
                        </div>
                    </form>
    `;
}


function memberHTML(i, contacts) {
    return ` 
                <div class="single-contact-container" onclick="showContacts(${i})">
                    <div class="single-contact-bubble contact-bubble-BG">${contacts[i]['firstNameLetter']}${contacts[i]['lastNameLetter']}</div>
                        <div class="single-contact">
                            <div class="single-contact-name">${contacts[i]['name']}</div>
                            <div class="single-contact-mail">${contacts[i]['email']}</div>
                    </div>
                </div>
                `;
}

function memberInfo(contact){
    return `
<div class="contact-info-header">
    <div class="contact-info-bubble contact-bubble-BG">
        ${contact.firstNameLetter}${contact.lastNameLetter}
    </div>
    <div class="contact-info-headname">
        <h2>${contact.name}</h2>
        <span>
            <img src="../assets/img/contact-add-task.png">
            Add Task
        </span>
    </div>
</div>
<div class="contact-info-edit">
    <span class="contact-edit-text">Contact Information</span>
    <span class="contact-edit-popup" onclick="openEditContacts()">
        <img src="../assets/img/contact-edit.png">
        Edit Contact
    </span>
</div>
<div class="open-contact-infos">
        <span class="contact-information">Email</span>
        <a class="contact-mail" href="mailto:${contact.email}">${contact.email}</a>
        <span class="contact-information">Phone</span>
        <a class="contact-phone" href="tel:${contact.phone}">${contact.phone}</a>
    </div>
    `;
}