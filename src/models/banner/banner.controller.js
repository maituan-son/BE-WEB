import Banner from "./banner.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";

export const createBanner = handleAsync(async (req, res, next) => {
  const existing = await Banner.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.BANNER.CREATE_ERROR_EXISTS));
  const data = await Banner.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.BANNER.CREATE_SUCCESS, data)
  );
});

export const getListBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.find();
  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.BANNER.GET_SUCCESS, data));
});

export const getDetailBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.BANNER.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.BANNER.GET_SUCCESS, data));
});

export const updateBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findByIdAndUpdate(req.params.id, req.body);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.BANNER.UPDATE_SUCCESS, data)
    );
  next(createError(false, 404, "Banner update failed!"));
});

export const deleteBanner = handleAsync(async (req, res, next) => {
  const data = await Banner.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.BANNER.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.BANNER.NOT_FOUND));
});

export const softDeleteBanner = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Banner.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.BANNER.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.BANNER.SOFT_DELETE_FAILED));
});

export const restoreBanner = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await Banner.findOneAndUpdate(
      { _id: id, deletedAt: { $ne: null } },
      {
        deletedAt: null,
      }
    );
    return res.json(createResponse(true, 200, MESSAGES.BANNER.RESTORE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.BANNER.RESTORE_FAILED));
});
