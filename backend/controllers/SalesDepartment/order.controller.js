const Order = require("../../models/SalesDepartment/order.model");

// Create Order
exports.createOrder = async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.status(201).json({ 
      message: "Order created successfully", 
      order: newOrder 
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ 
      message: "Failed to create order",
      error: error.message 
    });
  }
};

// Get All Orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    
    // Filter out dummy entries
    const validOrders = orders.filter(order => {
      // Check for valid order number pattern (ORD- followed by numbers)
      const hasValidOrderNumber = /^ORD-\d{4}$/.test(order.orderNumber);
      
      // Check for required fields
      const hasRequiredFields = order.customer && order.date && order.total > 0;
      
      return hasValidOrderNumber && hasRequiredFields;
    });

    res.status(200).json(validOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ 
      message: "Failed to fetch orders",
      error: error.message 
    });
  }
};

// Get a single order by order number
exports.getOrderByOrderNumber = async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber });
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error fetching order", error });
  }
};
