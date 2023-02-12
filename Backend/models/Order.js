const mongoose = require("mongoose");
const Adress = require("../models/Adress");
AdressSchema = mongoose.model('Adress').schema;

const Cart = require("../models/Cart");

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    fname: { type: String,required:true },
    lname: { type: String,required:true },
    phone: { type: Number,required:true },
    email: { type: String },
    adress: AdressSchema ,
    products: { type: Array,required:true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);