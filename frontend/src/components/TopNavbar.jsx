// import React, { useState } from 'react';
// import { 
//   FiMenu, 
//   FiX, 
//   FiChevronDown,
//   FiChevronRight,
//   FiPlusCircle,
//   FiList,
//   FiTool,
//   FiTruck,
//   FiPackage,
//   FiLayers
// } from 'react-icons/fi';
// import { Link } from 'react-router-dom';
// import './TopNavbar.css';

// const TopNavbar = () => {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);

//   const navItems = [
//     {
//       name: 'Manufacturing Order',
//       icon: <FiPackage />,
//       key: 'manufacturing',
//       dropdown: [
//         { name: 'Create Manufacturing Order', path: '/manufacturing/create', icon: <FiPlusCircle /> },
//         { name: 'View All Orders', path: '/manufacturing/list', icon: <FiList /> },
//         { name: 'Unbuild Order', path: '/manufacturing/unbuild', icon: <FiTool /> },
//         { name: 'Scrap Order', path: '/manufacturing/scrap', icon: <FiTruck /> }
//       ]
//     },
//     {
//       name: 'BoM',
//       icon: <FiLayers />,
//       key: 'bom',
//       dropdown: [
//         { name: 'Create BoM', path: '/bom/create', icon: <FiPlusCircle /> },
//         { name: 'View All BoMs', path: '/bom/list', icon: <FiList /> }
//       ]
//     },
//     {
//       name: 'Routing',
//       icon: <FiTool />,
//       key: 'routing',
//       dropdown: [
//         { name: 'Create Routing', path: '/routing/create', icon: <FiPlusCircle /> },
//         { name: 'View All Routings', path: '/routing/list', icon: <FiList /> }
//       ]
//     },
//     {
//       name: 'Work Center',
//       icon: <FiTool />,
//       key: 'workcenter',
//       dropdown: [
//         { name: 'Create Work Center', path: '/workcenter/create', icon: <FiPlusCircle /> },
//         { name: 'View All Work Centers', path: '/workcenter/list', icon: <FiList /> }
//       ]
//     }
//   ];

//   const toggleDropdown = (key) => {
//     setActiveDropdown(activeDropdown === key ? null : key);
//   };

//   const toggleMobileDropdown = (key) => {
//     setMobileActiveDropdown(mobileActiveDropdown === key ? null : key);
//   };

//   return (
//     <header className="top-navbar">
//       {/* Logo */}
//       <div className="logo">
//         <Link to="/production-dashboard">
//           <span className="logo-icon">⚙️</span>
//           <h1>ProdManager</h1>
//         </Link>
//       </div>

//       {/* Mobile Menu Button */}
//       <button 
//         className="mobile-menu-button"
//         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//       >
//         {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//       </button>

//       {/* Desktop Navigation */}
//       <nav className="desktop-nav">
//         <ul className="nav-links">
//           {navItems.map((item) => (
//             <li 
//               key={item.key}
//               className={`nav-item ${activeDropdown === item.key ? 'active' : ''}`}
//               onMouseEnter={() => setActiveDropdown(item.key)}
//               onMouseLeave={() => setActiveDropdown(null)}
//             >
//               <div 
//                 className="nav-link"
//                 onClick={() => toggleDropdown(item.key)}
//               >
//                 <span className="nav-icon">{item.icon}</span>
//                 <span className="nav-text">{item.name}</span>
//                 <FiChevronDown className="dropdown-arrow" />
//               </div>
              
//               {item.dropdown && (
//                 <div className="dropdown-menu">
//                   {item.dropdown.map((subItem) => (
//                     <Link 
//                       key={subItem.path} 
//                       to={subItem.path}
//                       className="dropdown-item"
//                     >
//                       <span className="dropdown-icon">{subItem.icon}</span>
//                       <span>{subItem.name}</span>
//                     </Link>
//                   ))}
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       </nav>

//       {/* Mobile Menu */}
//       <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
//         <ul className="mobile-nav-links">
//           {navItems.map((item) => (
//             <li key={item.key}>
//               <div 
//                 className="mobile-nav-link"
//                 onClick={() => toggleMobileDropdown(item.key)}
//               >
//                 <span className="mobile-nav-icon">{item.icon}</span>
//                 <span>{item.name}</span>
//                 <FiChevronRight className={`mobile-dropdown-arrow ${mobileActiveDropdown === item.key ? 'open' : ''}`} />
//               </div>
              
