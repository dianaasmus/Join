function HTMLrenderTaskCards(i, j) {

    return `<div draggable="true" ondragstart="startDragging(${i})" onclick="renderDialogFullCard(${i})" class="boardCard" >
                <div class="category" style="background-color: ${tasks[i].colorCategory}">
                   ${tasks[i].category}
                </div>
                <h4 >${tasks[i].title}
                </h4>
                <div class="task">${tasks[i].description}
                </div>
                <div class="progressBarSection">
                   <div id="" class="progressBar"></div>
                   <div>1/2 Done</div>
                </div>
                <div class="assignedToBoard">
                    <span class="assignedToAvatars" id="">HS</span>
                    <img id="urgencyBoard${j}" src=" ">
                </div>
            </div>`
}


function HTMLrenderDialogFullCard(i) {
    return `
    <div class="dialogFullCardContent">
        <div class="wrapperDialog">
                 <img onclick="closeTask()" class="closeButtondialogFullCard" src="./assets/img/closeButtonBoard.png">
                 <div class="categoryDialog" style="background-color: ${tasks[i].colorCategory}"> 
                      ${tasks[i].category}
                 </div>
                 <h1>${tasks[i].title}</h1>  
                 <div class="taskDescript">
                      ${tasks[i].description}
                 </div>
                 <div class="dueDate">
                      <p>Due Date:</p> <span>${tasks[i].date}</span>
                 </div>
                 <div class="dueDate">
                     <p>Priority:</p> <img class="priorityImgFullCard" id="urgencyFullCard${i}" src=" ">
                 </div>
              
                 <div class="assignedTo">
    
                      <p>Assigned to:</p>
                 </div>
                 <div class="editDelete">
                       <img onclick="deleteTask(${i})" class="edit" src="./assets/img/blueDelete.png">
                      <img onclick="openEditTask(${i})" class="edit" src="./assets/img/blueEdit.png">
                 </div>
        </div>
   </div>`
}


function openEditTaskHTML(i) {
    return `<div class="dialogFullCardContent"
        style="display:flex; justify-content: center !important; align-items: center;">
        <form class="boardEditTaskForm" onsubmit="editTask(${i}); return false;">
            <div>
                <label>Title</label>
                <input class="inputEdit" id="editedTask" type="text" placeholder="Enter a title" required value="${tasks[i].title}">
            </div>

            <div>
                <label>Description</label>
                <textarea class="textareaEdit" id="editedDescription" required type="text"
                    placeholder="Enter a description">${tasks[i].description}</textarea>
            </div>

            <div>
                <label>Due date</label>
                <input class="inputEdit" type="date" value="${tasks[i].date}" id="editedDate" required />
            </div>

            <div><!--Prio container-->
                <label>Prio</label>
                <div class="priorities">
                    <img id="prio4" value="urgent" onclick="addEditedPriority(${4})" class="priorityImgEdit"
                        src="./assets/img/urgentImg.png">
                    <img id="prio5" value="medium" onclick="addEditedPriority(${5})" class="priorityImgEdit"
                        src="./assets/img/mediumImg.png">
                    <img id="prio6" value="low" onclick="addEditedPriority(${6})" class="priorityImgEdit"
                        src="./assets/img/lowImg.png">
                </div>
            </div>

               <div>
                     <label>Subtasks:</label>
                     <div  id="subtasksFullCard" style="display:flex; flex-direction:column;">
                     </div>
                 </div>

            <div class="AssignedTo" style="padding:6px;"> <!--Assigned to container-->
                <label>Assigned to</label>
                <div class="dropdownEditTask">
                    <div class="headerForSelectionField">
                        <span style="position: relative;">Reassign contacts</span>
                        <img class="arrDown" src="./assets/img/arrDown.png">
                        <div>
                            <input id="editedHiddenInputAddContact" class="hiddenInput displayNone"
                                placeholder="New category name"> <!--Hidden input addContact-->
                        </div>
                    </div>
                    
                    <div id="editedDropdownAddContact" class="dropdown-content" >
                        <a href="#" onclick="openInputAddContact()">New contact</a>
                    </div>
                </div>
            </div><!--Assigned to container closed-->
            <div class="okButtonDiv">
               <button class="okButton">Ok  &#10004;</button>
            </div>
    </form><!--Content edit card container closed-->
    
  </div><!--Edit card container closed-->
  `
}
