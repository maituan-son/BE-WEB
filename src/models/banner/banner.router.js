import { Router } from "express";
import {
  createBanner,
  deleteBanner,
  getDetailBanner,
  getListBanner,
  softDeleteBanner,
  updateBanner,
  restoreBanner,
} from "./banner.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { bannerSchema } from "./banner.schema.js";

const bannerRoutes = Router();

bannerRoutes.get("/", getListBanner);

bannerRoutes.get("/:id", getDetailBanner);
bannerRoutes.delete("/:id", deleteBanner);
bannerRoutes.delete("/soft-delete/:id", softDeleteBanner);
bannerRoutes.patch("/restore/:id", restoreBanner);

bannerRoutes.use(validBodyRequest(bannerSchema));
bannerRoutes.post("/", createBanner);
bannerRoutes.patch("/:id", updateBanner);

export default bannerRoutes;
