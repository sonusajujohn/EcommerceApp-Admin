import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductList = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState("");

  // Fetch products from the database
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/listproduct")
      .then((response) => {
        console.log("API Response:", response.data);
        setProducts(response.data);
      })
      .catch((err) => {
        setError("Failed to fetch products");
        console.error("Error fetching products:", err);
      });
  }, []);

  // Handle Add New Product
  const handleAddNew = () => {
    navigate("/addproduct");
  };

  // Handle Edit (PUT) request
  const handleEdit = (productId) => {
    const updatedProduct = {
      productName: "Updated Product Name",
      size: "Updated Sizes",
      category: "Updated Category",
      description: "Updated Description",
      price: 999,
      offerPrice: 899,
    };

    axios
      .put(`http://localhost:5000/api/product/editproduct/${productId}`, updatedProduct)
      .then((response) => {
        console.log("Product updated:", response.data);
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((err) => {
        console.error("Error updating product:", err);
      });
  };

  // Handle Delete (DELETE) request
  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:5000/api/product/deleteproduct/${productId}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => {
        console.error("Error deleting product:", err);
      });
  };

  // Define columns for the DataGrid
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 250,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="viewButton"
              onClick={() => alert(`Viewing product: ${params.row.productName}`)}
            >
              View
            </button>
            <button
              className="editButton"
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const productColumns = [
    { field: "_id", headerName: "ID", width: 100 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "size", headerName: "Size Options", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price (₹)", width: 100 },
    { field: "offerPrice", headerName: "Offer Price (₹)", width: 120 },
  ];

  return (
    <div className="productlist">
      <div className="productlistTitle">
        Product Listing Page
        <button className="addButton" onClick={handleAddNew}>
          Add Product
        </button>
      </div>
      {error && <p className="errorMessage">{error}</p>}
      <DataGrid
        className="datagrid"
        rows={products}
        columns={[...productColumns, ...actionColumn]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default ProductList;
