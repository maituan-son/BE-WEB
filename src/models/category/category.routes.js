import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getDetailCategory,
  getListCategory,
  restoreCategory,
  softDeleteCategory,
  updateCategory,
} from "./category.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { categorySchema } from "./category.schema.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getListCategory);

categoryRoutes.get("/:id", getDetailCategory);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.patch("/soft-delete/:id", softDeleteCategory);
categoryRoutes.patch("/restore/:id", restoreCategory);
categoryRoutes.use(validBodyRequest(categorySchema));
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);

export default categoryRoutes;
