import { Router } from "express";
import { creatPayosOrder } from "./order.controller.js";
const orderRoutes = Router();
orderRoutes.post("/payos", creatPayosOrder);

export default orderRoutes;
