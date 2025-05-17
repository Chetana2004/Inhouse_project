// import React from "react";
// import "./Register.css";
// import registerImage from "../assets/image.png"; // Update with your image path

// const Register = () => {
//   return (
//     <div className="register-container">
//       <div className="image-section">
//         <img src={registerImage} alt="Registration" className="register-image" />
//       </div>
      
//       <div className="form-section">
//         <div className="register-card">
//           <h1 className="register-title">Register</h1>
          
//           <div className="register-form">
//             <div className="form-group">
//               <label>Name</label>
//               <input type="text" placeholder="Enter Name" />
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input type="email" placeholder="Enter Email" />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Department</label>
//                 <select>
//                   <option>Select Department</option>
//                   <option>Sales</option>
//                   <option>Warehouse</option>
//                   <option>HR</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Role</label>
//                 <select>
//                   <option>Select Role</option>
//                   <option>Manager</option>
//                   <option>Employee</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Username</label>
//               <input type="text" placeholder="Enter Username" />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input type="password" placeholder="Enter Password" />
//             </div>

//             <div className="form-group">
//               <label>Confirm Password</label>
//               <input type="password" placeholder="Enter Password" />
//             </div>

//             <button className="register-button">Register</button>
//           </div>

//           <p className="login-link">
//             Already have an account? <a href="#">Sign in</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;



























import React, { useState } from "react";
import "./Register.css";
import registerImage from "../assets/image.png";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    role: "",
    username: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const departments = ["Select Department", "Sales", "Warehouse", "HR", "Finance", "Operations"];
  const roles = ["Select Role", "Manager", "Employee", "Admin", "Supervisor"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }

    // Check password strength
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    
    // Length check
    if (password.length >= 8) strength += 1;
    if (password.length >= 12) strength += 1;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    
    setPasswordStrength(Math.min(strength, 5));
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (formData.department === "" || formData.department === "Select Department") {
      newErrors.department = "Please select a department";
    }
    if (formData.role === "" || formData.role === "Select Role") {
      newErrors.role = "Please select a role";
    }
    if (!formData.username.trim()) newErrors.username = "Username is required";
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Form is valid, proceed with registration
      console.log("Form submitted:", formData);
      // Add your registration logic here
    }
  };

  const getPasswordStrengthColor = () => {
    const colors = ["#ff0000", "#ff5e00", "#ffbb00", "#aaff00", "#00ff00"];
    return colors[passwordStrength - 1] || "#cccccc";
  };

  return (
    <div className="register-container">
      <div className="image-section">
        <div className="image-overlay"></div>
        <img src={registerImage} alt="Registration" className="register-image" />
        <div className="image-content">
          <h2>Join Our Team</h2>
          <p>Become part of Excel Conveyors family</p>
        </div>
      </div>
      
      <div className="form-section">
        <div className="register-card">
          <h1 className="register-title">Create Account</h1>
          
          <form className="register-form" onSubmit={handleSubmit}>
            <div className={`form-group ${formData.name ? 'filled' : ''} ${errors.name ? 'error' : ''}`}>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <label>Full Name</label>
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>

            <div className={`form-group ${formData.email ? 'filled' : ''} ${errors.email ? 'error' : ''}`}>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <label>Email Address</label>
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-row">
              <div className={`form-group select-group ${formData.department ? 'filled' : ''} ${errors.department ? 'error' : ''}`}>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  required
                >
                  {departments.map((dept, index) => (
                    <option key={index} value={dept === "Select Department" ? "" : dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <label>Department</label>
                {errors.department && <span className="error-message">{errors.department}</span>}
              </div>
              
              <div className={`form-group select-group ${formData.role ? 'filled' : ''} ${errors.role ? 'error' : ''}`}>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  {roles.map((role, index) => (
                    <option key={index} value={role === "Select Role" ? "" : role}>
                      {role}
                    </option>
                  ))}
                </select>
                <label>Role</label>
                {errors.role && <span className="error-message">{errors.role}</span>}
              </div>
            </div>

            <div className={`form-group ${formData.username ? 'filled' : ''} ${errors.username ? 'error' : ''}`}>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
              <label>Username</label>
              {errors.username && <span className="error-message">{errors.username}</span>}
            </div>

            <div className={`form-group ${formData.password ? 'filled' : ''} ${errors.password ? 'error' : ''}`}>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <label>Password</label>
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
              {errors.password && <span className="error-message">{errors.password}</span>}
              
              {formData.password && (
                <div className="password-strength">
                  <div className="strength-meter">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div 
                        key={i}
                        className="strength-bar"
                        style={{
                          backgroundColor: i <= passwordStrength ? getPasswordStrengthColor() : "#eeeeee"
                        }}
                      ></div>
                    ))}
                  </div>
                  <div className="strength-text">
                    Strength: {["Very Weak", "Weak", "Fair", "Good", "Strong"][passwordStrength - 1] || "None"}
                  </div>
                </div>
              )}
            </div>

            <div className={`form-group ${formData.confirmPassword ? 'filled' : ''} ${errors.confirmPassword ? 'error' : ''}`}>
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
              <label>Confirm Password</label>
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
            </div>

            <button type="submit" className="register-button">
              Register Now
            </button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;





