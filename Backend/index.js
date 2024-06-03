require('dotenv').config();

const express = require('express');
const Product = require('./Model/Product');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');
const User = require('./Model/User');
const jwt = require('jsonwebtoken');
const Cart = require('./Model/Cart');

const server = express();


// Access environment variables
const corsOrigin = process.env.corsOrigin;
const port = process.env.PORT;
const imageURL = process.env.imageURL;
const secret = process.env.secret;

// Configure CORS
server.use(cors({
    origin: corsOrigin, // Replace with the origin of your frontend
    credentials: true // Allow credentials (cookies, authorization headers)
}));



server.use('/Public', staticMiddleware);
server.use(ecommerceConnectMiddleWare);
server.use(express.json());
server.use(cookieParser());

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
            imageURL: imageURL + product.category + '/' + product.imgName + '.png'
        }));
        res.json(productsWithImageURLs);
    } catch (err) {
        console.error("Error fetching products:", err.message);
        res.status(500).json({ error: "Error fetching products" });
    }
});

server.post('/Register', async (req, res) => {
    try {
        const { email, username, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).send({ message: "User already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({ email, password: hashedPassword, username });
        await newUser.save();

        const tokenVal = jwt.sign({ id: newUser._id }, secret, { expiresIn: '2d' });

        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        res.cookie('token', tokenVal, options);

        res.status(200).send({ message: "User registered successfully", user: newUser });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});
server.post('/Login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        // Check if the user exists
        if (!user) {
            return res.status(401).send({ message: "User doesn't exist with the provided email!" });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password!" });
        }

        // If both email and password are correct, generate JWT token
        const tokenn = jwt.sign({ id: user._id }, secret, { expiresIn: '2d' });

        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        // Set the token in a cookie
        res.cookie('token', tokenn, options);

        // Send a success message if login is successful
        res.status(200).send({ message: "Login successful" });
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

server.get('/', async (req, res) => {
    const Token = req.cookies.token;

    if (!Token) {
        res.json({ valid: false });
    }
    else {
        try {
            const decoded = jwt.decode(Token);
            if (decoded) {
                const { id } = decoded;
                const userr = await User.findOne({ _id: id });
                const { username } = userr;
                res.json({ valid: true, username, id });
            }
            else {
                res.json({ valid: false });
            }
        }
        catch (err) {
            res.json({ err: err.message });
        }
    }
});

// Backend Logic
server.post('/cart/add', async (req, res) => {
    const { userId, productId, quantity, price, imgUrl } = req.body;
    try {
        let cart = await Cart.findOne({ userID: userId });
        if (!cart) {
            // If no cart exists for the user, create a new cart
            cart = new Cart({ userID: userId, cartItems: [] });
        }

        // Check if the product already exists in the cart
        const existingProductIndex = cart.cartItems.findIndex(item => item.productId === productId);
        if (existingProductIndex !== -1) {
            // If the product already exists, update the quantity
            cart.cartItems[existingProductIndex].quantity += quantity;
        } else {
            // If the product does not exist, add it to the cart
            cart.cartItems.push({ productId, quantity, price, imgUrl });
        }

        await cart.save();
        res.json(200);
    } catch (error) {
        res.json(error);
    }
});

server.get('/cart/:userId', async (req, res) => {
    const { userId } = req.params;
    try {
        // Find the cart for the given user ID
        const cart = await Cart.find({ ID: userId });

        if (cart) {
            // If cart exists, return the cart items
            console.log(cart);
            res.status(200).json(cart);
        } else {
            // If cart does not exist, return a 404 status with a message
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status with the error message
        res.status(500).json({ error: error.message });
    }
});


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
