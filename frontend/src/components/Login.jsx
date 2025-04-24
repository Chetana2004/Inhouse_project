// import React, { useState } from "react";
// import axios from "axios";
// import "./Login.css";
// import image from "../assets/image.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/auth/login", {
//         email,
//         password,
//       });
//       setMessage("Login successful!");
//       console.log(response.data);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Login failed.");
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-image">
//         <div className="image-overlay"></div>
//         <img src={image} alt="conveyor" />
//         <div className="image-content">
//           <h2>Welcome Back</h2>
//           <p>Streamline your workflow with our powerful platform</p>
//         </div>
//       </div>

//       <div className="login-container">
//         <form className="login-form" onSubmit={handleLogin}>
//           <div className="form-header">
//             <h2>Sign In</h2>
//             <p>Please enter your credentials</p>
//           </div>

//           <div className="input-group">
//             <label>Email</label>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               required
//             />
//           </div>

//           <div className="input-group">
//             <label>Password</label>
//             <input
//               type="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               required
//             />
//           </div>

//           {message && (
//             <p className={`message ${message.includes("success") ? "success" : "error"}`}>
//               {message}
//             </p>
//           )}

//           <button type="submit" className="login-button">
//             <span>Sign In</span>
//           </button>

//           <div className="form-footer">
//             <p className="register-text">
//               Not Registered? <a href="/register">Create an account</a>
//             </p>
//             <a href="/forgot-password" className="forgot-password">
//               Forgot password?
//             </a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;





















import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import image from "../assets/image.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // 👈 required for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      const userData = response.data; // 👈 assuming it contains a `role` field

      const role = userData.user?.role || "Customer"; // <-- updated
      console.log("User Role:", role);

      setMessage("Login successful!");
      console.log(userData);

      // Store user data if needed
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect based on role
      if (role === "Admin") 
      {
        navigate("/admin-dashboard");
      } 
      else if (role === "Sales Manager") 
      {
        navigate("/sales-dashboard");
      } 
      else if (role === "Production Manager") 
      {
          navigate("/production-dashboard");
      }
      else if (role === "HR Manager") 
      {
          navigate("/hr-dashboard");
      }  
      else if (role === "Finance Manager") 
      {
          navigate("/finance-dashboard");
      } 
      else if (role === "Inventory Manager") 
      {
          navigate("/inventory-dashboard");
      } 
      else if (role === "Customer") 
      {
          navigate("/customer-dashboard");
      }
      else
      {
        navigate("/customer-dashboard");
      } 
    } 
    catch (error) 
    {
      setMessage(error.response?.data?.message || "Login failed.");
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-image">
        <div className="image-overlay"></div>
        <img src={image} alt="conveyor" />
        <div className="image-content">
          <h2>Welcome Back</h2>
          <p>Streamline your workflow with our powerful platform</p>
        </div>
      </div>

      <div className="login-container">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-header">
            <h2>Sign In</h2>
            <p>Please enter your credentials</p>
          </div>

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

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {message && (
            <p className={`message ${message.includes("success") ? "success" : "error"}`}>
              {message}
            </p>
          )}

          <button type="submit" className="login-button">
            <span>Sign In</span>
          </button>

          <div className="form-footer">
            <p className="register-text">
              Not Registered? <a href="/registration-form">Create an account</a>
            </p>
            <a href="/change-password" className="forgot-password">
              Forgot password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
