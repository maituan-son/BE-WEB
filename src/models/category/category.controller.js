import createError from "../../common/configs/utils/error.js";
import handleAsync from "../../common/configs/utils/handleAsync.js";
import createResponse from "../../common/configs/utils/response.js";
import Category from "./category.model.js";

export const getAllCategories = handleAsync(async (req, res) => {
  const categories = await Category.find({ deleteAt: null });
  return res.json(
    createResponse(true, 200, "Categories fetched successfully", categories)
  );
});
export const getCategoryById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Category ID is required"));
  }

  const category = await Category.findById(id);
  if (!category || category.deleteAt) {
    return next(createError(404, "Category not found"));
  }

  return res.json(
    createResponse(true, 200, "Category fetched successfully", category)
  );
});
export const createCategory = handleAsync(async (req, res) => {
  const { title, description, slug } = req.body;
  if (!title) {
    return res
      .status(400)
      .json(createResponse(false, 400, "title is required"));
  }

  const newCategory = new Category({ title, description, slug });
  await newCategory.save();

  return res.json(
    createResponse(true, 201, "Category created successfully", newCategory)
  );
});
export const updateCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Category ID is required"));
  }

  const { title, description, slug } = req.body;
  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    { title, description, slug },
    { new: true }
  );

  if (!updatedCategory || updatedCategory.deleteAt) {
    return next(createError(404, "Category not found"));
  }

  return res.json(
    createResponse(true, 200, "Category updated successfully", updatedCategory)
  );
});

export const deleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Category ID is required"));
  }

  const deletedCategory = await Category.findByIdAndDelete(id);
  if (!deletedCategory || deletedCategory.deleteAt) {
    return next(createError(404, "Category not found"));
  }

  return res.json(
    createResponse(true, 200, "Category deleted successfully", deletedCategory)
  );
});
export const softDeleteCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    await Category.findByIdAndUpdate(id, { deleteAt: new Date() });
    return res.json(createResponse(true, 200, "hidden category successfully"));
  }
  next(createError(400, "Category ID is required"));
});

export const restoreCategory = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Category ID is required"));
  }

  const restoredCategory = await Category.findByIdAndUpdate(
    id,
    { deleteAt: null },
    { new: true }
  );
  if (!restoredCategory) {
    return next(createError(404, "Category not found"));
  }

  return res.json(
    createResponse(
      true,
      200,
      "Category restored successfully",
      restoredCategory
    )
  );
});
