import "./AddProduct.css";
import { useState } from "react";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";

const AddProduct = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    productName: "",
    productNumber: "",
    category: "",
    price: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Product added successfully!");
    console.log({ ...formData, image: file });
  };
 
  
  return (
    <div className="addProduct">
      <div className="dashboard-container">
        {/* <div className="sidebar">
          <h2>Dashboard</h2>
          <ul>
            <li>Home</li>
            <li>Products</li>
            <li>Orders</li>
            <li>Settings</li>
          </ul>
        </div> */}
        <div className="main-content1">
          <h1>Add New Product</h1>
          <div className="formContainer1">
          
            <div className="imageUpload">
              <img
                src={
                  file
                    ? URL.createObjectURL(file)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt="image preview"
              />
              <label htmlFor="file">
                Upload Image <DriveFolderUploadOutlinedIcon />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>
           
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label>Product Name</label>
                <input
                  type="text"
                  name="productName"
                  placeholder="Enter product name"
                  value={formData.productName}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Product Number</label>
                <input
                  type="text"
                  name="productNumber"
                  placeholder="Enter product number"
                  value={formData.productNumber}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  placeholder="Enter category"
                  value={formData.category}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Price (₹)</label>
                <input
                  type="number"
                  name="price"
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </div>
              <div className="formInput">
                <label>Description</label>
                <textarea
                  name="description"
                  placeholder="Enter product description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button className="addbut" type="submit">Add Product</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;