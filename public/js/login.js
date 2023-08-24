const form = document.querySelector('form');
const username = document.querySelector('.username');
const password = document.querySelector('.password');

form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(username.value);
    console.log(password.value);

    let val = false;

    if (username.value == '') {
        // ev.preventDefault();
        val = true;
        alert("Username must be required to Login");
    }

    if (password.value == '') {
        // ev.preventDefault();
        val = true;
        alert("Password must be required to Login");
    }

    if (val == false) {
        form.submit();
    }
});