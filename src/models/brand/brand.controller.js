import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import Brand from "./brand.model.js";

export const createBrand = handleAsync(async (req, res, next) => {
  const existing = await Brand.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.BRAND.CREATE_ERROR_EXISTS));
  const data = await Brand.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.BRAND.CREATE_SUCCESS, data)
  );
});
export const getListBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.find().lean();
  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.BRAND.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_SUCCESS, data));
});
export const getDetailBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.BRAND.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.BRAND.GET_SUCCESS, data));
});
export const updateBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findByIdAndUpdate(req.params.id, req.body);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.BRAND.UPDATE_SUCCESS, data)
    );
  next(createError(404, "Brand update failed!"));
});
export const deleteBrand = handleAsync(async (req, res, next) => {
  const data = await Brand.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.BRAND.DELETE_SUCCESS, data)
    );
  next(createError(404, MESSAGES.BRAND.NOT_FOUND));
});
export const softDeleteBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.BRAND.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(400, MESSAGES.BRAND.SOFT_DELETE_ERROR));
});
export const restoreBrand = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Brand.findOneAndUpdate(
      { _id: id, deletedAt: { $ne: null } },
      {
        deletedAt: null,
      }
    );
    return res.json(createResponse(true, 200, MESSAGES.BRAND.RESTORE_SUCCESS));
  }
  next(createError(400, MESSAGES.BRAND.RESTORE_ERROR));
});
