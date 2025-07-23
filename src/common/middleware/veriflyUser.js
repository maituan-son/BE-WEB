import { JWT_SECRET_KEY } from "../configs/enviroments.js";
import createError from "../utils/error.js";
import handleAsync from "../utils/handleAsync.js";
import User from "../../models/user/user.model.js";
import jwt from "jsonwebtoken";

export const veriflyUser = handleAsync(async (req, res, next) => {
  console.log("Headers:", req.headers); // Debug

  const authHeader = req.headers.authorization;
  console.log("Auth Header:", authHeader); // Debug

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    console.log("No valid auth header"); // Debug
    return next(createError(401, "Unauthorized: No token provided"));
  }

  const token = authHeader.split(" ")[1];
  console.log("Token extracted:", token ? "Yes" : "No"); // Debug

  if (!token) {
    return next(createError(401, "Unauthorized: No token provided"));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY);
    console.log("Token decoded:", decoded); // Debug

    const user = await User.findById(decoded.id);

    if (!user) {
      console.log("User not found in DB"); // Debug
      return next(createError(404, "User not found"));
    }

    console.log("User authenticated:", user._id); // Debug
    req.user = user;
    next();
  } catch (err) {
    console.log("JWT error:", err.message); // Debug
    return next(createError(401, "Invalid token"));
  }
});
