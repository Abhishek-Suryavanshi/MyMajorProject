const form = document.querySelector('form');
const username = document.querySelector('.username');
const password = document.querySelector('.password');

console.log('hello');
// alert("haa bhai chal rha hai");


form.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(username.value);
    console.log(password.value);

    let val = false;

    if (username.value == '') {
        // ev.preventDefault();
        val = true;
        alert("Username must be filled Out");
    }

    if (password.value == '') {
        // ev.preventDefault();
        val = true;
        alert("Password must be filled Out");
    }

    if (val == false) {
        form.submit();
    }
});