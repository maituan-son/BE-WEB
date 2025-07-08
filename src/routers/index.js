import { Router } from "express";
import productRoutes from "../models/product/product.routes.js";
import categoryRoutes from "../models/category/category.routes.js";
import imageRoutes from "./imageRoutes.js";
import subCategoryRoutes from "../models/subcategory/subcategory.router.js";
import brandRoutes from "../models/brand/brand.router.js";
import authRouter from "../models/auth/auth.router.js";
import attributeRoutes from "../models/attribute/attribute.routes.js";
import productVariantRoutes from "../models/product-variant/product-variant.router.js";
import attributeValueRoutes from "../models/attribute-Value/attribute-value.routes.js";
import newsRoutes from "../models/news/news.router.js";
import bannerRoutes from "../models/banner/banner.router.js";
import voucherRoutes from "../models/voucher/voucher.router.js";
import cartRoutes from "../models/cart/cart.router.js";
import { veriflyUser } from "../common/middleware/veriflyUser.js";
import authenticate from "../common/middleware/authenticate.js";
import authorizeRole from "../common/middleware/authorizeRole.js";
import { userRoles } from "../models/enums.js";

const router = Router();

router.use("/attributes", attributeRoutes);
router.use("/attribute-values", attributeValueRoutes);
router.use("/product-variants", productVariantRoutes);
router.use("/products", productRoutes);
router.use("/categories", categoryRoutes);
router.use("/subcategories", subCategoryRoutes);
router.use("/brands", brandRoutes);
router.use("/uploadImage", imageRoutes);
router.use("/auth", authRouter);
router.use("/news", newsRoutes);
router.use("/vouchers", voucherRoutes);
router.use("/banners", bannerRoutes);
router.use(
  "/carts",
  veriflyUser,
  authenticate,
  authorizeRole(userRoles.MEMBER),
  cartRoutes
);
export default router;
