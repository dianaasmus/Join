let users = [];

async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch (e) {
        console.error('Loading error:', e);
    }
}

async function register() {
    
    registerBtn.disabled = true;
    users.push({
        userName: userName.value,
        email: email.value,
        password: password.value
    });
    await setItem('users', JSON.stringify(users));
    resetForm();
}

function resetForm() {
    userName.value = '';
    email.value = '';
    password.value = '';
    registerBtn.disabled = false;
}
