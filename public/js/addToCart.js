const productsList = document.querySelector('.productsList');

productsList.addEventListener('click', async (ev) => {
    // console.log(ev.target.classList.contains('addToCart'));
    if (ev.target.classList.contains('addToCart')) {
        let productId = ev.target.getAttribute('productId');
        // console.log(productId);
        try {
            let data = await axios.get(`/shop/addToCart?productId=${productId}`);
            console.log(data.data);
            let cartCount = document.querySelector('.cartCount');
            cartCount.innerText = data.data.cartCount;
            let sideView = document.querySelector('.sideView');
            sideView.classList.toggle('showCart');
            setTimeout(()=>{
                sideView.classList.toggle('showCart');
            },1000);
        }
        catch (err) {
            console.log(err);
        }
    }
});