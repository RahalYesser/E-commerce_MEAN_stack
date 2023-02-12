const mongoose = require("mongoose");

const AdressSchema = new mongoose.Schema(
  {
    city: { type: String, required: true},
    country: { type: String, required: true},
    zipcode: { type: String, required: true },
    street: { type: String, required: true },  
  },
  { timestamps: true }
);

module.exports = mongoose.model("Adress", AdressSchema);