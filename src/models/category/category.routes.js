import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  restoreCategory,
  softDeleteCategory,
  updateCategory,
} from "./category.controller.js";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategories);
categoryRoutes.get("/:id", getCategoryById);
categoryRoutes.delete("/:id", deleteCategory);
categoryRoutes.delete("/soft-delete/:id", softDeleteCategory);
categoryRoutes.delete("/restore/:id", restoreCategory);
categoryRoutes.use();
categoryRoutes.post("/", createCategory);
categoryRoutes.patch("/:id", updateCategory);
export default categoryRoutes;
