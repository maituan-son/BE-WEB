import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import createResponse from "../../common/utils/response.js";
import createError from "../../common/utils/error.js";
import Attribute from "./attribute.model.js";

export const getAllAttributeByProduct = handleAsync(async (req, res, next) => {
  const data = await Attribute.find();

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.ATTRIBUTE.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_SUCCESS, data)
  );
});
export const getAttributeById = handleAsync(async (req, res, next) => {
  const data = await Attribute.findById(req.params.id);
  if (!data) {
    return next(createError(404, MESSAGES.ATTRIBUTE.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE.GET_SUCCESS, data)
  );
});
export const createAttribute = handleAsync(async (req, res, next) => {
  const existing = await Attribute.findOne({
    attributeName: req.body.attributeName,
  });
  if (existing)
    return next(createError(400, MESSAGES.ATTRIBUTE.CREATE_ERROR_EXISTS));
  const data = await Attribute.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE.CREATE_SUCCESS, data)
  );
});
export const updateAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.findByIdAndUpdate(req.params.id, req.body);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.UPDATE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE.NOT_FOUND));
});
export const deleteAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE.NOT_FOUND));
});
export const restoreAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.findByIdAndUpdate(
    req.params.id,
    { deletedAt: null },
    { new: true }
  );
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.RESTORE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE.NOT_FOUND));
});
export const softDeleteAttribute = handleAsync(async (req, res, next) => {
  const data = await Attribute.findByIdAndUpdate(
    req.params.id,
    { deletedAt: Date.now(), deletedBy: req.userId },
    { new: true }
  );
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE.SOFT_DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE.NOT_FOUND));
});
