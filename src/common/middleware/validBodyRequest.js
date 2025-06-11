import z from "zod";
import createError from "../configs/utils/error";

const validateRequestBody = (schema) => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.errors.map((err) => err.message);
      return next(createError(400, "Invalid request body", errors));
    }
    next();
  };
};

export default validateRequestBody;
