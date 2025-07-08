import createError from "../utils/error.js";

const authorizeRole = (roles) => {
  return (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role)) {
      return res.status(403).json(createError(403, "Forbidden"));
    }
    next();
  };
};
export default authorizeRole;
