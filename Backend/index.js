const express = require('express');
const Product = require('./Model/Product');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');
const User = require('./Model/User');
const jwt = require('jsonwebtoken');

const server = express();

server.use(express.json());
server.use(cors({
    origin: 'http://localhost:3000',
}));

server.use('/Public', staticMiddleware);
server.use(ecommerceConnectMiddleWare);

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

// Function to generate a random secret key using built-in Node.js crypto module
const generateSecretKey = () => {
    return require('crypto').randomBytes(32).toString('hex');
};

server.post('/Register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ message: "User already exists!!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        // Generate a random secret key
        const secret = generateSecretKey();

        const token = jwt.sign({ id: newUser._id }, secret, { expiresIn: '1h' });

        res.cookie('token', token, { httpOnly: true, secure: true });

        res.status(200).send({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
