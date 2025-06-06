import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import RegistrationForm from "./components/RegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import InventoryDashboard from "./components/InventoryDashboard";
import Dashboard from "./components/Dashboard";
import HRDashboard from "./components/HRDashboard";
import FinanceDashboard from "./components/FinanceDashboard";
import CustomerDashboard from "./components/CustomerDashboard";
import ProductionDashboard from "./components/ProductionDashboard";
import OrdersInvoice from "./components/OrdersInvoice";
import CreateOrder from "./components/CreateOrder";
import ManageQuotations from "./components/ManageQuotation";
import GenerateQuotation from "./components/GenerateQuotation";
import InvoicePage from "./components/InvoicePage";
import OrderDetails from "./components/OrderDetails";
import Layout from "./components/Layout";
import ChangePassword from "./components/ChangePassword";
import OTPPasswordUpdate from "./components/OTPPasswordUpdate";
import ManufacturingOrderUnbuild from "./components/ManufacturingOrderUnbuild";
import ManufacturingOrderScrap from "./components/ManufacturingOrderScrap";
import ManufacturingOrderCreate from "./components/ManufacturingOrderCreate";
import ManufacturingOrderList from "./components/ManufacturingOrderList";
import BomCreate from "./components/BomCreate";
import BomList from "./components/BomList";
import RoutingCreate from "./components/RoutingCreate";
import RoutingList from "./components/RoutingList";
import WorkCenterCreate from "./components/WorkCenterCreate";
import WorkCenterList from "./components/WorkCenterList";
import TopNavbar from "./components/TopNavbar";
import SalesDashboard from "./components/SalesDashboard";

const App = () => {
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);

  const handleSaveOrder = (newOrder) => {
    setOrders([...orders, newOrder]);
    const newQuotation = {
      id: `QT-${newOrder.orderNumber.split("-")[1]}`,
      customer: newOrder.customer,
      date: newOrder.date,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      amount: newOrder.total,
      status: "draft",
      salesperson: newOrder.salesperson,
      paymentTerms: newOrder.paymentTerms,
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

        <Route
          path="/sales-dashboard"
          element={
            <Layout>
              <SalesDashboard />
            </Layout>
          }
        />

        {/* <Route
          path="/orders"
          element={
            <Layout>
              <OrdersInvoice orders={orders} setOrders={setOrders} />
            </Layout>
          }
        /> */}
        <Route
          path="/orders"
          element={
            <Layout>
              <OrdersInvoice orders={orders} setOrders={setOrders} />
            </Layout>
          }
        />

        <Route
          path="/orders/:orderNumber"
          element={<OrderDetails orders={orders} />}
        />

        <Route
          path="/create-order"
          element={<CreateOrder onSave={handleSaveOrder} />}
        />

        <Route
          path="/quotations"
          element={
            <Layout>
              <ManageQuotations
                quotations={quotations}
                setQuotations={setQuotations}
              />
            </Layout>
          }
        />

        <Route
          path="/generate-quotation"
          element={
            <Layout>
              <GenerateQuotation
                onGenerate={(newQuotation) =>
                  setQuotations([...quotations, newQuotation])
                }
              />
            </Layout>
          }
        />

        <Route path="/generate-quotation/:id" element={<GenerateQuotation />} />

        <Route
          path="/invoices"
          element={
            <Layout>
              <InvoicePage />
            </Layout>
          }
        />

        {/* Manufacturing Order Routes */}
        <Route
          path="/manufacturing/create"
          element={<ManufacturingOrderCreate />}
        />
        <Route
          path="/manufacturing/list"
          element={<ManufacturingOrderList />}
        />
        <Route
          path="/manufacturing/unbuild"
          element={<ManufacturingOrderUnbuild />}
        />
        <Route
          path="/manufacturing/scrap"
          element={<ManufacturingOrderScrap />}
        />

        {/* BoM Routes */}
        <Route path="/bom/create" element={<BomCreate />} />
        <Route path="/bom/list" element={<BomList />} />

        {/* Routing Routes */}
        <Route path="/routing/create" element={<RoutingCreate />} />
        <Route path="/routing/list" element={<RoutingList />} />

        {/* Work Center Routes */}
        <Route path="/workcenter/create" element={<WorkCenterCreate />} />
        <Route path="/workcenter/list" element={<WorkCenterList />} />
      </Routes>
    </Router>
  );
};

export default App;
