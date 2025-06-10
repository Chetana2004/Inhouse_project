// const Bom = require('../../models/ProductionDepartment/bomModel'); // Make sure you have this model created

// // Create a new BoM
// exports.createBom = async (req, res) => {
//   try {
//     const bomData = req.body;
//     const newBom = new Bom(bomData);
//     await newBom.save();
//     res.status(201).json({ message: "BoM created successfully", bom: newBom });
//   } catch (error) {
//     console.error("Error creating BoM:", error);
//     res.status(500).json({ message: "Failed to create BoM", error });
//   }
// };

// // Get all BoMs
// exports.getAllBom = async (req, res) => {
//   try {
//     const boms = await Bom.find();
//     res.status(200).json(boms);
//   } catch (error) {
//     console.error("Error fetching BoMs:", error);
//     res.status(500).json({ message: "Failed to fetch BoMs", error });
//   }
// };











// Modified code for manufacturing order

const Bom = require('../../models/ProductionDepartment/bomModel');

// Create a new BoM
exports.createBom = async (req, res) => {
  try {
    const bomData = req.body;
    const newBom = new Bom(bomData);
    await newBom.save();
    res.status(201).json({ message: "BoM created successfully", bom: newBom });
  } catch (error) {
    console.error("Error creating BoM:", error);
    res.status(500).json({ message: "Failed to create BoM", error });
  }
};

// Get all BoMs (detailed)
exports.getAllBom = async (req, res) => {
  try {
    const boms = await Bom.find();
    res.status(200).json(boms);
  } catch (error) {
    console.error("Error fetching BoMs:", error);
    res.status(500).json({ message: "Failed to fetch BoMs", error });
  }
};

// Get BoMs formatted for dropdowns
exports.getBomDropdownOptions = async (req, res) => {
  try {
    const boms = await Bom.find();
    const dropdownOptions = boms.map(bom => ({
      value: bom._id,
      label: `${bom.productName} (${bom.bomType})`
    }));
    res.status(200).json(dropdownOptions);
  } catch (error) {
    console.error("Error formatting BoMs for dropdown:", error);
    res.status(500).json({ message: "Failed to prepare dropdown list", error });
  }
};

// Get Components of a BoM by BoM ID
exports.getBomComponents = async (req, res) => {
  try {
    const { bomId } = req.query;
    const bom = await Bom.findById(bomId);
    if (!bom) {
      return res.status(404).json({ message: "BoM not found" });
    }
    res.status(200).json(bom.items);
  } catch (error) {
    console.error("Error fetching BoM components:", error);
    res.status(500).json({ message: "Failed to fetch BoM components", error });
  }
};
