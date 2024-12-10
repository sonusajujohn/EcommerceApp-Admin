const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

// Initialize Express
const app = express();

// Load environment variables
dotenv.config();

// Middleware to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the "uploads" folder
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to the database
require('./config/db');

// Import routes
const productRoutes = require('./route/productroutes');

// Use product routes
app.use('/product', productRoutes);

// Default route for health check
app.get('/', (req, res) => {
    res.send("Welcome to the Product Management API!");
});

// Start the server
const port = process.env.PORT || 5000; // Fallback to port 5000 if not set in .env
app.listen(port, () => {
    console.log(`The app is listening at port : ${port}`);
});
