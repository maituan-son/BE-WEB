import nodeemailer from "nodemailer";
import createError from "./error.js";
import { EMAIL_PASSWORD } from "../configs/enviroments.js";

const mailSender = async (email, subject, html) => {
  const transporter = nodeemailer.createTransport({
    service: "gmail",
    auth: {
      user: "maituanson382003@gmail.com",
      pass: EMAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: "SonDaiLY",
      to: email,
      subject,
      html,
    });
  } catch (error) {
    createError(500, "Gửi email thất bại, vui lòng thử lại sau");
  }
};
export default mailSender;
