// import React, { useState } from "react";
// import axios from "axios";
// import "./AddProduct.css"; // Add CSS for styling if needed

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     brand: "",
//     title: "",
//     totalQuantity:null,
//     sizeQuantities: {
//       "6": null,
//       "7": null,
//       "8": null,
//       "9": null,
//       "10": null,
//       "11": null,
//     },
//     color: "",
//     price: null,
//     description: "",
//     topCategory: "men",
//     subCategory: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (Object.keys(formData.sizeQuantities).includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         sizeQuantities: {
//           ...prev.sizeQuantities,
//           [name]: Number(value),
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: name === "price" || name === "totalQuantity" ? Number(value) : value,
//       }));
//     }
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "sizeQuantities") {
//         data.append(key, JSON.stringify(formData[key]));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       const response = await axios.post("http://localhost:5000/api/product/addproduct", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setSuccess("Product added successfully!");
//       setFormData({
//         image: "",
//         brand: "",
//         title: "",
//         totalQuantity: null,
//         sizeQuantities: {
//           "6": null,
//           "7": null,
//           "8": null,
//           "9": null,
//           "10": null,
//           "11": null,
//         },
//         color: "",
//         price: null,
//         description: "",
//         topCategory: "men",
//         subCategory: "",
//       });
//     } catch (error) {
//       console.error("Error adding product:", error);
//       setError("Failed to add product. Please try again.");
//     }
//   };

//   return (
//     <div className="addproduct">
//       <h2>Add Product</h2>
//       {error && <p className="errorMessage">{error}</p>}
//       {success && <p className="successMessage">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="formGroup">
//           <label>Image:</label>
//           <input
//             type="file"
//             name="image"
//             onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//           />
//           <p>Or</p>
//           <label>Image URL:</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="formGroup">
//           <label>Brand:</label>
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Total Quantity:</label>
//           <input
//             type="number"
//             name="totalQuantity"
//             value={formData.totalQuantity}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Size Quantities:</label>
//           {Object.keys(formData.sizeQuantities).map((size) => (
//             <div key={size}>
//               <label>Size {size}:</label>
//               <input
//                 type="number"
//                 name={size}
//                 value={formData.sizeQuantities[size]}
//                 onChange={handleChange}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="formGroup">
//           <label>Color:</label>
//           <input
//             type="text"
//             name="color"
//             value={formData.color}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Price (₹):</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="formGroup">
//           <label>Top Category:</label>
//           <select
//             name="topCategory"
//             value={formData.topCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="men">Men</option>
//             <option value="women">Women</option>
//           </select>
//         </div>
//         <div className="formGroup">
//           <label>Sub Category:</label>
//           <select
//             name="subCategory"
//             value={formData.subCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select Sub Category
//             </option>
//             {formData.topCategory === "men" ? (
//               <>
//                 <option value="formals">Formals</option>
//                 <option value="casuals">Casuals</option>
//                 <option value="boots">Boots</option>
//                 <option value="sandals/flipflops">Sandals/Flipflops</option>
//                 <option value="sportswear">Sportswear</option>
//                 <option value="ethnic footwears">Ethnic Footwears</option>
//               </>
//             ) : (
//               <>
//                 <option value="heels">Heels</option>
//                 <option value="flats">Flats</option>
//                 <option value="casualshoes">Casual Shoes</option>
//                 <option value="sportsshoes">Sports Shoes</option>
//                 <option value="ethnic footwear">Ethnic Footwear</option>
//                 <option value="boots">Boots</option>
//               </>
//             )}
//           </select>
//         </div>
//         <button type="submit" className="submitButton">
//           Add Product
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./AddProduct.css"; // Add CSS for styling if needed

// const AddProduct = () => {
//   const [formData, setFormData] = useState({
//     image: "",
//     brand: "",
//     title: "",
//     totalQuantity: null,
//     sizeQuantities: {
//       "6": null,
//       "7": null,
//       "8": null,
//       "9": null,
//       "10": null,
//       "11": null,
//     },
//     color: "",
//     price: null,
//     description: "",
//     topCategory: "men",
//     subCategory: "",
//   });

//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");

//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (location.state?.product) {
//       const { product } = location.state;
//       setFormData({
//         image: product.image || "",
//         brand: product.brand,
//         title: product.title,
//         totalQuantity: product.totalQuantity,
//         sizeQuantities: product.sizeQuantities,
//         color: product.color,
//         price: product.price,
//         description: product.description,
//         topCategory: product.topCategory,
//         subCategory: product.subCategory,
//       });
//     }
//   }, [location]);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (Object.keys(formData.sizeQuantities).includes(name)) {
//       setFormData((prev) => ({
//         ...prev,
//         sizeQuantities: {
//           ...prev.sizeQuantities,
//           [name]: Number(value),
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: name === "price" || name === "totalQuantity" ? Number(value) : value,
//       }));
//     }
//   };

//   // Handle form submission (add or update)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setSuccess("");

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       if (key === "sizeQuantities") {
//         data.append(key, JSON.stringify(formData[key]));
//       } else {
//         data.append(key, formData[key]);
//       }
//     });

//     try {
//       let response;
//       if (location.state?.product) {
//         // Update product
//         response = await axios.put(
//           `http://localhost:5000/api/product/updateproduct/${location.state.product._id}`,
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         navigate("/productlist");
//         setSuccess("Product updated successfully!");
//       } else {
//         // Add new product
//         response = await axios.post(
//           "http://localhost:5000/api/product/addproduct",
//           data,
//           { headers: { "Content-Type": "multipart/form-data" } }
//         );
//         setSuccess("Product added successfully!");
//       }

//       // Reset form after successful operation
//       setFormData({
//         image: "",
//         brand: "",
//         title: "",
//         totalQuantity: null,
//         sizeQuantities: {
//           "6": null,
//           "7": null,
//           "8": null,
//           "9": null,
//           "10": null,
//           "11": null,
//         },
//         color: "",
//         price: null,
//         description: "",
//         topCategory: "men",
//         subCategory: "",
//       });

//  // Navigate to home page or product list
//     } catch (error) {
//       console.error("Error:", error);
//       setError("Failed to save product. Please try again.");
//     }
//   };

//   return (
//     <div className="addproduct">
//       <h2>{location.state?.product ? "Edit Product" : "Add Product"}</h2>
//       {error && <p className="errorMessage">{error}</p>}
//       {success && <p className="successMessage">{success}</p>}
//       <form onSubmit={handleSubmit}>
//         <div className="formGroup">
//           <label>Image:</label>
//           <input
//             type="file"
//             name="image"
//             onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
//           />
//           <p>Or</p>
//           <label>Image URL:</label>
//           <input
//             type="text"
//             name="image"
//             value={formData.image}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="formGroup">
//           <label>Brand:</label>
//           <input
//             type="text"
//             name="brand"
//             value={formData.brand}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Title:</label>
//           <input
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Total Quantity:</label>
//           <input
//             type="number"
//             name="totalQuantity"
//             value={formData.totalQuantity}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Size Quantities:</label>
//           {Object.keys(formData.sizeQuantities).map((size) => (
//             <div key={size}>
//               <label>Size {size}:</label>
//               <input
//                 type="number"
//                 name={size}
//                 value={formData.sizeQuantities[size]}
//                 onChange={handleChange}
//               />
//             </div>
//           ))}
//         </div>
//         <div className="formGroup">
//           <label>Color:</label>
//           <input
//             type="text"
//             name="color"
//             value={formData.color}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Price (₹):</label>
//           <input
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={handleChange}
//             required
//           />
//         </div>
//         <div className="formGroup">
//           <label>Description:</label>
//           <textarea
//             name="description"
//             value={formData.description}
//             onChange={handleChange}
//             required
//           ></textarea>
//         </div>
//         <div className="formGroup">
//           <label>Top Category:</label>
//           <select
//             name="topCategory"
//             value={formData.topCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="men">Men</option>
//             <option value="women">Women</option>
//           </select>
//         </div>
//         <div className="formGroup">
//           <label>Sub Category:</label>
//           <select
//             name="subCategory"
//             value={formData.subCategory}
//             onChange={handleChange}
//             required
//           >
//             <option value="" disabled>
//               Select Sub Category
//             </option>
//             {formData.topCategory === "men" ? (
//               <>
//                 <option value="formals">Formals</option>
//                 <option value="casuals">Casuals</option>
//                 <option value="boots">Boots</option>
//                 <option value="sandals/flipflops">Sandals/Flipflops</option>
//                 <option value="sportswear">Sportswear</option>
//                 <option value="ethnic footwears">Ethnic Footwears</option>
//               </>
//             ) : (
//               <>
//                 <option value="heels">Heels</option>
//                 <option value="flats">Flats</option>
//                 <option value="casualshoes">Casual Shoes</option>
//                 <option value="sportsshoes">Sports Shoes</option>
//                 <option value="ethnic footwear">Ethnic Footwear</option>
//                 <option value="boots">Boots</option>
//               </>
//             )}
//           </select>
//         </div>
//         <button type="submit" className="submitButton">
//           {location.state?.product ? "Update Product" : "Add Product"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddProduct;


import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./AddProduct.css"; // Add CSS for styling if needed

const AddProduct = () => {
  const [formData, setFormData] = useState({
    image: "",
    brand: "",
    title: "",
    totalQuantity: 0,  
    sizeQuantities: {
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0,
      "11": 0,
    },
    color: "",
    price: null,
    description: "",
    topCategory: "men",
    subCategory: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [remainingQuantity, setRemainingQuantity] = useState(formData.totalQuantity);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.product) {
      const { product } = location.state;
      setFormData({
        image: product.image || "",
        brand: product.brand,
        title: product.title,
        totalQuantity: product.totalQuantity,
        sizeQuantities: product.sizeQuantities,
        color: product.color,
        price: product.price,
        description: product.description,
        topCategory: product.topCategory,
        subCategory: product.subCategory,
      });
      setRemainingQuantity(product.totalQuantity - Object.values(product.sizeQuantities).reduce((acc, curr) => acc + curr, 0));
    }
  }, [location]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (Object.keys(formData.sizeQuantities).includes(name)) {
      const addedQuantity = Number(value);

      // Calculate remaining quantity based on size quantities
      const newRemainingQuantity = formData.totalQuantity - (Object.values(formData.sizeQuantities).reduce((acc, curr) => acc + curr, 0) - formData.sizeQuantities[name]) - addedQuantity;

      if (newRemainingQuantity < 0) {
        setError("Remaining quantity is 0. Cannot add more.");
        return;
      }

      setRemainingQuantity(newRemainingQuantity);

      setFormData((prev) => ({
        ...prev,
        sizeQuantities: {
          ...prev.sizeQuantities,
          [name]: addedQuantity,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === "price" || name === "totalQuantity" ? Number(value) : value,
      }));
    }
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "sizeQuantities") {
        data.append(key, JSON.stringify(formData[key]));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      let response;
      if (location.state?.product) {
        // Update product
        response = await axios.put(
          `http://localhost:5000/api/product/updateproduct/${location.state.product._id}`,
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        navigate("/productlist");
        setSuccess("Product updated successfully!");
      } else {
        // Add new product
        response = await axios.post(
          "http://localhost:5000/api/product/addproduct",
          data,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setSuccess("Product added successfully!");
      }

      // Reset form after successful operation
      setFormData({
        image: "",
        brand: "",
        title: "",
        totalQuantity: null,
        sizeQuantities: {
          "6": null,
          "7": null,
          "8": null,
          "9": null,
          "10": null,
          "11": null,
        },
        color: "",
        price: null,
        description: "",
        topCategory: "men",
        subCategory: "",
      });
      setRemainingQuantity(formData.totalQuantity); // Reset remaining quantity after successful submission

    } catch (error) {
      console.error("Error:", error);
      setError("Failed to save product. Please try again.");
    }
  };

  return (
    <div className="addproduct">
      <h2>{location.state?.product ? "Edit Product" : "Add Product"}</h2>
      {error && <p className="errorMessage">{error}</p>}
      {success && <p className="successMessage">{success}</p>}
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label>Image:</label>
          <input
            type="file"
            name="image"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          <p>Or</p>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup">
          <label>Brand:</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Total Quantity:</label>
          <input
            type="number"
            name="totalQuantity"
            value={formData.totalQuantity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Size Quantities:</label>
          {Object.keys(formData.sizeQuantities).map((size) => (
            <div key={size}>
              <label>Size {size}:</label>
              <input
                type="number"
                name={size}
                value={formData.sizeQuantities[size]}
                onChange={handleChange}
              />
            </div>
          ))}
        </div>
        <p>Remaining Quantity: {remainingQuantity}</p>
        <div className="formGroup">
          <label>Color:</label>
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Price (₹):</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="formGroup">
          <label>Top Category:</label>
          <select
            name="topCategory"
            value={formData.topCategory}
            onChange={handleChange}
            required
          >
            <option value="men">Men</option>
            <option value="women">Women</option>
          </select>
        </div>
        <div className="formGroup">
          <label>Sub Category:</label>
          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Sub Category
            </option>
            {formData.topCategory === "men" ? (
              <>
                <option value="formals">Formals</option>
                <option value="casuals">Casuals</option>
                <option value="boots">Boots</option>
                <option value="sandals/flipflops">Sandals/Flipflops</option>
                <option value="sportswear">Sportswear</option>
                <option value="ethnic footwears">Ethnic Footwears</option>
              </>
            ) : (
              <>
                <option value="heels">Heels</option>
                <option value="flats">Flats</option>
                <option value="casualshoes">Casual Shoes</option>
                <option value="sportsshoes">Sports Shoes</option>
                <option value="ethnic footwear">Ethnic Footwear</option>
                <option value="boots">Boots</option>
              </>
            )}
          </select>
        </div>
        <button type="submit" className="submitButton">
          {location.state?.product ? "Update Product" : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
