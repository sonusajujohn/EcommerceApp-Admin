const adminModel = require('../model/adminModel');

// Admin Registration (register API)
const registerAdmin = async (req, res) => {
    const { name, email, phoneNumber, address, pincode, govtIdType, govtId, businessLicense, gstNumber, password } = req.body;

    // Check for missing fields
    if (!name || !email || !phoneNumber || !address || !pincode || !govtIdType || !govtId || !businessLicense || !gstNumber || !password) {
        return res.status(400).json({ success: false, message: "All fields are required." });
    }

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({ email });
    if (existingAdmin) {
        return res.json({ success: false, message: "Admin already exists" });
    }

    // Proceed with saving the new admin
    const newAdmin = new adminModel({
        name,
        email,
        phoneNumber,
        address,
        pincode,
        govtIdType,
        govtId,
        businessLicense,
        gstNumber,
        password,
        status: 'pending', // Pending approval from Superadmin
    });

    try {
        await newAdmin.save();
        res.json({ success: true, message: "Admin registration successful. Awaiting Superadmin approval." });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during registration." });
    }
};


// Superadmin approves or rejects admin registration (approveReject API)
const approveRejectAdmin = async (req, res) => {
    const { adminId, action } = req.body; // action can be "approve" or "reject"

    try {
        const admin = await adminModel.findById(adminId);

        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        // Handle approval
        if (action === "approve") {
            admin.status = "approved"; // Change status to approved
            await admin.save();
            res.json({ success: true, message: "Admin approved successfully." });
        } else if (action === "reject") {
            // Delete the admin if rejected
            await adminModel.findByIdAndDelete(adminId);
            res.json({ success: true, message: "Admin registration rejected and removed." });
        } else {
            res.json({ success: false, message: "Invalid action" });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred while processing the request." });
    }
};

// Admin Login (login API)
const loginAdmin = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await adminModel.findOne({ email });

        if (!admin) {
            return res.json({ success: false, message: "Admin not found" });
        }

        // Check if the admin is approved
        if (admin.status !== "approved") {
            return res.json({ success: false, message: "Admin is not approved yet" });
        }

        res.json({
            success: true,
            message: "Login successful",
        });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error occurred during login." });
    }
};

// List Admin Items (listadmin API)
const listadmin = async (req, res) => {
    try {
        const admins = await adminModel.find({});
        res.json({ success: true, data: admins });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

// Delete Admin Item (deleteadmin API)
const deleteadmin = async (req, res) => {
    try {
        const id = req.params.id;
        const admin = await adminModel.findById(id);

        if (admin) {
            // Delete the admin from the database
            await adminModel.findByIdAndDelete(req.body.id);
            res.json({ success: true, message: 'Admin removed' });
        } else {
            res.json({ success: false, message: 'Admin not found' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error' });
    }
};

module.exports = { registerAdmin, approveRejectAdmin, loginAdmin, listadmin, deleteadmin };
