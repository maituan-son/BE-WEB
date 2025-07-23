import handleAsync from "../../common/utils/handleAsync.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import Cart from "./cart.model.js";
import Product from "../product/product.model.js";
export const updateCart = handleAsync(async (req, res, next) => {
  const user = req.user;
  const itemId = req.params.itemId;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return next(createError(400, "Số lượng không hợp lệ"));
  }

  const cart = await Cart.findOne({ user: user._id });
  if (!cart) return next(createError(404, "Không tìm thấy giỏ hàng"));

  const item = cart.items.id(itemId); // <-- Tìm item theo _id
  if (!item) return next(createError(404, "Không tìm thấy sản phẩm trong giỏ"));

  item.quantity = quantity;
  await cart.save();

  return res.json(
    createResponse(true, 200, "Cập nhật sản phẩm thành công", cart)
  );
});

export const getCart = handleAsync(async (req, res, next) => {
  const user = req.user;

  const cart = await Cart.findOne({ user: user._id }).populate("items.product");

  if (!cart) {
    return next(createError(404, "Không tìm thấy giỏ hàng"));
  }

  res.status(200).json({
    message: "Lấy giỏ hàng thành công",
    data: cart,
  });
});

export const deleteCart = handleAsync(async (req, res, next) => {
  const user = req.user;

  const cart = await Cart.findOneAndDelete({ user: user._id });

  if (!cart) {
    return next(createError(404, "Không tìm thấy giỏ hàng để xóa"));
  }

  return res.json(createResponse(true, 200, "Xóa giỏ hàng thành công", cart));
});
export const addToCart = handleAsync(async (req, res, next) => {
  const user = req.user;
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return next(createError(400, "Product ID là bắt buộc"));
  }

  // Tìm cart của user hoặc tạo mới
  let cart = await Cart.findOne({ user: user._id });

  if (!cart) {
    cart = new Cart({
      user: user._id,
      items: [],
    });
  }

  // Kiểm tra xem sản phẩm đã có trong giỏ chưa
  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    // Nếu đã có thì cập nhật số lượng
    cart.items[existingItemIndex].quantity += quantity;
  } else {
    // Nếu chưa có thì thêm mới
    cart.items.push({
      product: productId,
      quantity,
    });
  }

  await cart.save();

  // Populate để trả về thông tin đầy đủ
  await cart.populate("items.product");

  return res.json(
    createResponse(true, 200, "Thêm sản phẩm vào giỏ hàng thành công", cart)
  );
});
