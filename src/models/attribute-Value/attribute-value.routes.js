import { Router } from "express";
import {
  createAttributeValue,
  deleteAttributeValue,
  getDetailAttributeValue,
  getListAttributeValue,
  softDeleteAttributeValue,
  updateAttributeValue,
  restoreAttributeValue,
} from "./attribute-value.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import attributeValueSchema from "./attribute-value.schema.js";

const attributeValueRoutes = Router();
attributeValueRoutes.get("/", getListAttributeValue);
attributeValueRoutes.get("/:id", getDetailAttributeValue);
attributeValueRoutes.delete("/:id", deleteAttributeValue);
attributeValueRoutes.delete("/soft-delete/:id", softDeleteAttributeValue);
attributeValueRoutes.patch("/restore/:id", restoreAttributeValue);
attributeValueRoutes.use(validBodyRequest(attributeValueSchema));
attributeValueRoutes.post("/", createAttributeValue);
attributeValueRoutes.patch("/:id", updateAttributeValue);

export default attributeValueRoutes;
