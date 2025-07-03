import Category from "./category.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import paginate from "../../common/utils/paginate.js";
import search from "../../common/utils/search.js";

export const createCategory = handleAsync(async (req, res, next) => {
  const existing = await Category.findOne({ title: req.body.title });
  if (existing)
    return next(createError(400, MESSAGES.CATEGORY.CREATE_ERROR_EXISTS));
  const data = await Category.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.CATEGORY.CREATE_SUCCESS, data)
  );
});

export const getListCategory = handleAsync(async (req, res, next) => {
  const isTrash = req.query.trash === "true";
  const { page, limit, skip } = paginate(req);
  const searchFilter = search(req, ["title", "description"]); // tìm theo các field này

  const baseFilter = isTrash
    ? { deletedAt: { $ne: null } }
    : { deletedAt: null };
  const finalFilter = { ...baseFilter, ...searchFilter };

  const total = await Category.countDocuments(finalFilter);
  const data = await Category.find(finalFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.CATEGORY.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS, {
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

export const getDetailCategory = handleAsync(async (req, res, next) => {
  const data = await Category.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.CATEGORY.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.CATEGORY.GET_SUCCESS, data)
  );
});

export const updateCategory = handleAsync(async (req, res, next) => {
  const data = await Category.findByIdAndUpdate(req.params.id, req.body);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.UPDATE_SUCCESS, data)
    );
  next(createError(false, 404, "Category update failed!"));
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findByIdAndDelete(id);
    if (data) {
      return res.json(
        createResponse(true, 200, MESSAGES.CATEGORY.DELETE_SUCCESS, data)
      );
    }
    next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
  } else {
    next(createError(false, 404, MESSAGES.CATEGORY.NOT_FOUND));
  }
});

export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await Category.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      },
      {
        new: true,
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.SOFT_DELETE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.SOFT_DELETE_FAILED));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  if (id) {
    const data = await Category.findOneAndUpdate(
      { _id: id },
      {
        deletedAt: null,
      },
      { new: true }
    );

    console.log(data);
    // ne = not equal
    return res.json(
      createResponse(true, 200, MESSAGES.CATEGORY.RESTORE_SUCCESS, data)
    );
  }
  next(createError(false, 404, MESSAGES.CATEGORY.RESTORE_FAILED));
});
