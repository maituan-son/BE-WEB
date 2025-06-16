const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Cart", CartSchema);
