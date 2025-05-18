// // // Navbar.jsx (updated)
// // import React, { useState } from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import {
// //   FiUser,
// //   FiChevronDown,
// //   FiHome,
// //   FiFileText,
// //   FiDollarSign,
// // } from "react-icons/fi";

// // const Navbar = () => {
// //   const navigate = useNavigate();
// //   const location = useLocation();
// //   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

// //   const getActiveModule = () => {
// //     if (location.pathname === "/") return "dashboard";
// //     if (location.pathname.includes("quotations")) return "quotations";
// //     if (location.pathname.includes("invoices")) return "invoices";
// //     if (location.pathname.includes("orders")) return "orders";
// //     return "";
// //   };

// //   const activeModule = getActiveModule();

// //   return (
// //     <nav className="top-navbar">
// //       <div className="navbar-left">
// //         <span className="erp-brand">ERP</span>
// //         <span className="module-name">Sales & Orders</span>
// //       </div>

// //       <div className="navbar-center">
// //         <button
// //           className={`nav-btn ${activeModule === "dashboard" ? "active" : ""}`}
// //           onClick={() => navigate("/sales-dashboard")}
// //           style={{ color: "white", fontSize: "15px" }}
// //         >
// //           <FiHome
// //             className="nav-icon"
// //             style={{ height: "17px", width: "17px" }}
// //           />{" "}
// //           Dashboard
// //         </button>
// //         <button
// //           className={`nav-btn ${activeModule === "orders" ? "active" : ""}`}
// //           onClick={() => navigate("/orders")}
// //           style={{ color: "white", fontSize: "15px" }}
// //         >
// //           <FiFileText
// //             className="nav-icon"
// //             style={{ height: "17px", width: "17px" }}
// //           />{" "}
// //           Orders
// //         </button>
// //         <button
// //           className={`nav-btn ${activeModule === "quotations" ? "active" : ""}`}
// //           onClick={() => navigate("/quotations")}
// //           style={{ color: "white", fontSize: "15px" }}
// //         >
// //           <FiFileText
// //             className="nav-icon"
// //             style={{ height: "17px", width: "17px" }}
// //           />{" "}
// //           Quotations
// //         </button>
// //         <button
// //           className={`nav-btn ${activeModule === "invoices" ? "active" : ""}`}
// //           onClick={() => navigate("/invoices")}
// //           style={{ color: "white", fontSize: "15px" }}
// //         >
// //           <FiDollarSign
// //             className="nav-icon"
// //             style={{ height: "17px", width: "17px" }}
// //           />{" "}
// //           Invoices
// //         </button>
// //       </div>

// //       <div className="navbar-right">
// //         <div
// //           className="profile-dropdown"
// //           onClick={() => setShowProfileDropdown(!showProfileDropdown)}
// //         >
// //           <FiUser className="profile-icon" />
// //           <span>Admin User</span>
// //           <FiChevronDown
// //             className={`dropdown-arrow ${showProfileDropdown ? "rotate" : ""}`}
// //           />

// //           {showProfileDropdown && (
// //             <div className="dropdown-menu">
// //               <div className="dropdown-item">My Profile</div>
// //               <div className="dropdown-item">Settings</div>
// //               <div className="dropdown-divider"></div>
// //               <div
// //                 className="dropdown-item"
// //                 style={{ color: "#dc3545", fontWeight: "bold" }}
// //               >
// //                 Logout
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </nav>
// //   );
// // };

// // export default Navbar;



// // DeepSeek Code
// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import {
//   FiUser,
//   FiChevronDown,
//   FiHome,
//   FiFileText,
//   FiDollarSign,
//   FiSettings,
//   FiLogOut,
//   FiHelpCircle
// } from "react-icons/fi";
// import "./Navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [showProfileDropdown, setShowProfileDropdown] = useState(false);

