import { Router } from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getDetailSubCategory,
  getListSubCategory,
  softDeleteSubCategory,
  updateSubCategory,
  restoreSubCategory,
} from "./subcategory.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { subcategorySchema } from "./subcategory.schema.js";

const subCategoryRoutes = Router();
subCategoryRoutes.get("/", getListSubCategory);
subCategoryRoutes.get("/:id", getDetailSubCategory);
subCategoryRoutes.delete("/:id", deleteSubCategory);
subCategoryRoutes.patch("/soft-delete/:id", softDeleteSubCategory);
subCategoryRoutes.patch("/restore/:id", restoreSubCategory);
subCategoryRoutes.use(validBodyRequest(subcategorySchema));
subCategoryRoutes.post("/", createSubCategory);
subCategoryRoutes.patch("/:id", updateSubCategory);
export default subCategoryRoutes;
