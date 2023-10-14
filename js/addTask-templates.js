function addDropdownCategoryHTML() {
    return `
        <div id="dropdownCategory" class="dropdown-content">
            <div id="dropdownAddCategoryPopUp">
            </div>
            <a class="addNewBtn" onclick="openInputAddCategory()">Add Category</a>
        </div>
        `;
}


function newCategoryHTML(value) {
    return `
    <div class="assignedCategoryValues" id="assignedCategoryValues">
        <div class="colorPicker colorPickerAssigned" style="background-color: ${colorsCategory}"  id="assignedColor"></div>
        <p>${value}</p>
    </div>` ;
}


function selectedCategoryHTML(selectedCategoryValue, selectedCategoryColor) {
    return `
    <div class="assignedCategoryValues">
        <div class="colorPicker colorPickerAssigned" style="background-color: ${selectedCategoryColor}"  id="assignedColor"></div>
        <p id="selectedCategoryValue">${selectedCategoryValue}</p>
    </div>
    `;
}


function addedTaskFeedback() {
    return `
        <div id="popUpWhenAdded">
            <span>Task added to Board</span>
            <img src="../assets/img/board-icon.svg" class="sidebar-icon-2">
        </div>
    `;
}