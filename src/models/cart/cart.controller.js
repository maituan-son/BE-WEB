import handleAsync from "../../common/utils/handleAsync.js";
import Cart from "./cart.model.js";

export const updateCart = handleAsync(async (req, res, next) => {
  const user = req.user;
  const cartId = req.params.id;
  const { items } = req.body;

  const cart = await Cart.findOneAndUpdate(
    { _id: cartId, user: user._id },
    { items },
    { new: true }
  );

  if (!cart) {
    return res.status(404).json(createError(404, "Cart not found"));
  }

  res.status(200).json(cart);
});
export const getCart = handleAsync(async (req, res, next) => {});

export const deleteCart = handleAsync(async (req, res, next) => {});
