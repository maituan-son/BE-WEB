import express from "express";
const router = express.Router();
import { authLogin, authRegister } from "./auth.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { registerSchema, loginSchema } from "./auth.schema.js";

router.post("/register", validBodyRequest(registerSchema), authRegister);
router.post("/login", validBodyRequest(loginSchema), authLogin);

export default router;
