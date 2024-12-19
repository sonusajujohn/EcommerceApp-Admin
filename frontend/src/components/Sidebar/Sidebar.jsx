// Sidebar.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Inventory as InventoryIcon,
  Category as CategoryIcon,
  ShoppingCart as ShoppingCartIcon,
  People as PeopleIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import "./Sidebar.css"; // Create a separate CSS file for Sidebar styles

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <h2 className="sidebar-title" onClick={() => navigate("/admindashboard")}>ADMIN</h2>
      <ul className="sidebar-menu">
        <li className="sidebar-item" onClick={() => navigate("/admindashboard")}>
          <DashboardIcon className="sidebar-icon" /> Dashboard
        </li>
        <li className="sidebar-item" onClick={() => navigate("/productlist")}>
          <InventoryIcon className="sidebar-icon" /> Product Management
        </li>
        {/* <li className="sidebar-item" onClick={() => navigate("/categorymanagement")}>
          <CategoryIcon className="sidebar-icon" /> Category Management
        </li> */}
        <li className="sidebar-item" onClick={() => navigate("/orders")}>
          <ShoppingCartIcon className="sidebar-icon" /> Order Management
        </li>
        <li className="sidebar-item" onClick={() => navigate("/users")}>
          <PeopleIcon className="sidebar-icon" /> User Management
        </li>
        <li className="sidebar-item" onClick={() => navigate("/")}>
          <LogoutIcon className="sidebar-icon" /> Logout
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;