//   const getActiveModule = () => {
//     const path = location.pathname;
//     if (path === "/" || path.includes("dashboard")) return "dashboard";
//     if (path.includes("quotations")) return "quotations";
//     if (path.includes("invoices")) return "invoices";
//     if (path.includes("orders")) return "orders";
//     return "";
//   };

//   const activeModule = getActiveModule();

//   const handleLogout = () => {
//     // Add your logout logic here
//     console.log("User logged out");
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar-container">
//       <div className="navbar-brand">
//         <span className="erp-logo">ERP</span>
//         <span className="module-name">Sales & Orders</span>
//       </div>

//       <div className="nav-links">
//         <button
//           className={`nav-link ${activeModule === "dashboard" ? "active" : ""}`}
//           onClick={() => navigate("/sales-dashboard")}
//         >
//           <FiHome className="nav-icon" />
//           <span>Dashboard</span>
//           {activeModule === "dashboard" && <div className="active-indicator"></div>}
//         </button>
//         <button
//           className={`nav-link ${activeModule === "orders" ? "active" : ""}`}
//           onClick={() => navigate("/orders")}
//         >
//           <FiFileText className="nav-icon" />
//           <span>Orders</span>
//           {activeModule === "orders" && <div className="active-indicator"></div>}
//         </button>
//         <button
//           className={`nav-link ${activeModule === "quotations" ? "active" : ""}`}
//           onClick={() => navigate("/quotations")}
//         >
//           <FiFileText className="nav-icon" />
//           <span>Quotations</span>
//           {activeModule === "quotations" && <div className="active-indicator"></div>}
//         </button>
//         <button
//           className={`nav-link ${activeModule === "invoices" ? "active" : ""}`}
//           onClick={() => navigate("/invoices")}
//         >
//           <FiDollarSign className="nav-icon" />
//           <span>Invoices</span>
//           {activeModule === "invoices" && <div className="active-indicator"></div>}
//         </button>
//       </div>

//       <div className="user-profile">
//         <div 
//           className="profile-container"
//           onClick={() => setShowProfileDropdown(!showProfileDropdown)}
//         >
//           <div className="profile-avatar">
//             <FiUser />
//           </div>
//           <div className="profile-info">
//             <span className="profile-name">Admin User</span>
//             <span className="profile-role">Sales Manager</span>
//           </div>
//           <FiChevronDown className={`dropdown-icon ${showProfileDropdown ? "rotate" : ""}`} />

//           {showProfileDropdown && (
//             <div className="profile-dropdown">
//               <div className="dropdown-header">
//                 <div className="dropdown-avatar">
//                   <FiUser size={24} />
//                 </div>
//                 <div>
//                   <div className="dropdown-name">Admin User</div>
//                   <div className="dropdown-email">admin@erp.com</div>
//                 </div>
//               </div>
//               <div className="dropdown-divider"></div>
//               <button className="dropdown-item">
//                 <FiUser size={16} />
//                 <span>My Profile</span>
//               </button>
//               <button className="dropdown-item">
//                 <FiSettings size={16} />
//                 <span>Settings</span>
//               </button>
//               <button className="dropdown-item">
//                 <FiHelpCircle size={16} />
//                 <span>Help & Support</span>
//               </button>
//               <div className="dropdown-divider"></div>
//               <button className="dropdown-item logout" onClick={handleLogout}>
//                 <FiLogOut size={16} />
//                 <span>Sign Out</span>
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;











