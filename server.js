const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());

// In-memory product database
const productDatabase = {
    "012345678912": { name: "Milk", price: 2.50 },
    "098765432109": { name: "Bread", price: 1.50 },
    "123456789012": { name: "Eggs", price: 3.00 },
    "8901063093089": { name: "Product Name", price: 5.00 }
};

// API endpoint to get product details
app.get('/product/:barcode', (req, res) => {
    const barcode = req.params.barcode;
    console.log(`Request for barcode: ${barcode}`);
    const item = productDatabase[barcode];

    if (item) {
        res.json({ success: true, item });
    } else {
        res.json({ success: false, message: "Item not found" });
    }
});

// API endpoint for checkout
app.post('/checkout', (req, res) => {
    const cart = req.body.cart;

    if (cart && cart.length > 0) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Serve the index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
