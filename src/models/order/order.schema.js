const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Order", OrderSchema);
