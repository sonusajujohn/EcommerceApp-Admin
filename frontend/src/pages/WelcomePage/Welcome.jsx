import React from "react";
import { useNavigate } from "react-router-dom";
import "./Welcome.css";

const Welcome = () => {
  const navigate = useNavigate();


  return (
    <div className="welcome-container">
      <video autoPlay loop muted className="background-video">
        <source src="/853958-hd_1920_1080_30fps.mp4" type="video/mp4" />
       
      </video>

      <div className="welcome-content">
        <h1>Welcome to the Admin Portal</h1>
        <div className="card-container">
          <div
            className="card"
    
          >
            {/* hello */}
            <h3>Login as Super Admin</h3>
          </div>
          <div className="card" >
            <h3>Login as Admin</h3>
          </div>
          <div
            className="card"
            onClick={()=>{navigate("/registrationform")}}
          >
            <h3>Register Admin</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
