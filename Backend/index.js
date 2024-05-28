<<<<<<< HEAD
require('dotenv').config({ path: '/Secrets.env' });
=======
require('dotenv').config();
>>>>>>> e008c71f9299667c0f59814ab22243fc8cb0747c

const express = require('express');
const Product = require('./Model/Product');
const bcrypt = require('bcryptjs');
const cors = require('cors');
// const corsMiddleWare = require('./MiddleWares/corsMiddleWare');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');
const User = require('./Model/User');
// const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

// Initialize Express server
const server = express();

// Configure CORS
server.use(express.json());
server.use(cors({
    origin: 'http://localhost:3000',
}));

// Serve static files
server.use('/Public', staticMiddleware);

server.use(ecommerceConnectMiddleWare);
// server.use(cookieParser());


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
        const { email, username, password } = req.body;

        // Check if all required fields are provided
        if (!(email && username && password)) {
            return res.status(400).send({ message: "All fields are compulsory!!" });
        }

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ message: "User already exists!!" });
        }
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save(); // Save the new user to the database

        // Generate JWT token
        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        // Set the token as a cookie in the response
        res.cookie('token', token, { httpOnly: true, secure: true });

        // Send response with success message and user information
        res.status(200).send({ message: "User registered successfully", user: newUser });
    }
    catch (err) {
        res.status(500).send({ message: err.message });
    }
});


// Start the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
