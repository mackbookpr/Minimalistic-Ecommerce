require('dotenv').config();
const mongoose = require('mongoose');

const url = process.env.dbURL;

async function ecommerceConnectMiddleWare(req, res, next) {
    try {
        await mongoose.connect(url);
        next();
    } catch (err) {
        console.error("Error during database connection or updating products:", err);
    }
}

module.exports = ecommerceConnectMiddleWare;