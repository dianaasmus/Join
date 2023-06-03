async function includeHTML() {
    let file;
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html"); // "includes/header.html"
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
    focusSidebar();
};


function focusSidebar() {
    const pathName = window.location.pathname;
    console.log(pathName);

    switch (pathName) {
        case '/summary.html':
            document.getElementById('summary-props').classList.add('clicked');
            break;
        case '/board.html':
            document.getElementById('board-props').classList.add('clicked');
            break;
        case '/addTask.html':
            document.getElementById('addTask-props').classList.add('clicked');
            break;
        case '/contacts.html':
            document.getElementById('contacts-props').classList.add('clicked');
            break;
        case '/legal-notice.html':
            document.getElementById('legal-props').classList.add('clicked');
            break;
    }
}


function openImgDropDoen() {
    let dropdown = document.querySelector('.img-drop-down');

    if (dropdown) {
        dropdown.remove(); // Remove dropdown if it's already visible
    } else {
        setDropdownContent();
    }
}


function setDropdownContent() {
    if (window.matchMedia('(max-width: 1100px)').matches) {
        pasteDropDownMobile();
    } else {
        pasteDropDownWeb();
    }
}


function pasteDropDownMobile() {
    document.getElementById('profile-picture').innerHTML += `
                <div class="img-drop-down">
                    <a onclick="">Help</a>
                    <a onclick="">Legal Notice</a>
                    <a href="index.html">Log out</a>
                </div>
            `;
}


function pasteDropDownWeb() {
    document.getElementById('profile-picture').innerHTML += `
                <div class="img-drop-down">
                    <a href="index.html">Log out</a>
                </div>
            `;
}


function removeDiv() {
    dropdown = document.querySelector('.img-drop-down');
    setTimeout(function () {
        if (dropdown) {
            dropdown.remove();
        }
    }, 2000);
}