const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentsSchema = new Schema({
    razorpay_signature: {
        type: String,
        required: true
    },
    razorpay_payment_id: {
        type: String,
        required: true
    },
    razorpay_order_id: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    }
});

module.exports = mongoose.model('Payments', paymentsSchema);