import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FiUser,
  FiChevronDown,
  FiHome,
  FiFileText,
  FiDollarSign,
  FiSettings,
  FiLogOut,
  FiHelpCircle,
  FiUserCheck
} from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    loading: true
  });
  const dropdownRef = useRef(null);

  // Fetch current user data from backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("/auth/me", {
          withCredentials: true // Required for cookies
        });
        
        setUser({
            name: response.data.name,
            email: response.data.email,
            role: response.data.role,
            status: response.data.status,
            loading: false
          });
      } catch (error) {
        console.error("Error fetching user data:", error);
        // Redirect to login if unauthorized
        if (error.response?.status === 401) {
          navigate("/");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getActiveModule = () => {
    const path = location.pathname;
    if (path === "/" || path.includes("dashboard")) return "dashboard";
    if (path.includes("quotations")) return "quotations";
    if (path.includes("invoices")) return "invoices";
    if (path.includes("orders")) return "orders";
    return "";
  };

  const activeModule = getActiveModule();

  const handleLogout = async () => {
    try {
      await axios.get("/api/auth/logout", {
        withCredentials: true
      });
      // Redirect to login page after successful logout
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      // Still redirect even if logout API fails
      navigate("/");
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-brand">
        <span className="erp-logo">ERP</span>
        <span className="module-name">Sales & Orders</span>
      </div>

      <div className="nav-links">
        <button
          className={`nav-link ${activeModule === "dashboard" ? "active" : ""}`}
          onClick={() => navigate("/sales-dashboard")}
        >
          <FiHome className="nav-icon" />
          <span>Dashboard</span>
          {activeModule === "dashboard" && <div className="active-indicator"></div>}
        </button>
        <button
          className={`nav-link ${activeModule === "orders" ? "active" : ""}`}
          onClick={() => navigate("/orders")}
        >
          <FiFileText className="nav-icon" />
          <span>Orders</span>
          {activeModule === "orders" && <div className="active-indicator"></div>}
        </button>
        <button
          className={`nav-link ${activeModule === "quotations" ? "active" : ""}`}
          onClick={() => navigate("/quotations")}
        >
          <FiFileText className="nav-icon" />
          <span>Quotations</span>
          {activeModule === "quotations" && <div className="active-indicator"></div>}
        </button>
        <button
          className={`nav-link ${activeModule === "invoices" ? "active" : ""}`}
          onClick={() => navigate("/invoices")}
        >
          <FiDollarSign className="nav-icon" />
          <span>Invoices</span>
          {activeModule === "invoices" && <div className="active-indicator"></div>}
        </button>
      </div>

      <div className="user-profile" ref={dropdownRef}>
        <div 
          className="profile-container"
          onClick={() => setShowProfileDropdown(!showProfileDropdown)}
        >
          <div className="profile-avatar">
            <FiUser />
          </div>
          <div className="profile-info">
            <span className="profile-name">
              {user.loading ? "Loading..." : user.role}
            </span>
            <span className="profile-email">
              {user.loading ? "loading..." : user.email}
            </span>
            {!user.loading && user.status === "Inactive" && (
              <span className="profile-status inactive">Inactive</span>
            )}
          </div>
          <FiChevronDown className={`dropdown-icon ${showProfileDropdown ? "rotate" : ""}`} />
        </div>

        {showProfileDropdown && (
          <div className="profile-dropdown-menu">
            <div className="dropdown-header">
              <div className="dropdown-avatar">
                <FiUser size={24} />
              </div>
              <div className="dropdown-user-info">
                <div className="dropdown-name">
                  {user.loading ? "Loading..." : user.name}
                  {!user.loading && user.status === "Inactive" && (
                    <span className="dropdown-status inactive"> (Inactive)</span>
                  )}
                </div>
                <div className="dropdown-email">
                  {user.loading ? "loading..." : user.email}
                </div>
                <div className="dropdown-role">
                  Role: {user.loading ? "loading..." : user.role}
                </div>
              </div>
            </div>
            
            <div className="dropdown-divider"></div>
            
            <div className="dropdown-items">
              <button className="dropdown-item">
                <FiUserCheck className="dropdown-icon" />
                <span>My Profile</span>
              </button>
              
              <button className="dropdown-item">
                <FiSettings className="dropdown-icon" />
                <span>Settings</span>
              </button>
              
              <button className="dropdown-item">
                <FiHelpCircle className="dropdown-icon" />
                <span>Help Center</span>
              </button>
              
              <div className="dropdown-divider"></div>
              
              <button 
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                <FiLogOut className="dropdown-icon" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;