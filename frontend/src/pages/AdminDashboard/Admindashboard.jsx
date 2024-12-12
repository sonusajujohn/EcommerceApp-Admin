import React from "react";
import "./Admindashboard.css";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li onClick={()=>{navigate('/productlist')}}>Product List</li>
          <li onClick={()=>{navigate('/categorymanagement')}}>Category Management</li>
          <li>Order Details</li>
          <li>Settings</li>
          <li onClick={()=>{navigate('/')}}>Logout</li>
        </ul>
      </div>
      <div className="main-content">
        <h1>Welcome, Admin!</h1>
        <p>Select an option from the menu to manage your dashboard.</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
