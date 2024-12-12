const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  pincode: {
    type: String,
    required: true,
    trim: true,
  },
  govtIdType: {
    type: String,
    required: true,
    enum: ["pan", "aadhaar", "drivingLicense"], // Accepted values
  },
  govtId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  businessLicense: {
    type: String, // Store file path or URL
    required: true,
  },
  gstNumber: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending', // Default status is pending
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

// Create the admin model
const adminData = mongoose.model("Admin", adminSchema);

module.exports = adminData;
