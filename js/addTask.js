let addTaskPage = false;

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
    setReadinessState = 'toDo';
    addTaskPage = true;
}