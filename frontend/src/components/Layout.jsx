// // Layout.jsx
// import React from "react";
// import Navbar from "./Navbar";

// const Layout = ({ children }) => {
//   return (
//     <div className="app-container">
//       <Navbar />
//       {children}
//     </div>
//   );
// };

// export default Layout;











import React from "react";
import Navbar from "./Navbar";

// Constants at the top for easy maintenance
const NAVBAR_HEIGHT = '70px';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Navbar />
      <main style={{ paddingTop: NAVBAR_HEIGHT }}>
        {children}
      </main>
    </div>
  );
};

export default Layout;