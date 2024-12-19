const express = require('express');
const router = express.Router();
const { addOffer, updateOffer, deleteOffer } = require('../controllers/offerController');

// Add a new offer to a product
router.post('/addoffer', addOffer);

// Update an existing offer
router.put('/updateoffer/:id', updateOffer);

// Delete an offer
router.delete('/deleteoffer/:id', deleteOffer);

module.exports = router;
