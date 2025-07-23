import { Router } from "express";

import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  softDeleteProduct,
  updateProduct,
} from "./product.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { productSchema } from "./product.schema.js";
import authorizeRole from "../../common/middleware/authorizeRole.js";
import authenticate from "../../common/middleware/authenticate.js";
import { userRoles } from "../enums.js";

const productRoutes = Router();
const allowAdmins = [
  authenticate,
  authorizeRole(userRoles.ADMIN, userRoles.SUPER_ADMIN),
];

productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getProductById);
productRoutes.post("/", createProduct);

productRoutes.delete("/:id", allowAdmins, deleteProduct);
productRoutes.patch("/soft-delete/:id", softDeleteProduct);
productRoutes.use(validBodyRequest(productSchema));
productRoutes.patch("/:id", updateProduct);
productRoutes.delete("/restore/:id", allowAdmins, deleteProduct);

export default productRoutes;
