import News from "./news.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import paginate from "../../common/utils/paginate.js";
import search from "../../common/utils/search.js";
export const createNews = handleAsync(async (req, res, next) => {
  const existing = await News.findOne({ slug: req.body.slug });
  if (existing)
    return next(createError(400, MESSAGES.NEWS.CREATE_ERROR_EXISTS));
  const data = await News.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.NEWS.CREATE_SUCCESS, data)
  );
});
export const getListNews = handleAsync(async (req, res, next) => {
  const isTrash = req.query.trash === "true";
  const { page, limit, skip } = paginate(req);
  const searchFilter = search(req, ["title", "content"]); // tìm theo các field này

  const baseFilter = isTrash
    ? { deletedAt: { $ne: null } }
    : { deletedAt: null };
  const finalFilter = { ...baseFilter, ...searchFilter };

  const total = await News.countDocuments(finalFilter);
  const data = await News.find(finalFilter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.NEWS.NOT_FOUND));
  }

  return res.json(
    createResponse(true, 200, MESSAGES.NEWS.GET_SUCCESS, {
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
export const getDetailNews = handleAsync(async (req, res, next) => {
  const data = await News.findById(req.params.id);
  if (!data) {
    next(createError(404, MESSAGES.NEWS.NOT_FOUND));
  }
  return res.json(createResponse(true, 200, MESSAGES.NEWS.GET_SUCCESS, data));
});
export const updateNews = handleAsync(async (req, res, next) => {
  const data = await News.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.NEWS.UPDATE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.NEWS.UPDATE_ERROR));
});
export const deleteNews = handleAsync(async (req, res, next) => {
  const data = await News.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.NEWS.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.NEWS.NOT_FOUND));
});
export const softDeleteNews = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await News.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.NEWS.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.NEWS.SOFT_DELETE_FAILED));
});
export const restoreNews = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await News.findOneAndUpdate(
      { _id: id, deletedAt: { $ne: null } },
      {
        deletedAt: null,
      }
    );
    return res.json(createResponse(true, 200, MESSAGES.NEWS.RESTORE_SUCCESS));
  }
  next(createError(false, 404, MESSAGES.NEWS.RESTORE_FAILED));
});
