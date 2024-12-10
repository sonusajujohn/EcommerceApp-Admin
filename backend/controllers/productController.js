const ProductModel = require('../model/productModel'); // Import the product model

// Add a product
const addproduct = async (req, res) => {
    try {
        const { productName, productNumber, category, price, description } = req.body;
        const image = req.file ? req.file.filename : null;

        // Check if all required fields are provided
        if (!productName || !productNumber || !category || !price || !description ) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new product instance
        const newProductModel = new ProductModel({
            productName,
            productNumber,
            category,
            price,
            description,
            image,
        });

        // Save the product to the database
        await newProductModel.save();

        res.status(201).json({ message: "Product added successfully", product: newProductModel });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error: error.message });
    }
};

// List all products
const listproduct = async (req, res) => {
    try {
        const products = await ProductModel.find(); // Retrieve all products from the database
        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ message: "Error retrieving products", error: error.message });
    }
};

// Delete a product
const deleteproduct = async (req, res) => {
    try {
        const { productNumber } = req.body; // Assuming `productNumber` is unique and provided for deletion

        // Find and delete the product
        const deletedProduct = await ProductModel.findOneAndDelete({ productNumber });

        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error: error.message });
    }
};

module.exports = { addproduct, listproduct, deleteproduct };
