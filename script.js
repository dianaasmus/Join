function init() {
    includeHTML();
}


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
};


function openImgDropDoen() {
    let dropdown = document.querySelector('.img-drop-down');

    if (dropdown) {
        dropdown.remove(); // Remove dropdown if it's already visible
    } else {
        pasteDropDown();
    }
}

function pasteDropDown() {
    document.getElementById('profile-picture').innerHTML += `
                <div class="img-drop-down">
                    Log out
                </div>
            `;

    removeDiv();
}

function removeDiv() {
    dropdown = document.querySelector('.img-drop-down');
    setTimeout(function () {
        if (dropdown) {
            dropdown.remove();
        }
    }, 2000);
}