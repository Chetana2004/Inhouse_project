
const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema({
  productId: { 
    type: String, 
    required: [true, 'Product ID is required'],
    trim: true
  },
  name: { 
    type: String, 
    required: [true, 'Product name is required'],
    trim: true,
    minlength: [2, 'Product name must be at least 2 characters']
  },
  quantity: { 
    type: Number, 
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  unitPrice: { 
    type: Number, 
    required: [true, 'Unit price is required'],
    min: [0, 'Unit price cannot be negative']
  },
  total: { 
    type: Number, 
    required: [true, 'Total price is required'],
    min: [0, 'Total price cannot be negative'],
    validate: {
      validator: function(v) {
        // Verify total equals quantity * unitPrice
        return v === this.quantity * this.unitPrice;
      },
      message: props => `Total price (${props.value}) should equal quantity × unit price`
    }
  }
}, { _id: false });

const OrderSchema = new mongoose.Schema({
  orderNumber: { 
    type: String, 
    required: [true, 'Order number is required'],
    unique: true,
    trim: true,
    validate: {
      validator: function(v) {
        // Format: ORD- followed by 4 digits
        return /^ORD-\d{4}$/.test(v);
      },
      message: props => `${props.value} is not a valid order number (format: ORD-1234)`
    }
  },
  date: { 
    type: String,
    required: [true, 'Date is required'],
    validate: {
      validator: function(v) {
        // YYYY-MM-DD format
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid date (format: YYYY-MM-DD)`
    }
  },
  customer: { 
    type: String, 
    required: [true, 'Customer name is required'],
    trim: true,
    minlength: [2, 'Customer name must be at least 2 characters']
  },
  customerEmail: { 
    type: String, 
    required: [true, 'Customer email is required'],
    trim: true,
    lowercase: true,
    validate: {
      validator: function(v) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  salesperson: { 
    type: String, 
    required: [true, 'Salesperson is required'],
    trim: true
  },
  paymentTerms: { 
    type: String, 
    required: [true, 'Payment terms are required'],
    enum: {
      values: ["7 days", "15 days", "30 days"],
      message: '{VALUE} is not a valid payment term'
    }
  },
  products: {
    type: [ProductSchema],
    required: [true, 'At least one product is required'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'At least one product is required'
    }
  },
  subtotal: { 
    type: Number, 
    required: [true, 'Subtotal is required'],
    min: [0, 'Subtotal cannot be negative'],
    validate: {
      validator: function(v) {
        // Verify subtotal equals sum of product totals
        const calculatedSubtotal = this.products.reduce((sum, product) => sum + product.total, 0);
        return Math.abs(v - calculatedSubtotal) < 0.01; // Allow for floating point rounding
      },
      message: props => `Subtotal (${props.value}) should equal sum of product totals`
    }
  },
  discount: { 
    type: Number, 
    default: 0,
    min: [0, 'Discount cannot be negative'],
    validate: {
      validator: function(v) {
        return v <= this.subtotal;
      },
      message: props => `Discount (${props.value}) cannot exceed subtotal`
    }
  },
  tax: { 
    type: Number, 
    default: 0,
    min: [0, 'Tax cannot be negative']
  },
  total: { 
    type: Number, 
    required: [true, 'Total is required'],
    min: [0, 'Total cannot be negative'],
    validate: {
      validator: function(v) {
        // Verify total equals subtotal - discount + tax
        const calculatedTotal = this.subtotal - this.discount + this.tax;
        return Math.abs(v - calculatedTotal) < 0.01; // Allow for floating point rounding
      },
      message: props => `Total (${props.value}) should equal subtotal - discount + tax`
    }
  },
  status: {
    type: String,
    enum: {
      values: ["Draft", "To Invoice", "Invoiced", "Paid"],
      message: '{VALUE} is not a valid status'
    },
    default: "Draft"
  },
  notes: { 
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
  strict: 'throw', // Rejects documents with fields not defined in schema
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add index for frequently queried fields
OrderSchema.index({ orderNumber: 1 });
OrderSchema.index({ customer: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ date: 1 });

module.exports = mongoose.model("Order", OrderSchema);
