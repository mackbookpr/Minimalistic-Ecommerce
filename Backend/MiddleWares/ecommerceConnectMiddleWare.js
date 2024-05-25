const mongoose = require('mongoose');

async function ecommerceConnectMiddleWare(req, res, next) {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        next();
    } catch (err) {
        console.error("Error during database connection or updating products:", err);
    }
}

module.exports = ecommerceConnectMiddleWare;