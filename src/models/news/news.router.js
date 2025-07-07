import { Router } from "express";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { NewsSchema } from "./news.schema.js";
import {
  createNews,
  deleteNews,
  getDetailNews,
  getListNews,
  restoreNews,
  softDeleteNews,
  updateNews,
} from "./news.controller.js";

const newsRoutes = Router();

newsRoutes.get("/", getListNews);

newsRoutes.get("/:id", getDetailNews);
newsRoutes.delete("/:id", deleteNews);
newsRoutes.patch("/soft-delete/:id", softDeleteNews);
newsRoutes.patch("/restore/:id", restoreNews);
newsRoutes.use(validBodyRequest(NewsSchema));
newsRoutes.post("/", createNews);
newsRoutes.patch("/:id", updateNews);

export default newsRoutes;
