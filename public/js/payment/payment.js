const btn = document.querySelector('.mybtn');

btn.addEventListener('click', async (ev) => {
    // console.log(ev.target);
    try {
        let name = btn.getAttribute('name');
        let email = btn.getAttribute('email');
        let contact = btn.getAttribute('contact');
        let cartItemsdata = await axios.get('/payment/getCartItems');
        let cartItems = cartItemsdata.data;
        // console.log(cartItems);

        let amount = 0;
        cartItems.forEach(product => {
            // console.log(product.quantity);
            // console.log(product.id.price);
            amount += product.quantity * product.id.price;
        });
        // console.log(amount);
        // console.log(name, " ", email, " ", contact);
        let orderData = await axios.post('/payment/checkout', { amount });
        let order = orderData.data;

        let keyData = await axios.get('/payment/getkey');
        let key = keyData.data;
        // console.log(order);

        var options = {
            "key": key, // Enter the Key ID generated from the Dashboard
            "amount": order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Shopping Cart LTD",
            "description": "Payment",
            "image": "https://example.com/your_logo",
            "order_id": order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": "/payment/paymentverification",
            "prefill": {
                "name": name,
                "email": email,
                "contact": contact
            },
            "notes": {
                "address": "New Delhi"
            },
            "theme": {
                "color": "#F05151"
            }
        };
        const razor = new Razorpay(options);
        razor.open();
    }
    catch (err) {
        console.log(err);
    }
})