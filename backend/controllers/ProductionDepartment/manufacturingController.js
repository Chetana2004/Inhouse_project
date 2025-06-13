// const ManufacturingOrder = require('../../models/ProductionDepartment/manufacturingModel');

// // Create new manufacturing order
// const createManufacturingOrder = async (req, res) => {
//   try {
//     const { product, quantity, bomId, routing, status } = req.body;

//     const newOrder = new ManufacturingOrder({
//       product,
//       quantity,
//       bomId,
//       routing,
//       status: status || 'Planned'
//     });

//     const savedOrder = await newOrder.save();
//     res.status(201).json(savedOrder);
//   } catch (err) {
//     res.status(500).json({ error: 'Error creating manufacturing order.' });
//   }
// };

// // Get all manufacturing orders
// const getAllManufacturingOrders = async (req, res) => {
//   try {
//     const orders = await ManufacturingOrder.find().populate('bomId');
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch manufacturing orders.' });
//   }
// };

// // Get single manufacturing order by ID
// const getManufacturingOrderById = async (req, res) => {
//   try {
//     const order = await ManufacturingOrder.findById(req.params.id).populate('bomId');
//     if (!order) return res.status(404).json({ error: 'Order not found.' });
//     res.json(order);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch order.' });
//   }
// };

// // Update order status
// const updateManufacturingOrderStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const updatedOrder = await ManufacturingOrder.findByIdAndUpdate(
//       req.params.id,
//       { status },
//       { new: true }
//     );
//     if (!updatedOrder) return res.status(404).json({ error: 'Order not found.' });
//     res.json(updatedOrder);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update order status.' });
//   }
// };

// // Delete order
// const deleteManufacturingOrder = async (req, res) => {
//   try {
//     const deleted = await ManufacturingOrder.findByIdAndDelete(req.params.id);
//     if (!deleted) return res.status(404).json({ error: 'Order not found.' });
//     res.json({ message: 'Order deleted successfully.' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete order.' });
//   }
// };

// module.exports = {
//   createManufacturingOrder,
//   getAllManufacturingOrders,
//   getManufacturingOrderById,
//   updateManufacturingOrderStatus,
//   deleteManufacturingOrder
// };




------------------------------------------------


  
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

// Scrap order
const scrapOrder = async (req, res) => {
  try {
    const { reason, quantity, notes, conveyorType, serialNumber, approvalRequired } = req.body;

    const updatedOrder = await ManufacturingOrder.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Scrapped',
        scrapDetails: {
          reason,
          quantity,
          notes,
          conveyorType,
          serialNumber,
          approvalRequired
        }
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found.' });

    res.json({ message: 'Scrap order recorded.', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrap order.' });
  }
};

// Unbuild order
const unbuildOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const updatedOrder = await ManufacturingOrder.findByIdAndUpdate(
      req.params.id,
      {
        status: 'Unbuilt',
        unbuildDetails: {
          reason,
          requestDate: new Date()
        }
      },
      { new: true }
    );

    if (!updatedOrder) return res.status(404).json({ error: 'Order not found.' });

    res.json({ message: 'Unbuild request submitted.', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit unbuild request.' });
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
  deleteManufacturingOrder,
  scrapOrder,
  unbuildOrder
};
