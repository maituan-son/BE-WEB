const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VoucherSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Voucher", VoucherSchema);
