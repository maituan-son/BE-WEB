import createError from "./error.js";

const handleAsync = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch((error) =>
    next(createError(500, error.message || "Internal Server Error"))
  );
};

export default handleAsync;
