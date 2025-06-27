import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import createResponse from "../../common/utils/response.js";
import createError from "../../common/utils/error.js";
import AttributeValue from "./attribute-value.model.js";
export const createAttributeValue = handleAsync(async (req, res, next) => {
  const existing = await AttributeValue.findOne({
    value: req.body.value,
    attributeId: req.body.attributeId,
  });
  if (existing)
    return next(createError(400, MESSAGES.ATTRIBUTE_VALUE.CREATE_ERROR_EXISTS));
  const data = await AttributeValue.create(req.body);
  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE_VALUE.CREATE_SUCCESS, data)
  );
});
export const getListAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.find().populate("attributeId");
  if (!data || data.length === 0) {
    return next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS, data)
  );
});
export const getDetailAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.findById(req.params.id).populate(
    "attributeId"
  );
  if (!data) {
    return next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
  }
  return res.json(
    createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS, data)
  );
});
export const updateAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.UPDATE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
});
export const deleteAttributeValue = handleAsync(async (req, res, next) => {
  const data = await AttributeValue.findByIdAndDelete(req.params.id);
  if (data)
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.DELETE_SUCCESS, data)
    );
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
});
export const softDeleteAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    await AttributeValue.findOneAndUpdate(
      { _id: id, deletedAt: null },
      {
        deletedAt: new Date(),
      }
    );
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.SOFT_DELETE_SUCCESS)
    );
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
});
export const restoreAttributeValue = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await AttributeValue.findByIdAndUpdate(
      id,
      { deletedAt: null },
      { new: true }
    );
    if (data) {
      return res.json(
        createResponse(
          true,
          200,
          MESSAGES.ATTRIBUTE_VALUE.RESTORE_SUCCESS,
          data
        )
      );
    }
  }
  next(createError(false, 404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
});
