const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product model
    required: true,
  },
  discount: {
    type: Number, // Percentage discount, e.g., 10 for 10% off
    required: true,
  },
  startDate: { type: Date },
  endDate: { type: Date },
  description: { type: String }, // Description of the offer
  offerType: { type: String }, // e.g., 'seasonal', 'clearance', etc.
}, {
  timestamps: true,
});

const offerData = mongoose.model('offer', offerSchema);

module.exports = offerData;
