require('dotenv').config();

const express = require('express');
const Product = require('./Model/Product');
const bcrypt = require('bcryptjs');
const corsMiddleWare = require('./MiddleWares/corsMiddleWare');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');
const User = require('./Model/User');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Initialize Express server
const server = express();

// Configure CORS
server.use(express.json());
server.use(corsMiddleWare);

// Serve static files
server.use('/Public', staticMiddleware);

server.use(ecommerceConnectMiddleWare);
app.use(cookieParser());


// Define the API route to get products
server.get('/api/products', async (req, res) => {
    try {
        const Products = await Product.find();
        const productsWithImageURLs = Products.map((product) => ({
            id: product.id,
            name: product.name,
            category: product.category,
            price: product.price,
            color: product.color,
            imgName: product.imgName,
            description: product.description,
            imageURL: 'http://localhost:8080/Public/' + product.category + '/' + product.imgName + '.png'
        }));
        res.json(productsWithImageURLs);
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({ error: "Error fetching products" });
    }
});

const secret = process.env.JWT_SECRET;

server.post('/Register', async (req, res) => {
    try {
        const { email, username, password } = req.body();
        if (!(email && username && password)) {
            res.status(400).send({ message: "All fields are Compulsory!!" })
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(401).send({ message: "User Already Exists!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 20);
        const newUser = await User.create({ email, password: hashedPassword, username });

        // newUser.save();

        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });
        User.token = token;


    }
    catch (err) {

    }
})

// Start the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
