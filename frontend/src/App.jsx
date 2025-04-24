// // Testing Code

// import React, { useEffect, useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Dashboard from './components/Dashboard';
// import OrdersInvoice from './components/OrdersInvoice';
// import CreateOrder from './components/CreateOrder';
// import ManageQuotations from './components/ManageQuotation';
// import GenerateQuotation from './components/GenerateQuotation';
// import InvoicePage from './components/InvoicePage';
// import OrderDetails from "./components/OrderDetails";
// import axios from './api/axios'; // import your Axios instance

// function App() {
//   const [orders, setOrders] = useState([]);
//   const [quotations, setQuotations] = useState([]);

//   // Fetch orders on load
//   useEffect(() => {
//     const fetchOrders = async () => {
//       try {
//         const response = await axios.get('/order/get');
//         setOrders(response.data);
//       } catch (err) {
//         console.error('Failed to fetch orders:', err);
//       }
//     };
//     fetchOrders();
//   }, []);

//   // Fetch quotations on load
//   useEffect(() => {
//     const fetchQuotations = async () => {
//       try {
//         const response = await axios.get('/quotation/get');
//         setQuotations(response.data);
//       } catch (err) {
//         console.error('Failed to fetch quotations:', err);
//       }
//     };
//     fetchQuotations();
//   }, []);

//   // Handle saving an order (POST)
//   const handleSaveOrder = async (newOrder) => {
//     try {
//       const response = await axios.post('/order/create', newOrder);
//       const savedOrder = response.data;
//       setOrders(prev => [...prev, savedOrder]);

//       // You can also auto-create a quotation here (optional backend logic)
//       const newQuotation = {
//         quotationNumber: `QT-${savedOrder.orderNumber.split('-')[1]}`,
//         date: savedOrder.date,
//         expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//         customerName: savedOrder.customerName,
//         salesperson: savedOrder.salesperson,
//         paymentTerms: savedOrder.paymentTerms,
//         products: savedOrder.products,
//         additionalNotes: savedOrder.additionalNotes
//       };

//       const quotationRes = await axios.post('/quotation/create', newQuotation);
//       setQuotations(prev => [...prev, quotationRes.data]);

//     } catch (err) {
//       console.error('Failed to save order:', err);
//     }
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout><Dashboard /></Layout>} />
//         <Route path="/orders" element={<Layout><OrdersInvoice orders={orders} setOrders={setOrders} /></Layout>} />
//         <Route path="/orders/:orderNumber" element={<Layout><OrderDetails orders={orders} /></Layout>} />
//         <Route path="/create-order" element={<Layout><CreateOrder onSave={handleSaveOrder} /></Layout>} />
//         <Route path="/quotations" element={<Layout><ManageQuotations quotations={quotations} setQuotations={setQuotations} /></Layout>} />
//         <Route path="/generate-quotation" element={<Layout><GenerateQuotation onGenerate={(newQuotation) => setQuotations([...quotations, newQuotation])} /></Layout>} />
//         <Route path="/generate-quotation/:id" element={<GenerateQuotation />} />
//         <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;














// Snehal Old Code

// import axios from "axios";
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Dashboard from './components/Dashboard';
// import OrdersInvoice from './components/OrdersInvoice';
// import CreateOrder from './components/CreateOrder';
// import ManageQuotations from './components/ManageQuotation';
// import GenerateQuotation from './components/GenerateQuotation';
// import InvoicePage from './components/InvoicePage';
// import OrderDetails from "./components/OrderDetails";

// function App() {
//   const [orders, setOrders] = useState([]);
//   const [quotations, setQuotations] = useState([]);

//   const handleSaveOrder = async (newOrder) => {
//     try {
//       // POST to backend
//       const response = await axios.post("https://inhouse-project.onrender.com/order/create", newOrder);
  
//       // Save the order returned from the backend
//       const savedOrder = response.data;
  
//       // Update local state
//       setOrders((prevOrders) => [...prevOrders, savedOrder]);
  
//       // Create and store a quotation (based on the saved order)
//       const newQuotation = {
//         id: `QT-${savedOrder.orderNumber.split("-")[1]}`,
//         customer: savedOrder.customer,
//         date: savedOrder.date,
//         expiryDate: new Date(
//           Date.now() + 30 * 24 * 60 * 60 * 1000
//         ).toISOString().split("T")[0],
//         amount: savedOrder.total,
//         status: "draft",
//         salesperson: savedOrder.salesperson,
//         paymentTerms: savedOrder.paymentTerms,
//       };
  
//       setQuotations((prev) => [...prev, newQuotation]);
  
