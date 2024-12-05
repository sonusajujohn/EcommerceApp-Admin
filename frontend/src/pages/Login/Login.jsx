import React, { useState } from "react";
import "./Login.css";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material";
import { Navigate, useNavigate } from "react-router-dom";


const InputField = ({
  type,
  icon: Icon,
  placeholder,
  ariaLabel,
  value,
  onChange,
  toggleVisibility,
}) => (

  
  <div className="inputField">
    {Icon && <Icon className="inputIcon" />}
    <label htmlFor={type} className="visuallyHidden">
      {ariaLabel}
    </label>
    <input
      type={type}
      id={type}
      className="input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
    />
    {toggleVisibility && (
      <span
        className="visibilityToggle"
        onClick={toggleVisibility.onClick}
        role="button"
        tabIndex="0"
      >
        {toggleVisibility.visible ? <VisibilityOff /> : <Visibility />}
      </span>
    )}
  </div>
);

export default function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
  
    // Hardcoded credentials for demonstration
    const adminEmail = "admin@gmail.com";
    const adminPassword = "12345";
  
    if (email === adminEmail && password === adminPassword) {
      alert("Login successful!");
      navigate('/admindashboard');
    } else {
      alert("Invalid credentials. Please try again.");
    }
  };
  

  

  return (
    <main className="loginContainer">
      <form className="formContainer" onSubmit={handleLogin}>
        <h1 className="welcomeTitle">Admin Login</h1>
        

        <InputField
          type="email"
          icon={Email}
          placeholder="Enter your email"
          ariaLabel="Email input field"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type={showPassword ? "text" : "password"}
          icon={Lock}
          placeholder="Enter your password"
          ariaLabel="Password input field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          toggleVisibility={{
            visible: showPassword,
            onClick: () => setShowPassword((prev) => !prev),
          }}
        />

        <button type="submit" className="submitButton">
          Login
        </button>
      </form>
    </main>
  );
}
