const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  // Define schema fields here
});

module.exports = mongoose.model("Comment", CommentSchema);
