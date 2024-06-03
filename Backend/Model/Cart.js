const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    productId: { type: Number, ref: 'Product' },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    imgUrl: { type: String, required: true }
});

const cartSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cartItems: [cartItemSchema]
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
