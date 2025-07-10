import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import Product from "./product.model.js";
import paginate from "../../common/utils/paginate.js";
import search from "../../common/utils/search.js";

export const createProduct = handleAsync(async (req, res, next) => {
  const existing = await Product.findOne({ name: req.body.name });
  if (existing)
    return next(createError(400, MESSAGES.PRODUCT.CREATE_ERROR_EXISTS));
  const data = await Product.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT.CREATE_SUCCESS, data)
  );
});

export const getAllProducts = handleAsync(async (req, res, next) => {
  const isTrash = req.query.trash === "true";
  const { page, limit, skip } = paginate(req);
  const searchFilter = search(req, ["name", "description"]); // tìm theo các field này

  const baseFilter = isTrash
    ? { deletedAt: { $ne: null } }
    : { deletedAt: null };
  const finalFilter = { ...baseFilter, ...searchFilter };

  const total = await Product.countDocuments(finalFilter);
  const data = await Product.find(finalFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, {
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

export const getProductById = handleAsync(async (req, res, next) => {
  const data = await Product.findById(req.params.id);
  if (!data) {
    return next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT.GET_SUCCESS, data)
  );
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const data = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (data) {
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT.UPDATE_SUCCESS, data)
    );
  }
  next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
});

export const deleteProduct = handleAsync(async (req, res, next) => {
  const data = await Product.findByIdAndDelete(req.params.id);
  if (data) {
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT.DELETE_SUCCESS, data)
    );
  }
  next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
});

export const softDeleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Product.findByIdAndUpdate(
      { id, deletedAt: null },
      { deletedAt: new Date() }
    );
    if (data) {
      return res.json(
        createResponse(true, 200, MESSAGES.PRODUCT.SOFT_DELETE_SUCCESS, data)
      );
    }
  }
  next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
});

export const restoreProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Product.findByIdAndUpdate(
      id,
      { deletedAt: null },
      { new: true }
    );
    if (data) {
      return res.json(
        createResponse(true, 200, MESSAGES.PRODUCT.RESTORE_SUCCESS, data)
      );
    }
  }
  next(createError(404, MESSAGES.PRODUCT.NOT_FOUND));
});
