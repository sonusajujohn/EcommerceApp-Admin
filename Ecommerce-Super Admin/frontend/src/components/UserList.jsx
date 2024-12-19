import React, { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import "./UserList.css"; // Importing CSS file for styling
import { assets } from "../assets/assets";

const UserList = () => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john.doe@example.com", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "jane.smith@example.com", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "alice.johnson@example.com", phone: "456-789-1230" },
    { id: 4, name: "Bob Brown", email: "bob.brown@example.com", phone: "789-123-4560" },
    { id: 5, name: "Charlie Davis", email: "charlie.davis@example.com", phone: "321-654-9870" },
  ]);

  const handleEdit = (id) => {
    alert(`Edit user with ID: ${id}`);
  };

  const handleBan = (id) => {
    alert(`Ban user with ID: ${id}`);
  };

  return (
    <div className="container">
      {/* Sidebar Section */}
      <div className="sidebarpriv">
        <Sidebar />
      </div>

      {/* Main Content Section */}
      <div className="main-content">
        <h2>Users List</h2>
        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleEdit(user.id)}>
                    <img className="iconlogo" src={assets.edit} alt="" />
                  </button>
                  <button className="ban-btn" onClick={() => handleBan(user.id)}>
                  <img className="iconlogo" src={assets.del} alt="" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
