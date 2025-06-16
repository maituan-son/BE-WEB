import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  getDetailBrand,
  getListBrand,
  restoreBrand,
  softDeleteBrand,
  updateBrand,
} from "./brand.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { brandSchema } from "./brand.schema.js";
const brandRoutes = Router();
brandRoutes.get("/", getListBrand);
brandRoutes.get("/:id", getDetailBrand);
brandRoutes.delete("/:id", deleteBrand);
brandRoutes.delete("/soft-delete/:id", softDeleteBrand);
brandRoutes.patch("/restore/:id", restoreBrand);
brandRoutes.use(validBodyRequest(brandSchema));
brandRoutes.post("/", createBrand);
brandRoutes.patch("/:id", updateBrand);
export default brandRoutes;
