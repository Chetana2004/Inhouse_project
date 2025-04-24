const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { 
      type: String, 
      enum: ["Admin", "Sales Manager", "Production Manager", "Finance Manager","HR Manager","Customer"], 
      default: "Admin" 
    },
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" }
   },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
