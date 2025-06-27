import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import ProductVariant from "./product-variant.model.js";

export const createProductVariant = handleAsync(async (req, res, next) => {
  const existing = await ProductVariant.findOne({
    productId: req.body.productId,
    attributeValues: req.body.attributeValues,
  });
  if (existing)
    return next(createError(400, MESSAGES.PRODUCT_VARIANT.CREATE_ERROR_EXISTS));

  const data = await ProductVariant.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.PRODUCT_VARIANT.CREATE_SUCCESS, data)
  );
});
export const getListProductVariant = handleAsync(async (req, res, next) => {
  const data = await ProductVariant.find().populate(
    "productId attributeValues"
  );
  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT_VARIANT.GET_SUCCESS, data)
  );
});
export const getDetailProductVariant = handleAsync(async (req, res, next) => {
  const data = await ProductVariant.findById(req.params.id).populate(
    "productId attributeValues"
  );
  if (!data) {
    return next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.PRODUCT_VARIANT.GET_BY_ID_SUCCESS, data)
  );
});
export const updateProductVariant = handleAsync(async (req, res, next) => {
  const data = await ProductVariant.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (data) {
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT_VARIANT.UPDATE_SUCCESS, data)
    );
  }
  next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
});
export const deleteProductVariant = handleAsync(async (req, res, next) => {
  const data = await ProductVariant.findByIdAndDelete(req.params.id);
  if (data) {
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT_VARIANT.DELETE_SUCCESS, data)
    );
  }
  next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
});
export const softDeleteProductVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await ProductVariant.findOneAndUpdate(
      { _id: id, deletedAt: null },
      { deletedAt: new Date() }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.PRODUCT_VARIANT.DELETE_SUCCESS)
    );
  }
  next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
});
export const restoreProductVariant = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await ProductVariant.findOneAndUpdate(
      { _id: id, deletedAt: { $ne: null } },
      { deletedAt: null },
      { new: true }
    );
    if (data) {
      return res.json(
        createResponse(
          true,
          200,
          MESSAGES.PRODUCT_VARIANT.GET_BY_ID_SUCCESS,
          data
        )
      );
    }
  }
  next(createError(404, MESSAGES.PRODUCT_VARIANT.NOT_FOUND));
});
