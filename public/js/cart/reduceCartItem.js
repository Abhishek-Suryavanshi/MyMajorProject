const cartList = document.querySelector('.cartList');

function updateCartList(products) {
    let str = "";
    // console.log(products);

    if (products.length) {
        products.forEach(product => {
            str += `<div class="cartItem">
            <img src="${product.id.imageUrl}" class="imageUrl">
            <div class="name">${product.id.name}</div>
            <div class="price">Price: ${product.id.price}</div>
            <div class="description">${product.id.description}</div>
            <div class="quantity">Quantity: ${product.quantity}</div>
    
            <button type="button" productId=${product._id} class="btn btn-outline-danger reduceItem">Reduce Item</button>
        </div>`
        });
    }
    else {
        str += `<img class="elseimg" src="https://gibbonnutrition.com/img/empty-cart-yellow.png" alt="cartEmpty">`
    }

    cartList.innerHTML = str;
}

cartList.addEventListener('click', async (ev) => {
    // console.log(ev.target.classList.contains('reduceItem'));
    if (ev.target.classList.contains('reduceItem')) {
        let productId = ev.target.getAttribute('productId');
        // console.log(productId);
        try {
            let data = await axios.post('/shop/reduceitem', {
                productId
            })
            // console.log(data.data);
            updateCartList(data.data);
        }
        catch (err) {
            console.log(err);
        }
    }
});