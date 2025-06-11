import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.patch("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
productRoutes.delete("/soft-delete/:id", deleteProduct);
productRoutes.delete("/restore/:id", deleteProduct);

export default productRoutes;
