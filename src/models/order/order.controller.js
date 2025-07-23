import Order from "./order.model.js";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import paginate from "../../common/utils/paginate.js";
import search from "../../common/utils/search.js";
import PayOS from "@payos/node";
import {
  PAYOS_API_KEY,
  PAYOS_CHECKSUM_KEY,
  PAYOS_CLIENT_ID,
} from "../../common/configs/enviroments.js";
import { log } from "console";

const payOS = new PayOS(PAYOS_CLIENT_ID, PAYOS_API_KEY, PAYOS_CHECKSUM_KEY);
const fekedata = [
  {
    id: 1,
    name: "Mi tom hao hao",
    price: 2000,
    quantity: 1,
  },
];

export const creatPayosOrder = handleAsync(async (req, res) => {
  const ordercode = Number(String(Date.now()).slice(-4));
  const body = {
    orderCode: ordercode,
    amount: 2000,
    description: "Thanh toan don hang",
    items: [...fekedata],
    cancelUrl: "http://localhost:3000/cancel.html",
    returnUrl: "http://localhost:3000/success.html",
  };

  const paymentLinkRes = await payOS.createPaymentLink(body);
  return res
    .status(200)
    .json(createResponse(true, 200, "Thanh Toán thành công", paymentLinkRes));
});

export const returnPayosOrder = handleAsync(async (req, res, next) => {
  const query = req.query;
  if (query.code === "00" && query.status === "PAID") {
    const foundOrder = await Order.findOne({
      orderCode: query.orderCode,
      isPaid: false,
    });
    if (!foundOrder) {
      return res.redirect(`http://localhost:3000/checkout/error`);
    }
    foundOrder.isPaid = true;
    await foundOrder.save();
    return res.redirect(`http://localhost:3000/checkout/success`);
  } else {
    return res.redirect("http://localhost:3000/checkout/error");
  }
});

export const confirmWebhook = async (url) => {
  try {
    await payOS.confirmWebhook(url);
  } catch (error) {
    console.log("Error confirming webhook:", error);
  }
};

export const handlPayosWebook = handleAsync(async (req, res) => {
  const payosCode = 123;
  const body = req.body;
  if (body?.data.ordercode === payosCode) {
    const webhookData = payOS.verifyPaymentWebhookData(body);
    if (webhookData.ocde === "00" && webhookData.desc === "success") {
      const foundOrder = await Order.findOne({
        orderCode: webhookData.ordercode,
        isPaid: false,
      });
      if (!foundOrder) {
        return res
          .status(404)
          .json(createResponse(false, 404, "Order not found"));
      }
      foundOrder.isPaid = true;
      await foundOrder.save();
      return res
        .status(200)
        .json(createResponse(true, 200, "Payment successful"));
    }
  }
  return res.status(200).json(null);
});
