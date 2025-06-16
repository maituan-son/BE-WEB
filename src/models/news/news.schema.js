const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("News", NewsSchema);
