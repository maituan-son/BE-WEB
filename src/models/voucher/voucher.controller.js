import Voucher from "./voucher.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import paginate from "../../common/utils/paginate.js";
import search from "../../common/utils/search.js";

export const createVoucher = handleAsync(async (req, res, next) => {
  const existing = await Voucher.findOne({ code: req.body.code });
  if (existing)
    return next(createError(400, MESSAGES.VOUCHER.CREATE_ERROR_EXISTS));
  const data = await Voucher.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.VOUCHER.CREATE_SUCCESS, data)
  );
});
export const getListVoucher = handleAsync(async (req, res, next) => {
  const isTrash = req.query.trash === "true";
  const { page, limit, skip } = paginate(req);
  const searchFilter = search(req, ["code"]); // tìm theo các field này

  const baseFilter = isTrash
    ? { deletedAt: { $ne: null } }
    : { deletedAt: null };
  const finalFilter = { ...baseFilter, ...searchFilter };

  const total = await Voucher.countDocuments(finalFilter);
  const data = await Voucher.find(finalFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.VOUCHER.GET_SUCCESS, {
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  );
});
export const getDetailVoucher = handleAsync(async (req, res, next) => {
  const data = await Voucher.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.VOUCHER.GET_SUCCESS, data)
  );
});
export const updateVoucher = handleAsync(async (req, res, next) => {
  const data = await Voucher.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!data) {
    return next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.VOUCHER.UPDATE_SUCCESS, data)
  );
});
export const deleteVoucher = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Voucher.findByIdAndDelete(id);
  if (!data) {
    return next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.VOUCHER.DELETE_SUCCESS, data)
  );
});
export const restoreVoucher = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  const data = await Voucher.findByIdAndUpdate(
    id,
    { deletedAt: null },
    { new: true }
  );
  if (!data) {
    return next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.VOUCHER.RESTORE_SUCCESS, data)
  );
});
export const softDeleteVoucher = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Voucher.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      },
      {
        new: true,
        runValidators: true,
      }
    );
    if (!data) {
      return next(createError(404, MESSAGES.VOUCHER.NOT_FOUND));
    }
    return res.json(
      createResponse(true, 200, MESSAGES.VOUCHER.SOFT_DELETE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.VOUCHER.SOFT_DELETE_FAILED));
});
