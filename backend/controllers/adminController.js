const adminModel = require('../model/adminModel');
const fs = require('fs').promises;
const path = require('path');

// Admin Registration (register API)
const registerAdmin = async (req, res) => {
    const { name, email, phoneNumber, address, pincode, govtIdType, govtId, gstNumber, password } = req.body;
    let businessLicenseFilename;

    try {
        // Handle file upload
        if (req.file) {
            businessLicenseFilename = req.file.filename; // File uploaded via multer
        } else if (req.body.businessLicense) {
            businessLicenseFilename = req.body.businessLicense; // Provided business license URL
        } else {
            return res.status(400).json({ success: false, message: "Business license is required." });
        }

        // Validate required fields
        if (!name || !email || !phoneNumber || !address || !pincode || !govtIdType || !govtId || !businessLicenseFilename || !gstNumber || !password) {
            return res.status(400).json({ success: false, message: "All fields are required." });
        }

        // Validate GST Number format
        const gstRegex = /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[A-Z0-9]{1}Z[A-Z0-9]{1}$/;
        if (!gstRegex.test(gstNumber)) {
            return res.status(400).json({ success: false, message: "Invalid GST number format." });
        }

        // Validate phone number format (Indian format)
        const phoneRegex = /^[6-9]\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ success: false, message: "Invalid phone number format." });
        }

        // Check if admin already exists
        const existingAdmin = await adminModel.findOne({ email });
        if (existingAdmin) {
            return res.status(400).json({ success: false, message: "Admin already exists." });
        }

        // Hash the password (TODO: Replace plain-text storage with hashing)
        // const hashedPassword = await bcrypt.hash(password, 10); // Uncomment when using bcrypt

        // Create new admin
        const newAdmin = new adminModel({
            name,
            email,
            phoneNumber,
            address,
            pincode,
            govtIdType,
            govtId,
            businessLicense: businessLicenseFilename,
            gstNumber,
            password, // Use hashedPassword for secure storage
            status: 'pending',
        });

        // Save new admin to database
        await newAdmin.save();
        res.status(201).json({ success: true, message: "Admin registration successful. Awaiting Superadmin approval." });

    } catch (error) {
        console.error("Error during admin registration:", error.message);
        res.status(500).json({ success: false, message: "Error occurred during registration." });
    }
};

// Admin Login (login API)
const loginAdmin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: "Email and password are required." });
    }

    try {
        const admin = await adminModel.findOne({ email });
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        if (admin.status !== "approved") {
            return res.status(401).json({ success: false, message: "Admin is not approved yet." });
        }

        if (password === admin.password) { // Replace this with hashed password comparison
            res.json({ success: true, message: "Login successful." });
        } else {
            return res.status(401).json({ success: false, message: "Invalid credentials." });
        }
    } catch (error) {
        console.error("Error during admin login:", error.message);
        res.status(500).json({ success: false, message: "Error occurred during login." });
    }
};

// Superadmin approves/rejects admin (approveReject API)
const approveRejectAdmin = async (req, res) => {
    const { adminId, action } = req.body;

    if (!adminId || !action) {
        return res.status(400).json({ success: false, message: "Admin ID and action are required." });
    }

    if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({ success: false, message: "Invalid action. Use 'approve' or 'reject'." });
    }

    try {
        const admin = await adminModel.findById(adminId);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        if (action === "approve") {
            admin.status = "approved";
            await admin.save();
            res.json({ success: true, message: "Admin approved successfully." });
        } else if (action === "reject") {
            await adminModel.findByIdAndDelete(adminId);
            res.json({ success: true, message: "Admin registration rejected and removed." });
        }
    } catch (error) {
        console.error("Error during admin approval/rejection:", error.message);
        res.status(500).json({ success: false, message: "Error occurred while processing the request." });
    }
};

// List Admins (listadmin API)
const listadmin = async (req, res) => {
    try {
        const admins = await adminModel.find({});
        res.status(200).json({ success: true, data: admins });
    } catch (error) {
        console.error("Error fetching admins:", error.message);
        res.status(500).json({ success: false, message: "Error fetching admins." });
    }
};

// Delete Admin (deleteadmin API)
// Delete Admin (deleteadmin API)
const deleteadmin = async (req, res) => {
    const id = req.params.id;

    try {
        const admin = await adminModel.findById(id);
        if (!admin) {
            return res.status(404).json({ success: false, message: "Admin not found." });
        }

        if (admin.businessLicense) {
            const filePath = path.join(__dirname, '../uploads/business_license', admin.businessLicense);
            try {
                await fs.unlink(filePath);
                console.log("Business license deleted successfully.");
            } catch (err) {
                console.warn("Business license file not found:", filePath);
            }
        }

        await adminModel.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Admin removed successfully." });
    } catch (error) {
        console.error("Error deleting admin:", error.message);
        res.status(500).json({ success: false, message: "Error deleting admin." });
    }
};


module.exports = { registerAdmin, approveRejectAdmin, loginAdmin, listadmin, deleteadmin };
