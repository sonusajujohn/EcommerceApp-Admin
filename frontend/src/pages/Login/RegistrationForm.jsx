import React, { useState } from "react";
import "./RegistrationForm.css";
import {
  Person,
  Email,
  Phone,
  Home,
  LocationOn,
  Badge,
  Business,
  Password,
  Visibility,
  VisibilityOff,
  Lock,
} from "@mui/icons-material";

const RegistrationForm = () => {
  const [action, setAction] = useState("Register Admin");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword(!showConfirmPassword);

  return (
    <div>
      
      {/* <nav className="navbar">
        <div className="navbar-brand">Admin Portal</div>
        <div className="navbar-links">
          <button onClick={() => setAction("Register Admin")}>
            Register Admin
          </button>
          <button onClick={() => setAction("Admin Login")}>Admin Login</button>
          <button onClick={() => setAction("Super Admin Login")}>
            Super Admin Login
          </button>
        </div>
      </nav> */}

      
      <div className="container1">
        <div className="header">
          <div className="text">{action}</div>
          <div className="underline"></div>
        </div>
        {action === "Register Admin" && (
          <div className="inputs">
            <div className="input">
              <Person className="icon" />
              <input type="text" placeholder="Name" />
            </div>
            <div className="input">
              <Email className="icon" />
              <input type="email" placeholder="Email Id" />
            </div>
            <div className="input">
              <Phone className="icon" />
              <input type="number" placeholder="Phone Number" />
            </div>
            <div className="input">
              <Home className="icon" />
              <input type="text" placeholder="Address" />
            </div>
            <div className="input">
              <LocationOn className="icon" />
              <input type="text" placeholder="Pin Code" />
            </div>
            <div className="input">
              <Badge className="icon" />
              <input type="text" placeholder="Government ID" />
            </div>
            <div className="input">
              <Business className="icon" />
              <input type="file" placeholder="Business License" />
            </div>
            <div className="input">
              <Business className="icon" />
              <input type="number" placeholder="GST Number" />
            </div>
            <div className="input password">
            <Lock className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
            <div className="input password">
            <Lock className="icon" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
              />
              <span
                className="eye-icon"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>
        )}
        {action === "Admin Login" && (
          <div className="inputs">
            <div className="input">
              <Email className="icon" />
              <input type="email" placeholder="Email Id" />
            </div>
            <div className="input password">
              <Password className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>
        )}
        {action === "Super Admin Login" && (
          <div className="inputs">
            <div className="input">
              <Email className="icon" />
              <input type="email" placeholder="Super Admin Email" />
            </div>
            <div className="input password">
              <Password className="icon" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Super Admin Password"
              />
              <span className="eye-icon" onClick={togglePasswordVisibility}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </span>
            </div>
          </div>
        )}
        <div className="forgot-password">
          {action !== "Register Admin" && (
            <span>Lost Password? Click here</span>
          )}
        </div>
        <div className="submit-container">
          <button className="submit">
            {action === "Register Admin"
              ? "Register"
              : action === "Admin Login"
              ? "Login"
              : "Super Admin Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
