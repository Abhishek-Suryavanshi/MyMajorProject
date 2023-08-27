const productsList = document.querySelector('.productsList');

function updateProductList(data) {
    // console.log(data);
    let str = '';
    data.forEach(product => {
        str +=
            `<div class="productItem">
        <img src="${product.imageUrl}" class="imageUrl">
        <div class="name">${product.name}</div>
        <div class="price">${product.price}</div>
        <div class="description">${product.description}</div>

        <button productId="${product._id}" class=" mybtn">Delete Item</button>
    </div>`;
    });

    productsList.innerHTML = str;
}

productsList.addEventListener('click', async (ev) => {
    // console.log(ev.target.getAttribute('productId'));
    try {
        let productId = ev.target.getAttribute('productId');
        let data = await axios.post('/admin/delete-product?_method=DELETE', { productId });
        // console.log(data.data);
        updateProductList(data.data);
    }
    catch (err) {
        console.log(err);
    }
});



