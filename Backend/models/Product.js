const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    pcid: { type: String, required: true, unique: true},
    name: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    categories: { type: String },
    size: { type: String },
    color: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number },    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);