const ManufacturingOrder = require('../../models/ProductionDepartment/manufacturingModel');

// Create new manufacturing order
const createManufacturingOrder = async (req, res) => {
  try {
    const { product, quantity, bomId, routing, status } = req.body;

    const newOrder = new ManufacturingOrder({
      product,
      quantity,
      bomId,
      routing,
      status: status || 'Planned'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Error creating manufacturing order.' });
  }
};

// Get all manufacturing orders
const getAllManufacturingOrders = async (req, res) => {
  try {
    const orders = await ManufacturingOrder.find().populate('bomId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch manufacturing orders.' });
  }
};

// Get single manufacturing order by ID
const getManufacturingOrderById = async (req, res) => {
  try {
    const order = await ManufacturingOrder.findById(req.params.id).populate('bomId');
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch order.' });
  }
};

// Update order status
const updateManufacturingOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await ManufacturingOrder.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!updatedOrder) return res.status(404).json({ error: 'Order not found.' });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update order status.' });
  }
};

// Delete order
const deleteManufacturingOrder = async (req, res) => {
  try {
    const deleted = await ManufacturingOrder.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Order not found.' });
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete order.' });
  }
};

module.exports = {
  createManufacturingOrder,
  getAllManufacturingOrders,
  getManufacturingOrderById,
  updateManufacturingOrderStatus,
  deleteManufacturingOrder
};
