import { Router } from "express";
import productRoutes from "../models/product/product.routes.js";
import categoryRoutes from "../models/category/category.routes.js";
import imageRoutes from "./imageRoutes.js";

const router = Router();

router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/uploadImage", imageRoutes);

export default router;
