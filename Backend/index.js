const express = require('express');
const Product = require('./Model/Product');
const corsMiddleWare = require('./MiddleWares/corsMiddleWare');
const staticMiddleware = require('./MiddleWares/staticMiddleWare');
const ecommerceConnectMiddleWare = require('./MiddleWares/ecommerceConnectMiddleWare');

// Initialize Express server
const server = express();

// Configure CORS
server.use(corsMiddleWare);

// Serve static files
server.use('/Public', staticMiddleware);

server.use(ecommerceConnectMiddleWare);

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

// Start the server
server.listen(8080, () => {
    console.log("Server listening on port 8080");
});
