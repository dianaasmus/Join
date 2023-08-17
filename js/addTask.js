let percentOfDone
let colorOfBar
let checkboxState;
let checkedInput


async function initAddTask() {
    await initScript();
    adjustAddTask();
    try {
        setURL("https://diana-asmus.developerakademie.net/Join/smallest_backend_ever-master");
        await downloadFromServer();
        tasks = await JSON.parse(await backend.getItem('tasks')) || [];
        contacts = JSON.parse(backend.getItem('contacts')) || [];
    } catch (er) {
        console.error(er);
    }
}


function adjustAddTask() {
    document.getElementById('addTaskPopUp').classList.add('add-task-html-style');
}



// function addPriority(i) {
//     let selectedPriority = document.getElementById("prio" + i);
//     let selectedUrgency = selectedPriority.getAttribute("value")
//     if (prios.length == 0) {
//     } else {
//         prios = []
//     }
//     colorPrios(i, 'addedTask');
//     prios.push(selectedUrgency);

// }


// function colorPrios(selectedUrgency, i) {
//     if (selectedUrgency == 'urgent') {
//         document.getElementById("prio" + i).src = "./assets/img/urgentOnclick.png";
//         document.getElementById("prio" + 2).src = "./assets/img/mediumImg.png";
//         document.getElementById("prio" + 3).src = "./assets/img/lowImg.png";
//     }
//     if (selectedUrgency == 'medium') {
//         document.getElementById("prio" + i).src = "./assets/img/mediumOnclick.png"
//         document.getElementById("prio" + 1).src = "./assets/img/urgentImg.png"
//         document.getElementById("prio" + 3).src = "./assets/img/lowImg.png"
//     }
//     if (selectedUrgency == 'low') {
//         document.getElementById("prio" + i).src = "./assets/img/lowOnclick.png"
//         document.getElementById("prio" + 1).src = "./assets/img/urgentImg.png"
//         document.getElementById("prio" + 2).src = "./assets/img/mediumImg.png"
//     }

// }


// function addSubtask() {
//     let subtask = document.getElementById('subtask');
//     if (subtask.value) {
//         subtasksToSave.push({
//             subtask: subtask.value,
//             checkedValue: 0,
//         })
//     }
//     subtask.value = ''
//     renderSubtasksOnAddTask()
// }


// function deleteSubtask(i) {
//     subtasksToSave.splice(i, 1);
//     renderSubtasksOnAddTask();
// }


// function openInputAddCategory() {
//     document.getElementById('selectedCategoryInputValue').value = ''
//     document.getElementById('hiddenInputCategory').classList.remove('displayNone')
//     document.getElementById('dropdownCategory').style = 'display:none'
// }


// function addCategoryOnTask() {
//     let value = document.getElementById('selectedCategoryInputValue').value;
//     if (value) {
//         document.getElementById('labelCategory').innerHTML = '';
//         document.getElementById('labelCategory').innerHTML = `<div class="assignedCategoryValues">
//          ${value}
//           <div class="colorPicker colorPickerAssigned" style="background-color: ${colorsCategory}"  id="assignedColor"></div>
//          </div>` ;
//         document.getElementById('hiddenInputCategory').classList.add('displayNone')
//         document.getElementById('dropdownCategory').style = 'none'
//     }
// }


// function addCategoryColorOnTask(i) {
//     let value = document.getElementById('selectedCategoryInputValue').value;
//     if (value) {
//         let color = document.getElementById("color" + i).style.backgroundColor
//         if (colorsCategory.length == 0) {
//             colorsCategory.push(color)
//         } else {
//             colorsCategory = []
//             colorsCategory.push(color)
//         }
//         addCategoryOnTask()
//     }
// }


// function openInputAddContact() {
//     document.getElementById('hiddenInputAddContact').classList.remove('displayNone')
//     document.getElementById('dropdownAddContact').style = 'display:none'
// }


// function addToAssignedContacts(index) {
//     if (index >= 0 && index < contacts.length) {
//         let contact = contacts[index];
//         contact.id = 1
//         if (!assignedContacts.includes(contact)) {
//             assignedContacts.push(contact);
//         } else {
//             assignedContacts.splice(assignedContacts.indexOf(contact), 1);
//         }
//     }
// }


// async function popTheAddedDesk() {
//     document.getElementById('popUpWhenAdded').classList.remove('displayNone')
//     setTimeout(function () { document.getElementById('popUpWhenAdded').classList.add('displayNone') }, 2000)
// }


// function closeHiddenInput() {
//     document.getElementById('hiddenInputCategory').classList.add('displayNone')
//     document.getElementById('dropdownCategory').style = 'display:inlineBlock'
// }


// function renderSubtasksOnAddTask() {
//     document.getElementById('subtasksPopUp').innerHTML = ''
//     subtasksToSave.forEach((subtask, index) => {
//         document.getElementById('subtasksPopUp').innerHTML += `<div class="checkBoxDiv">
//         <label class="subtaskLabel">${subtask.subtask}</label><img src=".././assets/img/closeButtonBoard.png" onclick="deleteSubtask(${index})">
//         </div>`
//     })
// }


// document.addEventListener('DOMContentLoaded', function () {

//     const contactList = document.getElementById('eventLis');
//     const dropdownAddContact = document.getElementById('dropdownAddContact')

//     contactList.addEventListener('mouseenter', function (event) {
//         dropdownAddContact.innerHTML = ''
//         contacts.forEach((contact, index) => {
//             dropdownAddContact.innerHTML += `<div class="droppedContacts"><a>${contact.name}</a><input onclick="addToAssignedContacts('${index}')" type="checkbox"></div>`;
//         });
//     });
// });