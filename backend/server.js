// Chetana's Completely Working Backend

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const connectDB = require("./config/db");
// const cookieParser = require("cookie-parser");
// const AuthRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/SalesDepartment/orders.routes");
// const quotationRoutes = require("./routes/SalesDepartment/quotation.routes");
// const invoiceRoutes = require("./routes/SalesDepartment/invoice.routes");
// // const customerRoutes = require("./routes/customer.routes");
// // const paymentRoutes = require("./routes/payment.routes");
// // const invoiceRoutes = require("./routes/invoice.routes");
// const app = express();
// connectDB(); // Connect to MongoDB

// // Middleware
// app.use(cors({
//     origin: "http://localhost:5173",
//     credentials: true
// }));
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());

// app.get("/", (req, res) => {
//     res.send("Hello World");
// });
// // Routes
// app.use("/auth", AuthRoutes);
// // app.use("/customers", customerRoutes);
// app.use("/order", orderRoutes);
// app.use("/quotation",quotationRoutes)
// app.use("/invoice", invoiceRoutes);
// // app.use("/payments", paymentRoutes);
// // app.use("/invoices", invoiceRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


// Snehals Backend Code

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");

// const AuthRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/SalesDepartment/order.routes");
// const quotationRoutes = require("./routes/SalesDepartment/quotation.routes");
// const invoiceRoutes = require("./routes/SalesDepartment/invoice.routes");
// // const customerRoutes = require("./routes/customer.routes");
// // const paymentRoutes = require("./routes/payment.routes");
// // const invoiceRoutes = require("./routes/invoice.routes");

// const app = express();

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/erp_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Middleware
// app.use(cors({}));
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());

// // Test route
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// // Routes
// app.use("/auth", AuthRoutes);
// app.use("/order", orderRoutes);
// app.use("/quotation", quotationRoutes);
// app.use("/invoice", invoiceRoutes);
// // app.use("/customers", customerRoutes);
// // app.use("/payments", paymentRoutes);
// // app.use("/invoices", invoiceRoutes);

// // Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));




// //After correction of sales module
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const morgan = require("morgan");
// const cookieParser = require("cookie-parser");
// const mongoose = require("mongoose");

// const AuthRoutes = require("./routes/authRoutes");
// const orderRoutes = require("./routes/SalesDepartment/order.routes");
// const quotationRoutes = require("./routes/SalesDepartment/quotation.routes");
// const invoiceRoutes = require("./routes/SalesDepartment/invoice.routes");

// const bomRoutes = require('./routes/ProductionDepartment/bomRoutes');
// const workcenterRoutes = require('./routes/ProductionDepartment/workcenterRoutes');
// // const customerRoutes = require("./routes/customer.routes");
// // const paymentRoutes = require("./routes/payment.routes");
// // const invoiceRoutes = require("./routes/invoice.routes");

// const app = express();

// // MongoDB Connection
// mongoose
//   .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/erp_db", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("✅ MongoDB connected"))
//   .catch((err) => console.error("❌ MongoDB connection error:", err));

// // Middleware
// app.use(cors({}));
// app.use(express.json());
// app.use(morgan("dev"));
// app.use(cookieParser());

// // Test route
// app.get("/", (req, res) => {
//     res.send("Hello World");
// });

// // Routes
// app.use("/auth", AuthRoutes);
// app.use("/order", orderRoutes);
// app.use("/quotation", quotationRoutes);
// app.use("/invoice", invoiceRoutes);
// app.use("/bom",bomRoutes);
// app.use("/workcenter",workcenterRoutes);
// // app.use("/customers", customerRoutes);
// // app.use("/payments", paymentRoutes);
// // app.use("/invoices", invoiceRoutes);

// // Server
// const PORT = process.env.PORT || 8000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

//--------------Updating Production Module -------------------------

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const AuthRoutes = require("./routes/authRoutes");
const orderRoutes = require("./routes/SalesDepartment/order.routes");
const quotationRoutes = require("./routes/SalesDepartment/quotation.routes");
const invoiceRoutes = require("./routes/SalesDepartment/invoice.routes");
const routingRoutes = require("./routes/ProductionDepartment/routingRoutes");
const bomRoutes = require('./routes/ProductionDepartment/bomRoutes');
const workcenterRoutes = require('./routes/ProductionDepartment/workcenterRoutes');
// const customerRoutes = require("./routes/customer.routes");
// const paymentRoutes = require("./routes/payment.routes");
// const invoiceRoutes = require("./routes/invoice.routes");

const app = express();

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/erp_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Middleware
app.use(cors({}));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

// Test route
app.get("/", (req, res) => {
    res.send("Hello World");
});

// Routes
app.use("/auth", AuthRoutes);
app.use("/order", orderRoutes);
app.use("/quotation", quotationRoutes);
app.use("/invoice", invoiceRoutes);
app.use("/bom",bomRoutes);
app.use("/workcenter",workcenterRoutes);
app.use("/routing", routingRoutes);
// app.use("/routing", require("./routes/ProductionDepartment/routingRoutes"));

// app.use("/customers", customerRoutes);
// app.use("/payments", paymentRoutes);
// app.use("/invoices", invoiceRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
