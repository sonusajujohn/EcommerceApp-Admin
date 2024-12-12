// import "./ProductList.css";
// import { DataGrid } from "@mui/x-data-grid";
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AdminDashboard from "../../pages/AdminDashboard/Admindashboard";

// const ProductList = () => {
//   const navigate = useNavigate();

//   // Navigate to the Add Product page
//   const handleAddNew = () => {
//     navigate("/addproduct");
//   };

//   // State for managing the product list
//   const [data, setData] = useState([
//     {
//       id: 1,
//       productName: "Running Shoes",
//       size: "7, 8, 9, 10",
//       category: "Sports",
//       description: "Comfortable and durable running shoes.",
//       price: 1200,
//       offerPrice: 999,
//     },
//     {
//       id: 2,
//       productName: "Formal Shoes",
//       size: "6, 7, 8, 9",
//       category: "Formal",
//       description: "Elegant leather formal shoes.",
//       price: 2500,
//       offerPrice: 1999,
//     },
//     {
//       id: 3,
//       productName: "Flip Flops",
//       size: "5, 6, 7, 8",
//       category: "Casual",
//       description: "Lightweight and stylish flip flops.",
//       price: 500,
//       offerPrice: 399,
//     },
//   ]);

//   // Function to handle deletion of a product
//   const handleDelete = (id) => {
//     setData((prevData) => prevData.filter((item) => item.id !== id));
//   };

//   // Column definitions for the data grid
//   const actionColumn = [
//     {
//       field: "action",
//       headerName: "Action",
//       width: 200,
//       renderCell: (params) => {
//         return (
//           <div className="cellAction">
//             <button
//               className="viewButton"
//               onClick={() =>
//                 alert(`Viewing product: ${params.row.productName}`)
//               }
//             >
//               View
//             </button>
//             <button
//               className="deleteButton"
//               onClick={() => handleDelete(params.row.id)}
//             >
//               Delete
//             </button>
//           </div>
//         );
//       },
//     },
//   ];

//   // Product data columns
//   const productColumns = [
//     { field: "id", headerName: "ID", width: 70 },
//     { field: "productName", headerName: "Product Name", width: 200 },
//     { field: "size", headerName: "Size Options", width: 150 },
//     { field: "category", headerName: "Category", width: 150 },
//     { field: "description", headerName: "Description", width: 300 },
//     { field: "price", headerName: "Price (₹)", width: 100 },
//   ];

//   return (
//     <>
//     <div className="productlist">
//       <div className="productlistTitle">
//         Product Listing Page
//         <button className="link" onClick={handleAddNew}>
//           Add New
//         </button>
//       </div>
//       <DataGrid
//         className="datagrid"
//         rows={data}
//         columns={[...productColumns, ...actionColumn]}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />
//     </div>
//     </>
//   );
// };

// export default ProductList;




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/product/listproduct')
      .then((response) => {
        console.log('API Response:', response.data);
        setProducts(response.data);  // Directly set response.data as products
      })
      .catch((err) => {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      });
  }, []);

  // Handle Edit (PUT) request
  const handleEdit = (productId) => {
    const updatedProduct = {
      productName: 'New Product Name',
      productNumber: 'New Product Number',
      category: 'New Category',
      price: 2500,
    };

    axios
      .put(`http://localhost:5000/api/product/editproduct/${productId}`, updatedProduct)     
      .then((response) => {
        console.log('Product updated:', response.data);
        // Update the product list in the state after successful update
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === productId ? { ...product, ...updatedProduct } : product
          )
        );
      })
      .catch((err) => {
        console.error('Error updating product:', err);
      });
  };

  // Handle Delete (DELETE) request
  const handleDelete = (productId) => {
    axios 
      .delete(`http://localhost:5000/api/product/deleteproduct/${productId}`)
      .then((response) => {
        console.log('Product deleted:', response.data);
        window.location.reload();
        // Remove the deleted product from the list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((err) => {
        console.error('Error deleting product:', err);
      });
  };

  return (
    <div className="product-list">
      {error && <p>{error}</p>}
      {products.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Product Name</th>
              <th>Product Number</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.productName}</td>
                <td>{product.productNumber}</td>
                <td>{product.category}</td>
                <td>{product.price}</td>
                <td>
                  <button onClick={() => handleEdit(product._id)}>Edit</button>
                  <button onClick={() => handleDelete(product._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default ProductList;
