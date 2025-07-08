import { Router } from "express";
import { updateCart } from "./cart.controller.js";
import { veriflyUser } from "../../common/middleware/veriflyUser.js";

const cartRoutes = Router();
cartRoutes.post("/", veriflyUser, updateCart);

export default cartRoutes;
