import createError from "../../common/configs/utils/error.js";
import handleAsync from "../../common/configs/utils/handleAsync.js";
import createResponse from "../../common/configs/utils/response.js";
import Product from "./product.model.js";
import {
  productSchema,
  updateProductSchema,
} from "../../validation/product.js";

export const getAllProducts = handleAsync(async (req, res) => {
  const products = await Product.find({ deleteAt: null });
  return res.json(
    createResponse(true, 200, "Products fetched successfully", products)
  );
});

export const getProductById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Product ID is required"));
  }

  const product = await Product.findById(id);
  if (!product || product.deleteAt) {
    return next(createError(404, "Product not found"));
    I;
  }

  return res.json(
    createResponse(true, 200, "Product fetched successfully", product)
  );
});

export const createProduct = handleAsync(async (req, res, next) => {
  console.log("CreateProduct req.body:", req.body);

  // Normalize brand and sizes to arrays if they are not already
  if (req.body.brand && !Array.isArray(req.body.brand)) {
    req.body.brand = [req.body.brand];
  }
  if (req.body.sizes && !Array.isArray(req.body.sizes)) {
    req.body.sizes = [req.body.sizes];
  }
  // Convert sizes elements to numbers if they are strings
  if (req.body.sizes) {
    req.body.sizes = req.body.sizes.map((size) =>
      typeof size === "string" ? Number(size) : size
    );
  }

  // Handle uploaded files and extract URLs
  if (req.files && req.files.length > 0) {
    // Assuming multer-storage-cloudinary sets file.path to the URL
    req.body.images = req.files.map((file) => file.path);
  }

  const validation = productSchema.safeParse(req.body);
  if (!validation.success) {
    const errorMessages = validation.error.errors
      .map((e) => e.message)
      .join("; ");
    return next(createError(400, errorMessages));
  }

  const newProduct = new Product(req.body);
  await newProduct.save();

  return res.json(
    createResponse(true, 201, "Product created successfully", newProduct)
  );
});

export const updateProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Product ID is required"));
  }

  // Normalize brand and sizes to arrays if they are not already
  if (req.body.brand && !Array.isArray(req.body.brand)) {
    req.body.brand = [req.body.brand];
  }
  if (req.body.sizes && !Array.isArray(req.body.sizes)) {
    req.body.sizes = [req.body.sizes];
  }

  const validation = updateProductSchema.safeParse(req.body);
  if (!validation.success) {
    return next(createError(400, validation.error.errors[0].message));
  }

  const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  if (!updatedProduct || updatedProduct.deleteAt) {
    return next(createError(404, "Product not found"));
  }

  return res.json(
    createResponse(true, 200, "Product updated successfully", updatedProduct)
  );
});

export const deleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Product ID is required"));
  }

  const deletedProduct = await Product.findByIdAndDelete(id);
  if (!deletedProduct || deletedProduct.deleteAt) {
    return next(createError(404, "Product not found"));
  }

  return res.json(
    createResponse(true, 200, "Product deleted successfully", deletedProduct)
  );
});

export const softDeleteProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Product ID is required"));
  }

  await Product.findByIdAndUpdate(id, { deleteAt: new Date() });
  return res.json(createResponse(true, 200, "Product hidden successfully"));
});

export const restoreProduct = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "Product ID is required"));
  }

  const restoredProduct = await Product.findByIdAndUpdate(
    id,
    { deleteAt: null },
    { new: true }
  );
  if (!restoredProduct) {
    return next(createError(404, "Product not found"));
  }

  return res.json(
    createResponse(true, 200, "Product restored successfully", restoredProduct)
  );
});
