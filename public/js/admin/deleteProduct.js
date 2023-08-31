const productsList = document.querySelector('.productsList');

function updateProductList(data) {
    // console.log(data);
    let str = '';
    if (data) {
        data.forEach(product => {
            // <button productId="${product._id}" imageUrl="${product.imageUrl}" class=" mybtn">Delete Item</button>
            // <button><a href='/admin/update-product?productId=${product._id}' class="updateLink">Update Item</a></button>
            str +=
                `<div class="productItem">
            <img src="${product.imageUrl}" class="imageUrl">
            <div class="name">${product.name}</div>
            <div class="price">${product.price}</div>
            <div class="description">${product.description}</div>
    
            <button type="button" class="btn btn-outline-danger mybtn" productId="${product._id}" imageUrl="${product.imageUrl}"
                >Delete Item</button>
          
            <button type="button" class="btn btn-outline-warning"><a href='/admin/update-product?productId=${product._id}'
             class="updateLink">Update Item</a></button>
    
        </div>`;
        });
    }
    else {
        str+=``
    }

    productsList.innerHTML = str;
}

productsList.addEventListener('click', async (ev) => {
    // console.log(ev.target.getAttribute('productId'));
    // console.log(ev.target.parentElement);
    if (ev.target.classList.contains('mybtn')) {
        try {
            let parent = ev.target.parentElement;
            parent.classList.add('productTransition');

            let productId = ev.target.getAttribute('productId');
            let imageUrl = ev.target.getAttribute('imageUrl');
            let data = await axios.post('/admin/delete-product?_method=DELETE', { productId, imageUrl });
            // console.log(data.data);

            updateProductList(data.data);
            // productsList.classList.add('productTransition');
        }
        catch (err) {
            console.log(err);
        }
    }
});

