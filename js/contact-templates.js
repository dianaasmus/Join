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

function generateRightSideNewContact() { //form: onsubmit="saveNewContact(); return false;"
    return ` <form class="new-contact-circle-name" onsubmit="saveNewContact(); return false;" id="new-contact-circle-name">
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
                                    <input required type="text" id="contact-name" placeholder ="first and last name">
                                    <img src="../assets/img/name_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                    <input required type="email" id="contact-mail" placeholder ="e-mail">
                                    <img src="../assets/img/email_input.svg">
                                </div>
                                <div class="input-form-new-contact">
                                <input required type="tel" pattern="[0-9]+" id="contact-phone" placeholder ="phone">
                                <img src="../assets/img/icon-phone.svg">
                                </div>
                            <div class="create-cancel-box" id="create-edit-content" onclick="closeNewContact()">
                                <button type="button" class="contact-new-cancel" id="contact-new-cancel">
                                    <span>Cancel</span>
                                    <span>&#10005;</span>
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