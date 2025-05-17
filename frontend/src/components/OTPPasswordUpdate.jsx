import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./OTPPasswordUpdate.css";
import image from "../assets/image.png";

const OTPPasswordUpdate = () => {
  const [step, setStep] = useState(1); // 1: Email, 2: OTP, 3: New Password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/send-password-otp", { email });
      setMessage("OTP sent to your email");
      setStep(2);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/verify-password-otp", { email, otp });
      setMessage("OTP verified successfully");
      setStep(3);
    } catch (error) {
      setMessage(error.response?.data?.message || "Invalid OTP");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage("Passwords don't match");
      return;
    }
    setIsLoading(true);
    try {
      await axios.post("http://localhost:5000/auth/update-password-with-otp", {
        email,
        newPassword
      });
      setMessage("Password updated successfully! Redirecting to login...");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password");
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
          <h2>Secure Password Update</h2>
          <p>Protecting your Excel Conveyors account</p>
        </div>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={
          step === 1 ? handleSendOTP :
          step === 2 ? handleVerifyOTP :
          handleUpdatePassword
        }>
          <div className="form-header">
            <h2>{
              step === 1 ? "Request OTP" :
              step === 2 ? "Verify OTP" :
              "Set New Password"
            }</h2>
            <p>{
              step === 1 ? "Enter your registered email" :
              step === 2 ? "Enter the OTP sent to your email" :
              "Create a strong new password"
            }</p>
          </div>

          {step === 1 && (
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          )}

          {step === 2 && (
  <div className="step-2">
    <div className="otp-instructions">
      We've sent a 6-digit code to your email at {email}
    </div>
    
    <div className="otp-input-group">
      {[...Array(6)].map((_, i) => (
        <input
          key={i}
          type="text"
          maxLength="1"
          value={otp[i] || ''}
          onChange={(e) => {
            const newOtp = otp.split('');
            newOtp[i] = e.target.value;
            setOtp(newOtp.join(''));
            
            // Auto focus next input
            if (e.target.value && i < 5) {
              e.target.nextSibling?.focus();
            }
          }}
          onKeyDown={(e) => {
            // Handle backspace to move to previous input
            if (e.key === 'Backspace' && !otp[i] && i > 0) {
              e.target.previousSibling?.focus();
            }
          }}
          className={otp[i] ? 'filled' : ''}
        />
      ))}
    </div>
    
    <p className="otp-timer">
      Code expires in 5:00
    </p>
    
    <p className="otp-resend">
      Didn't receive code? <button 
        type="button" 
        onClick={handleSendOTP}
        className="resend-link"
      >
        Resend OTP
      </button>
    </p>
  </div>
)}

          {step === 3 && (
            <>
              <div className="input-group">
                <label>New Password</label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength="8"
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
            </>
          )}

          {message && (
            <p className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? (
              <span>Processing...</span>
            ) : (
              <span>{
                step === 1 ? "Send OTP" :
                step === 2 ? "Verify OTP" :
                "Update Password"
              }</span>
            )}
          </button>

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

export default OTPPasswordUpdate;