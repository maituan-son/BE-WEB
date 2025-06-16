const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderitemSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Orderitem", OrderitemSchema);
