require('dotenv').config();

const corsOrigin = process.env.corsOrigin;
const port = process.env.PORT || 8080;
const imageURL = process.env.imageURL;
const secret = process.env.secret;
const Email = process.env.email;
const Pass = process.env.pass;
const express = require('express');
const Product = require('./Model/Product');
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const razorPay = require('razorpay');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');
const User = require('./Model/User');
const jwt = require('jsonwebtoken');
const Cart = require('./Model/Cart');
const path = require('path');
const nodemailer = require('nodemailer');
const {OAuth2Client} = require('google-auth-library');

const server = express();

server.use('/Public', staticMiddleware);
server.use(ecommerceConnectMiddleWare);
server.use(express.json());
server.use(cookieParser());

server.use(cors({
    origin: corsOrigin,
    credentials: true
}));
server.use((req, res, next) => {
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
    next();
  });

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

server.get('/defaultImages', (req, res) => {
    try {
        const images = [
            { src: "http://localhost:8080/Public/SkinCare.jpg", text: "Revive skin" },
            { src: "http://localhost:8080/Public/Kitchen.jpg", text: "Refine food" },
            { src: "http://localhost:8080/Public/Electronics.jpg", text: "New Home" },
            { src: "http://localhost:8080/Public/Furniture.jpg", text: "Live Well" },
        ];
        res.json(images);
    } catch (error) {
        console.log(error);
    }
})

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
server.post('/LoginPage', async (req, res) => {
    try {
        const { email, password } = req.body;

        const newUser = await User.findOne({ email });

        // Check if the user exists
        if (!newUser) {
            return res.status(401).send({ message: "User doesn't exist with the provided email!" });
        }

        // Check if the password is valid
        const isPasswordValid = await bcrypt.compare(password, newUser.password);

        if (!isPasswordValid) {
            return res.status(401).send({ message: "Incorrect password!" });
        }

        // If both email and password are correct, generate JWT token
        const tokenVal = jwt.sign({ id: newUser._id }, secret, { expiresIn: '2d' });

        const options = {
            expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        }

        // Set the token in a cookie
        res.cookie('token', tokenVal, options);

        // Send a success message if login is successful
        res.status(200).send(tokenVal);
    } catch (err) {
        res.status(500).send({ message: err.message });
    }
});

server.post('/orders', async (req, res) => {
    const { amount, currency, receipt } = req.body;
    const RazorPay = new razorPay({
        key_id: process.env.razorPay_key,
        key_secret: process.env.razorPay_secret
    });

    const options = {
        amount,
        currency,
        receipt: receipt.slice(0, 40)
    };

    try {
        const order = await RazorPay.orders.create(options);
        res.json(order);
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send(error);
    }
});

server.post('/send-invoice', async (req, res) => {
    const { email, receiptId, totalAmount } = req.body;
    // Configure your email transport
    let transporter = nodemailer.createTransport({
        service: 'Gmail', // You can use any email servicemaheshwarimadhav166@12345Mdhav166imaheshwa
        auth: {
            user: Email,
            pass: Pass,
        },
    });

    // Configure the email options
    let mailOptions = {
        from: `"Minimalistic Ecommerce" ${Email}`,
        to: email,
        subject: 'Your Invoice',
        text: `Thank you for your purchase. Here is your receipt:\n\nReceipt ID: ${receiptId}\nTotal Amount: ₹${totalAmount}`,
        html: `<p>Thank you for your purchase. Here is your receipt:</p><p><b>Receipt ID:</b> ${receiptId}</p><p><b>Total Amount:</b> ₹${totalAmount}</p>`
    };

    // Send the email
    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Invoice sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
    }
});

server.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'Logout successful' });
});

server.get('/valid', async (req, res) => {
    try {
        // Get the token from the request cookies
        const token = req.cookies.token;

        // Check if the token exists
        if (!token) {
            return res.json({ valid: false });
        }

        // Verify and decode the token
        const decoded = jwt.verify(token, secret);

        // Check if decoding was successful
        if (decoded) {
            // Extract user ID from the decoded token
            const { id } = decoded;

            // Find the user in the database using the user ID
            const user = await User.findById(id);

            // Check if the user exists
            if (user) {
                const { username } = user;
                return res.json({ valid: true, username, id });
            } else {
                // User not found
                return res.json({ valid: false });
            }
        } else {
            // Invalid token
            return res.json({ valid: false });
        }
    } catch (err) {
        // Handle any errors
        console.error("Error:", err.message);
        return res.status(500).json({ error: "Internal server error" });
    }
});

server.post('/cart/remove', async (req, res) => {
    const { userId, productId } = req.body;
    try {
        let cart = await Cart.findOne({ userID: userId });
        const updatedCartItems = cart.cartItems.filter(item => item.productId !== productId);
        cart.cartItems = updatedCartItems;
        await cart.save();
        res.json(200);
    }
    catch (error) {
        res.json(error);
    }
});

server.post('/cart/add', async (req, res) => {
    const { Name, userId, productId, quantity, price, imgUrl } = req.body;
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
            cart.cartItems.push({ Name, productId, quantity, price, imgUrl });
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
        const cart = await Cart.findOne({ userID: userId });

        if (cart) {
            cartsObject = cart.toObject();
            cartsObject = cartsObject.cartItems;
            let quantity = 0;
            let cost = 0;
            cartsObject.map((item) => {
                quantity += item.quantity;
                cost += item.cost;
            })
            res.status(200).json({ cartsObject, quantity, cost });
        } else {
            // If cart does not exist, return a 404 status with a message
            res.status(404).json({ message: 'Cart not found' });
        }
    } catch (error) {
        // If an error occurs, return a 500 status with the error message
        res.status(500).json({ error: error.message });
    }
});

server.post('/quantityChange', async (req, res) => {
    const { newQuantity, productId, userID } = req.body;

    try {
        let cart = await Cart.findOne({ userID: userID });

        const ProductIndex = cart.cartItems.findIndex(item => item.productId === productId);
        cart.cartItems[ProductIndex].quantity = newQuantity;

        await cart.save();
        res.json(200);
    } catch (error) {
        res.json(error);
    }
})


server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
