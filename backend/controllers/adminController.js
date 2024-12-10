import adminModel from "../model/adminModel";
import fs from 'fs';
import path from 'path';
import axios from 'axios'; // Required for the external API

// Add Admin Item (addadmin API)
const addadmin = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    const admin = new adminModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        await admin.save();
        res.json({ success: true, message: "Admin Added Successfully" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
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
        const admin = await adminModel.findById(req.body.id);

        if (admin) {
            // Delete the image from the uploads folder
            fs.unlink(path.join(__dirname, `../uploads/${admin.image}`), (err) => {
                if (err) console.log(err);
            });

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

// Example of a function to validate a PIN code using an external API
const validatePincode = async (req, res) => {
    const { pincode } = req.params;

    try {
        const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);

        if (response.data.Status === 'Success') {
            res.json({ success: true, data: response.data.PostOffice });
        } else {
            res.json({ success: false, message: 'Invalid PIN Code' });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: 'Error occurred while fetching PIN code data' });
    }
};

export { addadmin, listadmin, deleteadmin, validatePincode };
