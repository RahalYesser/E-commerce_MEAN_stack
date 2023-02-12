const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    product_id: {type: String,required: true},
    product_image:{type: String,required: true},
    name: {type: String,required: true},
    price: {type: String,required: true},
    quantity: {type: Number,required: true},
  },
    
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);