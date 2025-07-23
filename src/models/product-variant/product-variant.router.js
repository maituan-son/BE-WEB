import { Router } from "express";
import {
  createProductVariant,
  deleteProductVariant,
  getDetailProductVariant,
  getListProductVariant,
  restoreProductVariant,
  softDeleteProductVariant,
  updateProductVariant,
} from "./product-variant.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { productVariantSchema } from "./product-variant.schema.js";
const productVariantRoutes = Router();
productVariantRoutes.get("/", getListProductVariant);
productVariantRoutes.get("/:id", getDetailProductVariant);
productVariantRoutes.post(
  "/",
  validBodyRequest(productVariantSchema),
  createProductVariant
);
productVariantRoutes.patch(
  "/:id",
  validBodyRequest(productVariantSchema),
  updateProductVariant
);
productVariantRoutes.delete("/:id", deleteProductVariant);
productVariantRoutes.patch("/:id/soft-delete", softDeleteProductVariant);
productVariantRoutes.patch("/:id/restore", restoreProductVariant);
export default productVariantRoutes;
