const cartList = document.querySelector('.cartList');

cartList.addEventListener('click', (ev) => {
    console.log(ev.target.classList.contains('reduceItem'));
    if (ev.target.classList.contains('reduceItem')) {
        
    }
});