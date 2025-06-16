import { Route } from "express";
import {
  createUser,
  deleteUser,
  getDetailUser,
  getListUser,
  softDeleteUser,
  updateUser,
} from "./user.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { userSchema } from "./user.schema.js";
const userRoutes = Route();
userRoutes.get("/", getListUser);
userRoutes.post("/", validBodyRequest(userSchema), createUser);
userRoutes.get("/:id", getDetailUser);
userRoutes.put("/:id", validBodyRequest(userSchema), updateUser);
userRoutes.delete("/:id", deleteUser);
userRoutes.patch("/:id/soft-delete", softDeleteUser);
export default userRoutes;
