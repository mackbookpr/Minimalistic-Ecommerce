const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    color: { type: String, required: true },
    imgName: { type: String, required: true },
    description: { type: String, required: true },
    weight: { type: String, required: true },
    texture: { type: String, required: true },
    size: { type: String, required: true }
})

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;