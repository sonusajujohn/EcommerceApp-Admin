const Product = require('../model/productModel');  // Import Product model
const Offer = require('../model/offerModel'); // Import Offer model

// Add an offer to a product
const addOffer = async (req, res) => {
    try {
      const { productId, discount, startDate, endDate, description, offerType } = req.body;
  
      // Create a new offer
      const newOffer = new Offer({ productId, discount, startDate, endDate, description, offerType });
      await newOffer.save();
  
      // Find the product by its ID
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Calculate the new price after applying the discount
      const discountedPrice = product.price - (product.price * discount / 100);
  
      // Update the product with the new price and link the offer to the product
      product.offer = newOffer._id;
      product.discountedPrice = discountedPrice; // Adding the discounted price to the product model (make sure this field exists)
      await product.save();
  
      res.status(201).json({ message: 'Offer added successfully', offer: newOffer, discountedPrice });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

// Update an existing offer
const updateOffer = async (req, res) => {
  try {
    const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Offer updated successfully', offer: updatedOffer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an offer
const deleteOffer = async (req, res) => {
  try {
    await Offer.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Offer deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addOffer, updateOffer, deleteOffer };
