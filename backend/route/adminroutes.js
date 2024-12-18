const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { 
    registerAdmin, 
    approveRejectAdmin, 
    loginAdmin, 
    listadmin, 
    deleteadmin 
} = require("../controllers/adminController"); // Adjust the path to your controller

const adminRouter = express.Router();

// Ensure the uploads folder exists
const ensureUploadsFolder = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Create the folder recursively if it doesn't exist
    }
};

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, "../uploads/business_license");
        ensureUploadsFolder(folderPath);
        cb(null, folderPath); // Use the folder path for saving files
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to avoid conflicts
    }
});

// Multer upload configuration with file validation
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
        if (!allowedTypes.includes(file.mimetype)) {
            return cb(new Error('Only PDF, JPEG, or PNG files are allowed!')); // Restrict file types
        }
        cb(null, true);
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

// Error handler for file upload
const handleMulterError = (req, res, next) => {
    upload.single('businessLicense')(req, res, (err) => {
        if (err) {
            return res.status(400).json({ success: false, message: err.message }); // Return error message to client
        }
        next();
    });
};

// Route to register admin (with business license upload)
adminRouter.post('/register', handleMulterError, registerAdmin);

// Route to list all admins
adminRouter.get('/list', listadmin);

// Route to login an admin
adminRouter.post('/login', loginAdmin);

// Route to approve or reject an admin registration
adminRouter.put('/approve-reject', approveRejectAdmin);

// Route to delete an admin
adminRouter.delete('/delete/:id', deleteadmin);

module.exports = adminRouter;
