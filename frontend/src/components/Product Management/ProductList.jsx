import "./ProductList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "../../pages/AdminDashboard/Admindashboard";

const ProductList = () => {
  const navigate = useNavigate();

  // Navigate to the Add Product page
  const handleAddNew = () => {
    navigate("/addproduct");
  };

  // State for managing the product list
  const [data, setData] = useState([
    {
      id: 1,
      productName: "Running Shoes",
      size: "7, 8, 9, 10",
      category: "Sports",
      description: "Comfortable and durable running shoes.",
      price: 1200,
      offerPrice: 999,
    },
    {
      id: 2,
      productName: "Formal Shoes",
      size: "6, 7, 8, 9",
      category: "Formal",
      description: "Elegant leather formal shoes.",
      price: 2500,
      offerPrice: 1999,
    },
    {
      id: 3,
      productName: "Flip Flops",
      size: "5, 6, 7, 8",
      category: "Casual",
      description: "Lightweight and stylish flip flops.",
      price: 500,
      offerPrice: 399,
    },
  ]);

  // Function to handle deletion of a product
  const handleDelete = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  // Column definitions for the data grid
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <button
              className="viewButton"
              onClick={() =>
                alert(`Viewing product: ${params.row.productName}`)
              }
            >
              View
            </button>
            <button
              className="deleteButton"
              onClick={() => handleDelete(params.row.id)}
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  // Product data columns
  const productColumns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "productName", headerName: "Product Name", width: 200 },
    { field: "size", headerName: "Size Options", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "description", headerName: "Description", width: 300 },
    { field: "price", headerName: "Price (₹)", width: 100 },
  ];

  return (
    <>
    <AdminDashboard/>
    <div className="productlist">
      <div className="productlistTitle">
        Product Listing Page
        <button className="link" onClick={handleAddNew}>
          Add New
        </button>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={[...productColumns, ...actionColumn]}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
    </>
  );
};

export default ProductList;