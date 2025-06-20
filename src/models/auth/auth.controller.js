import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../../common/utils/error.js";
import createResponse from "../../common/utils/response.js";
import handleAsync from "../../common/utils/handleAsync.js";
import MESSAGES from "../../common/contstants/messages.js";
import User from "../user/user.model.js";
import { userRoles } from "../enums.js";
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
  const verifyEmailLink = `http://localhost:8888/api/auth/verify-email/${isVerifyEmailToken}`;
  mailSender(
    newUser.email,
    "Xác thực email",
    `Vui lòng xác thực email của bạn bằng cách nhấp vào liên kết sau: ${verifyEmailLink}`
  );

  await newUser.save();
  return res.json(
    createResponse(true, 201, MESSAGES.AUTH.REGISTER_SUCCESS, { newUser })
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

  const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET_KEY, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return res.json(
    createResponse(true, 200, MESSAGES.AUTH.LOGIN_SUCCESS, { token })
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
