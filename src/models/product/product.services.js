import Product from "./product.model.js";

export const getProducts = async (query) => {
  const {
    page = 1,
    limit = 20,
    color,
    size,
    brand,
    q,
    minPrice,
    maxPrice,
  } = query;

  // ✅ ÉP KIỂU
  const pageNumber = Number(page) || 1;
  const limitNumber = Number(limit) || 20;

  // ✅ BUILD FILTER
  const filter = {};
  if (color) filter.color = color;
  if (size) filter.size = Number(size);
  if (brand) filter.brand = brand;

  if (minPrice) {
    filter.price = { $gte: Number(minPrice) };
  }

  if (maxPrice) {
    filter.price = {
      ...filter.price,
      $lte: Number(maxPrice),
    };
  }

  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { description: { $regex: q, $options: "i" } },
    ];
  }

  // ✅ PAGINATION
  const skip = (pageNumber - 1) * limitNumber;

  // ✅ QUERY
  const total = await Product.countDocuments(filter);
  const data = await Product.find(filter).skip(skip).limit(limitNumber);

  // ✅ RETURN RESULT
  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    hasNextPage: pageNumber < Math.ceil(total / limitNumber),
    hasPrevPage: pageNumber > 1,
    products: data,
  };
};
