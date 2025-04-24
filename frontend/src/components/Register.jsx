import React from "react";
import "./Register.css";
import registerImage from "../assets/image.png"; // Update with your image path

const Register = () => {
  return (
    <div className="register-container">
      <div className="image-section">
        <img src={registerImage} alt="Registration" className="register-image" />
      </div>
      
      <div className="form-section">
        <div className="register-card">
          <h1 className="register-title">Register</h1>
          
          <div className="register-form">
            <div className="form-group">
              <label>Name</label>
              <input type="text" placeholder="Enter Name" />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="Enter Email" />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select>
                  <option>Select Department</option>
                  <option>Sales</option>
                  <option>Warehouse</option>
                  <option>HR</option>
                </select>
              </div>
              <div className="form-group">
                <label>Role</label>
                <select>
                  <option>Select Role</option>
                  <option>Manager</option>
                  <option>Employee</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Username</label>
              <input type="text" placeholder="Enter Username" />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter Password" />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input type="password" placeholder="Enter Password" />
            </div>

            <button className="register-button">Register</button>
          </div>

          <p className="login-link">
            Already have an account? <a href="#">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;