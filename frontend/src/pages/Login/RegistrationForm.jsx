// import React, { useState } from "react";
// import "./RegistrationForm.css";
// import {
//   Person,
//   Email,
//   Phone,
//   Home,
//   LocationOn,
//   Badge,
//   Business,
//   Lock,
//   Visibility,
//   VisibilityOff,
// } from "@mui/icons-material";
// import axios from "axios";

// const RegistrationForm = () => {
//   const [action, setAction] = useState("Register Admin");
//   const [showPassword, setShowPassword] = useState(false);

//   // Form state
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     pincode: "",
//     govtIdType: "",
//     govtId: "",
//     businessLicense: null,
//     gstNumber: "",
//     password: "",
//   });

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   // Handle form changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   // Handle file change (for business license)
//   const handleFileChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       businessLicense: e.target.files[0],
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const { password, name, email, phoneNumber, address, pincode, govtIdType, govtId, gstNumber } = formData;

//     // Basic validation
//     if (!name || !email || !phoneNumber || !address || !pincode || !govtIdType || !govtId || !gstNumber || !password) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     try {
//       const form = new FormData();
//       for (const key in formData) {
//         form.append(key, formData[key]);
//       }

//       const response = await axios.post("http://localhost:5000/admin/register", // Your backend API URL
//         form,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       if (response.data.success) {
//         alert(response.data.message);
//         // Reset form or redirect
//       } else {
//         alert(response.data.message);
//       }
//     } catch (error) {
//       console.error("Error registering admin:", error);
//       alert("Error registering admin.");
//     }
//   };

//   return (
//     <div className="container1">
//       <div className="header">
//         <div className="text">{action}</div>
//         <div className="underline"></div>
//       </div>

//       {action === "Register Admin" && (
//         <form className="inputs" onSubmit={handleSubmit}>
//           <div className="input">
//             <Person className="icon" />
//             <input
//               type="text"
//               name="name"
//               placeholder="Name"
//               value={formData.name}
//               onChange={handleChange}
//               required
//               autoComplete="name"
//             />
//           </div>
//           <div className="input">
//             <Email className="icon" />
//             <input
//               type="email"
//               name="email"
//               placeholder="Email Id"
//               value={formData.email}
//               onChange={handleChange}
//               required
//               autoComplete="email"
//             />
//           </div>
//           <div className="input">
//             <Phone className="icon" />
//             <input
//               type="text"
//               name="phoneNumber"
//               placeholder="Phone Number"
//               value={formData.phoneNumber}
//               onChange={handleChange}
//               required
//               autoComplete="tel"
//             />
//           </div>
//           <div className="input">
//             <Home className="icon" />
//             <input
//               type="text"
//               name="address"
//               placeholder="Address"
//               value={formData.address}
//               onChange={handleChange}
//               required
//               autoComplete="street-address"
//             />
//           </div>
//           <div className="input">
//             <LocationOn className="icon" />
//             <input
//               type="text"
//               name="pincode"
//               placeholder="Pin Code"
//               value={formData.pincode}
//               onChange={handleChange}
//               required
//               autoComplete="postal-code"
//             />
//           </div>

//           {/* Govt ID Type Select */}
//           <div className="input">
//             <Badge className="icon" />
//             <select
//               name="govtIdType"
//               value={formData.govtIdType}
//               onChange={handleChange}
//               required
//             >
//               <option value="">Select Government ID Type</option>
//               <option value="pan">PAN</option>
//               <option value="aadhaar">Aadhaar</option>
//               <option value="drivingLicense">Driving License</option>
//             </select>
//           </div>

//           <div className="input">
//             <Badge className="icon" />
//             <input
//               type="text"
//               name="govtId"
//               placeholder="Government ID"
//               value={formData.govtId}
//               onChange={handleChange}
//               required
//               autoComplete="off"
//             />
//           </div>

//           {/* Business License File */}
//           <div className="input">
//             <Business className="icon" />
//             <input
//               type="file"
//               name="businessLicense"
//               onChange={handleFileChange}
//               required
//             />
//           </div>

//           <div className="input">
//             <input
//               type="text"
//               name="gstNumber"
//               placeholder="GST Number"
//               value={formData.gstNumber}
//               onChange={handleChange}
//               required
//               autoComplete="off"
//             />
//           </div>

//           <div className="input password">
//             <Lock className="icon" />
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               placeholder="Password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               autoComplete="new-password"
//             />
//             <span className="eye-icon" onClick={togglePasswordVisibility}>
//               {showPassword ? <VisibilityOff /> : <Visibility />}
//             </span>
//           </div>

//           <button type="submit" className="submit-button">
//             Register Admin
//           </button>
//         </form>
//       )}
//     </div>
//   );
// };

// export default RegistrationForm;

import React, { useState } from "react";
import axios from "axios";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    govtIdType: "",
    govtId: "",
    gstNumber: "",
    password: "",
  });

  const [businessLicense, setBusinessLicense] = useState(null);
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setBusinessLicense(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file upload
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (businessLicense) {
      data.append("businessLicense", businessLicense);
    }

    try {
      const response = await axios.post("http://localhost:5000/admin/register", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error("Error during registration:", error.response?.data?.message || error.message);
      setMessage(error.response?.data?.message || "Error occurred during registration.");
    }
  };

  return (
    <div>
      <h2>Admin Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Pincode:</label>
          <input
            type="text"
            name="pincode"
            value={formData.pincode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Govt ID Type:</label>
          <select name="govtIdType" value={formData.govtIdType} onChange={handleInputChange} required>
            <option value="">Select</option>
            <option value="aadhaar">Aadhaar</option>
            <option value="pan">PAN</option>
            <option value="passport">Passport</option>
          </select>
        </div>
        <div>
          <label>Govt ID:</label>
          <input
            type="text"
            name="govtId"
            value={formData.govtId}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>GST Number:</label>
          <input
            type="text"
            name="gstNumber"
            value={formData.gstNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Business License (PDF, JPEG, PNG):</label>
          <input 
            type="file" 
            onChange={handleFileChange} 
            accept=".pdf, .jpg, .jpeg, .png" 
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default RegistrationForm;
