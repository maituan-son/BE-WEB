import { Router } from "express";
import {
  createAttribute,
  deleteAttribute,
  getAllAttributeByProduct,
  getAttributeById,
  restoreAttribute,
  softDeleteAttribute,
  updateAttribute,
} from "./attribute.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { attributeSchema } from "./attribute.schema.js";

const attributeRoutes = Router();
attributeRoutes.get("/", getAllAttributeByProduct);
attributeRoutes.get("/:id", getAttributeById);

//route admin
attributeRoutes.delete("/:id", deleteAttribute);
attributeRoutes.delete("/soft-delete/:id", softDeleteAttribute);
attributeRoutes.patch("/restore/:id", restoreAttribute);

attributeRoutes.use(validBodyRequest(attributeSchema));
attributeRoutes.post("/", createAttribute);
attributeRoutes.patch("/:id", updateAttribute);

export default attributeRoutes;
