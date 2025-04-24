import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "./ChangePassword.css"; // Reusing the same CSS as login
import image from "../assets/image.png";

const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [email, setEmail] = useState("");
  const { token } = useParams();
  const navigate = useNavigate();

  // Verify token on component mount
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `https://inhouse-project-3.onrender.com/auth/verify-reset-token/${token}`
        );
        setEmail(response.data.email);
        setIsValidToken(true);
      } catch (error) {
        setMessage("Invalid or expired token. Please request a new password reset link.");
        setIsValidToken(false);
      }
    };

    verifyToken();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setMessage("");

    try {
      await axios.post("https://inhouse-project-3.onrender.com/auth/reset-password", {
        token,
        newPassword: password
      });

      setMessage("Password changed successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to change password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image">
        <div className="image-overlay"></div>
        <img src={image} alt="conveyor" />
        <div className="image-content">
          <h2>Excel Conveyors</h2>
          <p>Your Trusted Partner in Conveyor Solutions</p>
        </div>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-header">
            <h2>Change Password</h2>
            <p>For: {email}</p>
          </div>

          {!isValidToken ? (
            <div className="invalid-token-message">
              <p className="message error">{message}</p>
              <button 
                type="button" 
                className="login-button secondary"
                onClick={() => navigate("/forgot-password")}
              >
                <span>Request New Reset Link</span>
              </button>
            </div>
          ) : (
            <>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="6"
                />
              </div>

              <div className="input-group">
                <label>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <p className={`message ${message.includes("success") ? "success" : "error"}`}>
                  {message}
                </p>
              )}

              <button 
                type="submit" 
                className="login-button"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span>Updating...</span>
                ) : (
                  <span>Change Password</span>
                )}
              </button>
            </>
          )}

          <div className="form-footer">
            <p className="register-text">
              Remember your password? <a href="/">Sign in</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;