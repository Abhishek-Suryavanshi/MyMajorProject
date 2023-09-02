const Razorpay = require('razorpay');
const Payments = require('../../models/Payments');

const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
});

module.exports.postCheckout = async (req, res, next) => {
    try {
        const { amount } = req.body;
        const options = {
            amount: amount * 100,  // amount in the smallest currency unit
            currency: "INR",
        };
        const order = await instance.orders.create(options);
        // console.log(order);
        res.send(order);
    }
    catch (err) {
        next(err);
    }
}

module.exports.getGetKey = (req, res, next) => {
    res.send(process.env.RAZORPAY_KEY_ID);
}

module.exports.getCartItems = async (req, res, next) => {
    let user = await req.user.populate('cart.id');
    let userCart = user.cart;
    res.send(userCart);
}

module.exports.postPaymentVerification = async (req, res, next) => {
    try {
        const { razorpay_signature, razorpay_payment_id, razorpay_order_id } = req.body;
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const crypto = require("crypto");
        const expectedSignature = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest('hex');
        console.log("sig received: " + razorpay_signature);
        console.log("sig generated: " + expectedSignature);

        if (expectedSignature === razorpay_signature) {
            // res.send("Payment Success");
            req.flash('payment', 'Payment Successfull');
            // console.log(req.user.cart);
            // while (req.user.cart.length > 0) {
            //     req.user.cart.pop();
            // }
            // req.user.cart = [];
            await Payments.create({
                razorpay_signature,
                razorpay_payment_id,
                razorpay_order_id,
                userId: req.user._id
            });
            res.redirect('/shop/profile');
        } else {
            res.send("Payment Fail");
        }
    }
    catch (err) {
        next(err);
    }
}
