import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "./product.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { productSchema } from "./product.schema.js";

const productRoutes = Router();

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);
productRoutes.patch("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);
productRoutes.use(validBodyRequest(productSchema));
productRoutes.delete("/soft-delete/:id", deleteProduct);
productRoutes.delete("/restore/:id", deleteProduct);

export default productRoutes;