//     } catch (error) {
//       console.error("Error saving order:", error);
//       alert("Failed to save order. Please try again.");
//     }
//   };
  
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout><Dashboard /></Layout>} />
//         <Route 
//           path="/orders" 
//           element={
//             <Layout>
//               <OrdersInvoice orders={orders} setOrders={setOrders} />
//             </Layout>
//           } 
//         />

//       <Route
//         path="/orders/:orderNumber"
//         element={<Layout><OrderDetails orders={orders} /></Layout>}
//       />
//         <Route 
//           path="/create-order" 
//           element={
//             <Layout>
//               <CreateOrder onSave={handleSaveOrder} />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/quotations" 
//           element={
//             <Layout>
//               <ManageQuotations 
//                 quotations={quotations} 
//                 setQuotations={setQuotations} 
//               />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/generate-quotation" 
//           element={
//             <Layout>
//               <GenerateQuotation 
//                 onGenerate={(newQuotation) => 
//                   setQuotations([...quotations, newQuotation])
//                 } 
//               />
//             </Layout>
//           } 
//         />
//         <Route path="/generate-quotation/:id" element={<GenerateQuotation />} />
//         <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;














// Chetana's completely working code (authentication module)

// import React, { useState } from 'react';

// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import Login from './components/Login';
// import RegistrationForm from './components/RegistrationForm';
// import AdminDashboard from './components/AdminDashboard';
// import InventoryDashboard from './components/InventoryDashboard';
// import Dashboard from './components/Dashboard';
// import HRDashboard from './components/HRDashboard';
// import FinanceDashboard from './components/FinanceDashboard';
// import CustomerDashboard from './components/CustomerDashboard';
// import ProductionDashboard from './components/ProductionDashboard';
// import OrdersInvoice from './components/OrdersInvoice';
// import CreateOrder from './components/CreateOrder';
// import ManageQuotations from './components/ManageQuotation';
// import GenerateQuotation from './components/GenerateQuotation';
// import InvoicePage from './components/InvoicePage';
// import OrderDetails from "./components/OrderDetails";
// import Layout from './components/Layout';
// import ChangePassword from './components/ChangePassword';
// import OTPPasswordUpdate from './components/OTPPasswordUpdate';
// import ManufacturingOrderUnbuild from './components/ManufacturingOrderUnbuild';
// import ManufacturingOrderScrap from './components/ManufacturingOrderScrap';
// import ManufacturingOrderCreate from './components/ManufacturingOrderCreate';
// import ManufacturingOrderList from './components/ManufacturingOrderList';
// import BomCreate from './components/BomCreate';
// import BomList from './components/BomList';
// import RoutingCreate from './components/RoutingCreate';
// import RoutingList from './components/RoutingList';
// import WorkCenterCreate from './components/WorkCenterCreate';
// import WorkCenterList from './components/WorkCenterList';
// import WorkCenterDashboard from './components/WorkCenterDashboard';
// import WorkCenterMain from './components/WorkCenterMain';
// import WorkCenterSetup from './components/WorkCenterSetup';
// import WorkCenterContainer from './components/WorkCenterContainer';
// import TopNavbar from './components/TopNavbar';

// import SalesDashboard from './components/SalesDashboard';
// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/registration-form" element={<RegistrationForm />} />
//         <Route path="/admin-dashboard" element={<AdminDashboard />} />
//         <Route path="/production-dashboard" element={<ProductionDashboard />} />
//         <Route path="/finance-dashboard" element={<FinanceDashboard />} />
//         <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
//         <Route path="/hr-dashboard" element={<HRDashboard />} />
//         <Route path="/customer-dashboard" element={<CustomerDashboard />} />
//         <Route path="/change-password" element={<OTPPasswordUpdate />} />

//         <Route 
//           path="/sales-dashboard" 
//           element={
//             <Layout>
//               <SalesDashboard />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/orders" 
//           element={
//             <Layout>
//               <OrdersInvoice />
//             </Layout>
//           } 
//         />

//         <Route
//           path="/orders/:orderNumber"
//           element={<OrderDetails />}
//         />

//         <Route 
//           path="/create-order" 
//           element={
//             <Layout>
//               <CreateOrder />
//             </Layout>
//           } 
//         />

//         <Route 
//           path="/quotations" 
//           element={
//             <Layout>
//               <ManageQuotations />
//             </Layout>
//           } />

//         <Route 
//           path="/generate-quotation" 
//           element={
//             <Layout>
//               <GenerateQuotation/>
//             </Layout>
//           } 
//         />

//         <Route path="/generate-quotation/:id" element={<GenerateQuotation />} />

