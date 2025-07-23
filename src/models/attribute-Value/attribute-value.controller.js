import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import createResponse from "../../common/utils/response.js";
import createError from "../../common/utils/error.js";
import AttributeValue from "./attribute-value.model.js";
import Attribute from "../attribute/attribute.model.js";
import mongoose from "mongoose";
export const createAttributeValue = handleAsync(async (req, res, next) => {
  let { value, attributeId, valueCode } = req.body;

  const isObjectId = /^[a-f\d]{24}$/i.test(attributeId);
  if (!isObjectId) {
    const attribute = await Attribute.findOne({ attributeName: attributeId });
    if (!attribute) {
      return next(createError(400, "Không tìm thấy thuộc tính."));
    }
    attributeId = attribute._id;
  }

  // Nếu chưa có valueCode, tự sinh
  if (!valueCode) {
    valueCode = slugify(value, { lower: true, strict: true });
  }

  const existing = await AttributeValue.findOne({ value, attributeId });
  if (existing) {
    return next(createError(400, MESSAGES.ATTRIBUTE_VALUE.CREATE_ERROR_EXISTS));
  }

  const data = await AttributeValue.create({ value, valueCode, attributeId });

  return res.json(
    createResponse(true, 201, MESSAGES.ATTRIBUTE_VALUE.CREATE_SUCCESS, data)
  );
});

export const getListByIdAttribute = handleAsync(async (req, res, next) => {
  if (!req.params.id) {
    throw createError(400, "ID không được để trống.");
  }
  const listAttributeValue = await AttributeValue.find({
    attributeId: req.params.id,
  });
  return res.json(
    createResponse(
      true,
      200,
      MESSAGES.ATTRIBUTE_VALUE.GET_SUCCESS,
      listAttributeValue
    )
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
  const { id } = req.params;

  // ✅ Kiểm tra xem id có tồn tại và hợp lệ không
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return next(createError(400, "ID không hợp lệ hoặc bị thiếu."));
  }

  // ✅ Tiến hành cập nhật
  const data = await AttributeValue.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (data) {
    return res.json(
      createResponse(true, 200, MESSAGES.ATTRIBUTE_VALUE.UPDATE_SUCCESS, data)
    );
  }

  return next(createError(404, MESSAGES.ATTRIBUTE_VALUE.NOT_FOUND));
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
