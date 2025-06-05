const Bom = require('../../models/ProductionDepartment/bomModel'); // Make sure you have this model created

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

// Get all BoMs
exports.getAllBom = async (req, res) => {
  try {
    const boms = await Bom.find();
    res.status(200).json(boms);
  } catch (error) {
    console.error("Error fetching BoMs:", error);
    res.status(500).json({ message: "Failed to fetch BoMs", error });
  }
};
