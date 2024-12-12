const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, { timestamps: true });

const categoryData = mongoose.model('category', categorySchema);
module.exports = categoryData;

