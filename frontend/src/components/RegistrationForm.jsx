// Correct Code

// import React, { useState } from "react";
// import axios from "axios";
// import "./RegistrationForm.css";
// import image from "../assets/image.png";

// const RegistrationForm = () => {
//   const [name, setName] = useState("");
//   const [department, setDepartment] = useState("");
//   const [role, setRole] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [message, setMessage] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setMessage("Passwords do not match.");
//       return;
//     }

//     try {
//       const response = await axios.post("https://inhouse-project.onrender.com/auth/register", {
//         name,
//         email,
//         password, // or just `password` depending on your backend
//         role,
//       });
//       setMessage("Registration successful!");
//       console.log(response.data);
//     } catch (error) {
//       setMessage(error.response?.data?.message || "Registration failed.");
//     }
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-image">
//         <div className="image-overlay"></div>
//         <img src={image} alt="conveyor" />
//         <div className="image-content">
//           <h2>Excel Conveyors</h2>
//           <p>Streamline your workflow with our powerful platform</p>
//         </div>
//       </div>

//       <div className="form-section">
//         <div className="register-card">
//           <h1 className="register-title">Register</h1>
//           {message && <p className="message">{message}</p>}
//           <form className="register-form" onSubmit={handleRegister}>
//             <div className="form-group">
//               <label>Name</label>
//               <input
//                 type="text"
//                 placeholder="Enter Name"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//               />
//             </div>

//             <div className="form-row">
//               <div className="form-group">
//                 <label>Department</label>
//                 <select
//                   value={department}
//                   onChange={(e) => setDepartment(e.target.value)}
//                 >
//                   <option value="">Select Department</option>
//                   <option>Administration</option>
//                   <option>Production</option>
//                   <option>Sales</option>
//                   <option>Finance</option>
//                   <option>HR</option>
//                 </select>
//               </div>
//               <div className="form-group">
//                 <label>Role</label>
//                 <select
//                   value={role}
//                   onChange={(e) => setRole(e.target.value)}
//                 >
//                   <option value="">Select Role</option>
//                   <option>Admin</option>
//                   <option>Sales Manager</option>
//                   <option>Production Manager</option>
//                   <option>Finance Manager</option>
//                   <option>HR Manager</option>
//                   <option>Customer</option>
//                 </select>
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Email</label>
//               <input
//                 type="email"
//                 placeholder="Enter Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label>Confirm Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter Password"
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//               />
//             </div>

//             <button type="submit" className="register-button">Register</button>
//           </form>

//           <p className="login-link">
//             Already have an account? <a href="/">Sign in</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;















import React, { useState } from "react";
import axios from "axios";
import "./RegistrationForm.css";
import image from "../assets/image.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const navigate = useNavigate(); // for redirection

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post("https://inhouse-project.onrender.com/auth/register", {
        name,
        email,
        password,
        role,
        department,
      });

      toast.success("Registration successful!");

      setTimeout(() => {
        navigate("/"); // Redirect to Sign In page (update if your route is different)
      }, 2000); // 2 second delay for user to see the toast

    } catch (error) {
      const errMsg = error.response?.data?.message || "Registration failed.";
      toast.error(`Registration failed: ${errMsg}`);
    }
  };

  return (
    <div className="login-wrapper">
      <ToastContainer position="top-center" />

      <div className="login-image">
        <div className="image-overlay"></div>
        <img src={image} alt="conveyor" />
        <div className="image-content">
          <h2>Excel Conveyors</h2>
          <p>Streamline your workflow with our powerful platform</p>
        </div>
      </div>

      <div className="form-section">
        <div className="register-card">
          <h1 className="register-title">Register</h1>

          <form className="register-form" onSubmit={handleRegister}>
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="">Select Department</option>
                  <option>Administration</option>
                  <option>Production</option>
                  <option>Sales</option>
                  <option>Finance</option>
                  <option>HR</option>
                </select>
              </div>

              <div className="form-group">
                <label>Role</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option>Admin</option>
                  <option>Sales Manager</option>
                  <option>Production Manager</option>
                  <option>Finance Manager</option>
                  <option>HR Manager</option>
                  <option>Customer</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Enter Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="register-button">Register</button>
          </form>

          <p className="login-link">
            Already have an account? <a href="/">Sign in</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;