//               {item.dropdown && mobileActiveDropdown === item.key && (
//                 <ul className="mobile-dropdown-menu">
//                   {item.dropdown.map((subItem) => (
//                     <li key={subItem.path}>
//                       <Link 
//                         to={subItem.path}
//                         className="mobile-dropdown-item"
//                         onClick={() => setMobileMenuOpen(false)}
//                       >
//                         <span className="mobile-dropdown-icon">{subItem.icon}</span>
//                         <span>{subItem.name}</span>
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </header>
//   );
// };

// export default TopNavbar;



















import React, { useState, useEffect, useRef } from 'react';
import { 
  FiMenu, 
  FiX, 
  FiChevronDown,
  FiChevronRight,
  FiPlusCircle,
  FiList,
  FiTool,
  FiTruck,
  FiPackage,
  FiLayers,
  FiUser,
  FiLogOut,
  FiUserCheck,
  FiSettings,
  FiHelpCircle
} from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import './TopNavbar.css';

const TopNavbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileActiveDropdown, setMobileActiveDropdown] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Production Manager',
    loading: false,
    status: 'Active'
  };

  const navItems = [
    {
      name: 'Manufacturing Order',
      icon: <FiPackage />,
      key: 'manufacturing',
      dropdown: [
        { name: 'Create Manufacturing Order', path: '/manufacturing-order/create', icon: <FiPlusCircle /> },
        { name: 'View All Orders', path: '/manufacturing-order/list', icon: <FiList /> },
        { name: 'Unbuild Order', path: '/manufacturing-order/unbuild', icon: <FiTool /> },
        { name: 'Scrap Order', path: '/manufacturing-order/scrap', icon: <FiTruck /> }
      ]
    },
    {
      name: 'BoM',
      icon: <FiLayers />,
      key: 'bom',
      dropdown: [
        { name: 'Create BoM', path: '/bom/create', icon: <FiPlusCircle /> },
        { name: 'View All BoMs', path: '/bom/list', icon: <FiList /> }
      ]
    },
    {
      name: 'Routing',
      icon: <FiTool />,
      key: 'routing',
      dropdown: [
        { name: 'Create Routing', path: '/routing/create', icon: <FiPlusCircle /> },
        { name: 'View All Routings', path: '/routing/list', icon: <FiList /> }
      ]
    },
    {
      name: 'Work Center',
      icon: <FiTool />,
      key: 'workcenter',
      dropdown: [
        { name: 'Create Work Center', path: '/workcenter/create', icon: <FiPlusCircle /> },
        { name: 'View All Work Centers', path: '/workcenter/list', icon: <FiList /> }
      ]
    }
  ];

  const toggleDropdown = (key) => {
    setActiveDropdown(prev => (prev === key ? null : key));
    setShowProfileDropdown(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    setShowProfileDropdown(false);
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setActiveDropdown(null);
        setShowProfileDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="top-navbar" ref={dropdownRef}>
      <div className="logo">
        <Link to="/production-dashboard">
          <span className="logo-icon">⚙️</span>
          <h1>ProdManager</h1>
        </Link>
      </div>

      <button 
        className="mobile-menu-button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
      >
        {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <ul className="nav-links">
          {navItems.map((item) => (
            <li 
              key={item.key}
              className={`nav-item ${activeDropdown === item.key ? 'active' : ''}`}
            >
              <div 
                className="nav-link"
                onClick={() => toggleDropdown(item.key)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.name}</span>
                <FiChevronDown className="dropdown-arrow" />
              </div>
              
              {item.dropdown && activeDropdown === item.key && (
                <div className="dropdown-menu">
                  {item.dropdown.map((subItem) => (
                    <Link 
                      key={subItem.path} 
                      to={subItem.path}
                      className="dropdown-item"
                    >
                      <span className="dropdown-icon">{subItem.icon}</span>
                      <span>{subItem.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}

          {/* Profile Dropdown */}
          <li className="nav-item user-profile">
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
                    <div className="dropdown-email">{user.email}</div>
                    <div className="dropdown-role">Role: {user.role}</div>
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
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default TopNavbar;
