import createError from "../utils/error.js";
import { JWT_SECRET_KEY } from "../configs/enviroments.js";
import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(createError(401, "Unauthorized access"));
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    rep.user = {
      id: decoded.id,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json(createError(401, "Invalid token"));
  }
};
export default authenticate;
