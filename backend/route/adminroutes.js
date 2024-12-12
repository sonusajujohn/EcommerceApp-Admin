const express = require('express');
const router = express.Router();
const { registerAdmin, approveRejectAdmin, loginAdmin, listadmin, deleteadmin } = require('../controllers/adminController'); // Assuming the controller file is named 'adminController.js'

// Admin Registration Route
router.post('/register', registerAdmin);

// Superadmin approves or rejects admin registration
router.post('/approve-reject', approveRejectAdmin);

// Admin Login Route
router.post('/login', loginAdmin);

// List all Admins
router.get('/list', listadmin);

// Delete an Admin
router.delete('/delete/:id', deleteadmin);



module.exports = router;
