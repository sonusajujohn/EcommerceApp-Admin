const express = require('express');
const { addproduct, listproduct, deleteproduct } = require('../controllers/productController');

// Create an instance of Router
const productRouter = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});


// Initialize multer with the storage configuration
const upload = multer({ storage: storage });

// Define product-related routes
productRouter.post('/addproduct', upload.single('image'), addproduct); // Add a product with an image
productRouter.get('/listproduct', listproduct); // List all products
productRouter.delete('/removeproduct', deleteproduct); // Delete a product

// Export the router
module.exports = productRouter;
