import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import User from "../user/user.model.js";
import { userRoles } from "../enums.js";
import { createCartForUser } from "../cart/cart.services.js";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
  JWT_SECRET_KEY_FOR_EMAIL,
  JWT_EXPIRES_IN_FOR_EMAIL,
} from "../../common/configs/enviroments.js";
import mailSender from "../../common/utils/mailSender.js";

export const authRegister = handleAsync(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(createError(400, MESSAGES.AUTH.REGISTER_FAILED));
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(createError(409, MESSAGES.AUTH.EMAIL_ALREADY_EXISTS));
  }

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = new User({
    fullName,
    email,
    password: hashedPassword,
    role: userRoles.MEMBER,
  });

  // veryfy email
  const isVerifyEmailToken = jwt.sign(
    { id: newUser._id, email: newUser.email },
    JWT_SECRET_KEY_FOR_EMAIL,
    { expiresIn: JWT_EXPIRES_IN_FOR_EMAIL }
  );
  const baseUrl = process.env.EMAIL_VERIFY_BASE_URL || "http://localhost:8080";
  const verifyEmailLink = `${baseUrl}/api/auth/verify-email/${isVerifyEmailToken}`;
  const htmlContent = `
    <div style="max-width:480px;margin:0 auto;padding:32px 24px;background:#fff;border-radius:12px;box-shadow:0 2px 16px rgba(60,72,88,0.08);font-family:'Segoe UI',Arial,sans-serif;">
      <div style="text-align:center;">
        <img src="https://cdn-icons-png.flaticon.com/512/561/561127.png" alt="Verify Email" style="width:64px;margin-bottom:16px;">
        <h2 style="color:#222;margin-bottom:8px;">Xác thực email của bạn</h2>
        <p style="color:#555;font-size:16px;margin-bottom:24px;">
          Cảm ơn bạn đã đăng ký! Vui lòng xác thực email của bạn bằng cách nhấn vào nút bên dưới.
        </p>
        <a href="${verifyEmailLink}" style="display:inline-block;padding:12px 32px;background:#2563eb;color:#fff;text-decoration:none;border-radius:6px;font-weight:600;font-size:16px;box-shadow:0 2px 8px rgba(37,99,235,0.12);transition:background 0.2s;">
          Xác thực Email
        </a>
        <p style="color:#888;font-size:13px;margin-top:32px;">
          Nếu bạn không đăng ký tài khoản, vui lòng bỏ qua email này.
        </p>
      </div>
    </div>
  `;
  mailSender(newUser.email, "Xác thực email", htmlContent);
  // Create a cart for the new user

  await newUser.save();
  const cart = await createCartForUser(newUser._id);
  console.log(cart);
  return res.json(
    createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, {
      user: {
        id: newUser._id,
        email: newUser.email,
        isVerifyEmail: false, // hoặc newUser.isVerified nếu đã có field này trong schema
      },
    })
  );
});

export const authLogin = handleAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createError(400, MESSAGES.AUTH.LOGIN_FAILED));
  }

  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(createError(401, MESSAGES.AUTH.LOGIN_FAILED));
  }

  if (!user.isVerifyEmail) {
    return next(
      createError(
        403,
        "Email chưa được xác thực. Vui lòng kiểm tra email để xác thực tài khoản."
      )
    );
  }

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
      token,
      user: {
        id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        avatar: user.avatar, // nếu có
        isVerifyEmail: user.isVerifyEmail, // ⚠️ dòng quan trọng nhất
      },
    })
  );
});

export const authLogout = handleAsync(async (req, res) => {
  // Xóa token ở phía client, không cần thao tác gì ở server
  return res.json(createResponse(true, 200, MESSAGES.AUTH.LOGOUT_SUCCESS));
});
export const authRefreshToken = handleAsync(async (req, res, next) => {
  const { token } = req.body;

  if (!token) {
    return next(createError(400, MESSAGES.AUTH.UNAUTHORIZED));
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return next(createError(401, MESSAGES.AUTH.INVALID_TOKEN));
    }

    const newToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.json(
      createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, {
        token: newToken,
      })
    );
  });
});
export const authChangePassword = handleAsync(async (req, res, next) => {
  const { userId } = req.user; // Lấy userId từ token đã xác thực
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(createError(400, MESSAGES.AUTH.PASSWORD_CHANGE_FAILED));
  }

  const user = await User.findById(userId);
  if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
    return next(createError(401, MESSAGES.AUTH.INVALID_CREDENTIALS));
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(newPassword, salt);
  await user.save();

  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.PASSWORD_CHANGE_SUCCESS)
  );
});
export const authResetPassword = handleAsync(async (req, res, next) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return next(createError(400, MESSAGES.AUTH.PASSWORD_RESET_FAILED));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(404, MESSAGES.USER.NOT_FOUND));
  }

  const salt = bcrypt.genSaltSync(10);
  user.password = bcrypt.hashSync(newPassword, salt);
  await user.save();

  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.PASSWORD_RESET_SUCCESS)
  );
});

export const authFotgotPassword = handleAsync(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    return next(createError(400, MESSAGES.AUTH.PASSWORD_RESET_FAILED));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(404, MESSAGES.USER.NOT_FOUND));
  }

  // Gửi email đặt lại mật khẩu (chưa triển khai)
  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.PASSWORD_RESET_SUCCESS)
  );
});
export const verifyEmail = handleAsync(async (req, res, next) => {
  const { token } = req.params;

  try {
    const decoded = jwt.verify(token, JWT_SECRET_KEY_FOR_EMAIL);
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(createError(404, MESSAGES.USER.NOT_FOUND));
    }

    user.isVerifyEmail = true; // Cần có field isVerifyEmail trong schema
    await user.save();

    return res.json(createResponse(true, 200, "Xác thực email thành công!"));
  } catch (err) {
    return next(
      createError(400, "Link xác thực không hợp lệ hoặc đã hết hạn.")
    );
  }
});