//         <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />

         
//             {/* Manufacturing Order Routes */}
//             <Route path="/manufacturing/create" element={<ManufacturingOrderCreate />} />
//             <Route path="/manufacturing/list" element={<ManufacturingOrderList />} />
//             <Route path="/manufacturing/unbuild" element={<ManufacturingOrderUnbuild />} />
//             <Route path="/manufacturing/scrap" element={<ManufacturingOrderScrap />} />
            
//             {/* BoM Routes */}
//             <Route path="/bom/create" element={<BomCreate />}/>
//             <Route path="/bom/list" element={<BomList />} />
            
//             {/* Routing Routes */}
//             <Route path="/routing/create" element={<RoutingCreate />} />
//             <Route path="/routing/list" element={<RoutingList />} />
            
//             {/* Work Center Routes */}
//             {/* <Route path="/workcenter/create" element={<WorkCenterCreate />} />
//             <Route path="/workcenter/list" element={<WorkCenterList />} /> */}

//             <Route path="/workcenter/create" element={<WorkCenterContainer />} />
//             <Route path="/workcenter/list" element={<WorkCenterContainer />}/>
//         </Routes>
//     </Router>
//   );
// };

// export default App;













































// // App.js (updated)
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import GenerateQuotation from './GenerateQuotation';
// import ManageQuotations from './ManageQuotation';
// import OrdersInvoice from './OrdersInvoice';
// import InvoicePage from './InvoicePage';
// import Layout from './Layout';

// function App() {
//   const [quotations, setQuotations] = useState([
//     {
//       id: "QT-1001",
//       customer: "Acme Corp",
//       date: "2023-05-15",
//       expiryDate: "2023-06-15",
//       amount: 12500,
//       status: "sent",
//       salesperson: "John Smith"
//     },
//     {
//       id: "QT-1002",
//       customer: "Globex Inc",
//       date: "2023-05-10",
//       expiryDate: "2023-06-10",
//       amount: 8500,
//       status: "draft",
//       salesperson: "Jane Doe"
//     },
//     {
//       id: "QT-1003",
//       customer: "Initech",
//       date: "2023-05-05",
//       expiryDate: "2023-06-05",
//       amount: 21000,
//       status: "accepted",
//       salesperson: "Mike Johnson"
//     }
//   ]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout><Dashboard /></Layout>} />
//         <Route path="/orders" element={<Layout><OrdersInvoice /></Layout>} />
//         <Route 
//           path="/quotations" 
//           element={
//             <Layout>
//               <ManageQuotations 
//                 quotations={quotations} 
//                 setQuotations={setQuotations} 
//               />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/generate-quotation" 
//           element={
//             <Layout>
//               <GenerateQuotation 
//                 onGenerate={(newQuotation) => 
//                   setQuotations([...quotations, newQuotation])
//                 } 
//               />
//             </Layout>
//           } 
//         />
//         <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Layout from './components/Layout';
// import Dashboard from './components/Dashboard';
// import OrdersInvoice from './components/OrdersInvoice';
// import CreateOrder from './components/CreateOrder';
// import ManageQuotations from './components/ManageQuotation';
// import GenerateQuotation from './components/GenerateQuotation';
// import InvoicePage from './components/InvoicePage';
// import SendQuotationEmail from './components/SendQuotationEmail';

// function App() {
//   const [orders, setOrders] = useState([]);
//   const [quotations, setQuotations] = useState([]);

//   const handleSaveOrder = (newOrder) => {
//     setOrders([...orders, newOrder]);
//     // Also create a quotation from the order
//     const newQuotation = {
//       id: `QT-${newOrder.orderNumber.split('-')[1]}`,
//       customer: newOrder.customer,
//       date: newOrder.date,
//       expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
//       amount: newOrder.total,
//       status: "draft",
//       salesperson: newOrder.salesperson,
//       paymentTerms: newOrder.paymentTerms
//     };
//     setQuotations([...quotations, newQuotation]);
//   };

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Layout><Dashboard /></Layout>} />
//         <Route 
//           path="/orders" 
//           element={
//             <Layout>
//               <OrdersInvoice orders={orders} setOrders={setOrders} />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/create-order" 
//           element={
//             <Layout>
//               <CreateOrder onSave={handleSaveOrder} />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/quotations" 
//           element={
//             <Layout>
//               <ManageQuotations 
//                 quotations={quotations} 
//                 setQuotations={setQuotations} 
//               />
//             </Layout>
//           } 
//         />
//         <Route 
//           path="/generate-quotation" 
//           element={
//             <Layout>
//               <GenerateQuotation 
//                 onGenerate={(newQuotation) => 
//                   setQuotations([...quotations, newQuotation])
//                 } 
//               />
//             </Layout>
//           } 
//         />
//         <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;








