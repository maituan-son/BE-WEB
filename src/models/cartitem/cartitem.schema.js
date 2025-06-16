const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartitemSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Cartitem", CartitemSchema);
