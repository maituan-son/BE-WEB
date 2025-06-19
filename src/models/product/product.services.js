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

  // 1️⃣ Build filter
  const filter = {};
  if (color) filter.color = color;
  if (size) filter.size = Number(size);
  if (brand) filter.brand = brand;
  if (minPrice) filter.price = { $gte: Number(minPrice) };
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

  // 2️⃣ Pagination
  const skip = (page - 1) * limit;

  // 3️⃣ Query
  const total = await Product.countDocuments(filter);
  const data = await Product.find(filter).skip(skip).limit(Number(limit));

  return {
    total,
    page: Number(page),
    limit: Number(limit),
    totalPages: Math.ceil(total / limit),
    hasNextPage: page < Math.ceil(total / limit),
    hasPrevPage: page > 1,
    products: data,
  };
};
