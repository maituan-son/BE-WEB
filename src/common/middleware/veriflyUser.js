import { JWT_SECRET_KEY } from "../configs/enviroments.js";
import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import User from "../../models/user/user.model.js";
import jwt from "jsonwebtoken";

export const veriflyUser = handleAsync(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1]; // Extract token from Authorization header
  if (!token) {
    return res
      .status(401)
      .json(createError(401, "Unauthorized: No token provided"));
  }
  const decoded = jwt.verify(token, JWT_SECRET_KEY, function (err, decoded) {
    if (err) {
      return res.status(401).json(createError(401, "Invalid token"));
    }
    return decoded;
  });

  const user = await User.findById(decoded.id);
  if (!user) {
    return res.status(404).json(createError(404, "User not found"));
  }
  req.user = user;
  next();
});
