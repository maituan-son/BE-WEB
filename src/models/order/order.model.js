import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({});
const Order = mongoose.model("Order", orderSchema);

export default Order;