// Chetana's 20 April Code -> Completely Working (Use this code)

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './components/Login';
import RegistrationForm from './components/RegistrationForm';
import AdminDashboard from './components/AdminDashboard';
import InventoryDashboard from './components/InventoryDashboard';
import Dashboard from './components/Dashboard';
import HRDashboard from './components/HRDashboard';
import FinanceDashboard from './components/FinanceDashboard';
import CustomerDashboard from './components/CustomerDashboard';
import ProductionDashboard from './components/ProductionDashboard';
import OrdersInvoice from './components/OrdersInvoice';
import CreateOrder from './components/CreateOrder';
import ManageQuotations from './components/ManageQuotation';
import GenerateQuotation from './components/GenerateQuotation';
import InvoicePage from './components/InvoicePage';
import OrderDetails from './components/OrderDetails';
import Layout from './components/Layout';
import ChangePassword from './components/ChangePassword';
import OTPPasswordUpdate from './components/OTPPasswordUpdate';
import ManufacturingOrderUnbuild from './components/ManufacturingOrderUnbuild';
import ManufacturingOrderScrap from './components/ManufacturingOrderScrap';
import ManufacturingOrderCreate from './components/ManufacturingOrderCreate';
import ManufacturingOrderList from './components/ManufacturingOrderList';
import BomCreate from './components/BomCreate';
import BomList from './components/BomList';
import RoutingCreate from './components/RoutingCreate';
import RoutingList from './components/RoutingList';
import WorkCenterCreate from './components/WorkCenterCreate';
import WorkCenterList from './components/WorkCenterList';
import WorkCenterDashboard from './components/WorkCenterDashboard';
import WorkCenterMain from './components/WorkCenterMain';
import WorkCenterSetup from './components/WorkCenterSetup';
import WorkCenterContainer from './components/WorkCenterContainer';
import TopNavbar from './components/TopNavbar';
import SalesDashboard from './components/SalesDashboard';

const App = () => {
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);

  const handleSaveOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
    const newQuotation = {
      id: `QT-${newOrder.orderNumber.split('-')[1]}`,
      customer: newOrder.customer,
      date: newOrder.date,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      amount: newOrder.total,
      status: "draft",
      salesperson: newOrder.salesperson,
      paymentTerms: newOrder.paymentTerms
    };
    setQuotations([...quotations, newQuotation]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registration-form" element={<RegistrationForm />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/production-dashboard" element={<ProductionDashboard />} />
        <Route path="/finance-dashboard" element={<FinanceDashboard />} />
        <Route path="/inventory-dashboard" element={<InventoryDashboard />} />
        <Route path="/hr-dashboard" element={<HRDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
        <Route path="/change-password" element={<OTPPasswordUpdate />} />

        <Route path="/sales-dashboard" element={<Layout><SalesDashboard /></Layout>} />
        
        <Route path="/orders" element={
          <Layout>
            <OrdersInvoice orders={orders} setOrders={setOrders} />
          </Layout>
        } />

        <Route path="/orders/:orderNumber" element={<OrderDetails orders={orders} />} />

        <Route path="/create-order" element={
            <CreateOrder onSave={handleSaveOrder} />
        } />

        <Route path="/quotations" element={
          <Layout>
            <ManageQuotations quotations={quotations} setQuotations={setQuotations} />
          </Layout>
        } />

        <Route path="/generate-quotation" element={
          <Layout>
            <GenerateQuotation onGenerate={(newQuotation) => setQuotations([...quotations, newQuotation])} />
          </Layout>
        } />

        <Route path="/generate-quotation/:id" element={<GenerateQuotation />} />

        <Route path="/invoices" element={<Layout><InvoicePage /></Layout>} />

        {/* Manufacturing Order Routes */}
        <Route path="/manufacturing/create" element={<ManufacturingOrderCreate />} />
        <Route path="/manufacturing/list" element={<ManufacturingOrderList />} />
        <Route path="/manufacturing/unbuild" element={<ManufacturingOrderUnbuild />} />
        <Route path="/manufacturing/scrap" element={<ManufacturingOrderScrap />} />
        
        {/* BoM Routes */}
        <Route path="/bom/create" element={<BomCreate />} />
        <Route path="/bom/list" element={<BomList />} />

        {/* Routing Routes */}
        <Route path="/routing/create" element={<RoutingCreate />} />
        <Route path="/routing/list" element={<RoutingList />} />

        {/* Work Center Routes */}
        <Route path="/workcenter/create" element={<WorkCenterContainer />} />
        <Route path="/workcenter/list" element={<WorkCenterContainer />} />
      </Routes>
    </Router>
  );
};

export default App;
