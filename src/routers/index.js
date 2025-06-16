import { Router } from "express";
import productRoutes from "../models/product/product.routes.js";
import categoryRoutes from "../models/category/category.routes.js";
import imageRoutes from "./imageRoutes.js";
import subCategoryRoutes from "../models/subcategory/subcategory.router.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subCategoryRoutes);
router.use("/uploadImage", imageRoutes);

export default router;
