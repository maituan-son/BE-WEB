import { Router } from "express";
import {
  addToCart,
  deleteCart,
  getCart,
  updateCart,
} from "./cart.controller.js";

const cartRoutes = Router();
cartRoutes.post("/cart/", addToCart);
cartRoutes.get("/", getCart);
cartRoutes.delete("/", deleteCart);
cartRoutes.put("/item/:itemId", updateCart);

export default cartRoutes;
