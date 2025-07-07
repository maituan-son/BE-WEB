import { Router } from "express";
import {
  createVoucher,
  deleteVoucher,
  getDetailVoucher,
  getListVoucher,
  softDeleteVoucher,
  updateVoucher,
  restoreVoucher,
} from "./voucher.controller.js";
import validBodyRequest from "../../common/middleware/validBodyRequest.js";
import { voucherSchema } from "./voucher.schema.js";

const voucherRoutes = Router();

voucherRoutes.get("/", getListVoucher);
voucherRoutes.get("/:id", getDetailVoucher);
voucherRoutes.delete("/:id", deleteVoucher);
voucherRoutes.delete("/soft-delete/:id", softDeleteVoucher);
voucherRoutes.patch("/restore/:id", restoreVoucher);
voucherRoutes.use(validBodyRequest(voucherSchema));
voucherRoutes.post("/", createVoucher);
voucherRoutes.patch("/:id", updateVoucher);
export default voucherRoutes;
