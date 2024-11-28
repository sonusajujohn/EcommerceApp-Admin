import React from "react";
import "./Admindashboard.css";

const AdminDashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Admin Dashboard</h2>
        <ul>
          <li>Product Management</li>
          <li>Category Management</li>
          <li>Order Details</li>
          <li>Settings</li>
          <li>Logout</li>
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
