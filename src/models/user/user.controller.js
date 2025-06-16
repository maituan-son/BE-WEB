import createError from "../../common/configs/utils/error.js";
import handleAsync from "../../common/configs/utils/handleAsync.js";
import createResponse from "../../common/configs/utils/response.js";
import User from "./user.model.js";

export const getAllUsers = handleAsync(async (req, res) => {
  const users = await User.find();
  return res.json(
    createResponse(true, 200, "Users fetched successfully", users)
  );
});

export const getUserById = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "User ID is required"));
  }

  const user = await User.findById(id);
  if (!user) {
    return next(createError(404, "User not found"));
  }

  return res.json(createResponse(true, 200, "User fetched successfully", user));
});

export const createUser = handleAsync(async (req, res) => {
  const {
    fullname,
    email,
    address,
    bio,
    role,
    phone_number,
    isActive,
    latestLogin,
    isVerifyEmail,
    isVerifyPhoneNumber,
    is2StepVerify,
  } = req.body;

  if (!fullname || !email) {
    return res
      .status(400)
      .json(createResponse(false, 400, "fullname and email are required"));
  }

  const newUser = new User({
    fullname,
    email,
    address,
    bio,
    role,
    phone_number,
    isActive,
    latestLogin,
    isVerifyEmail,
    isVerifyPhoneNumber,
    is2StepVerify,
  });

  await newUser.save();

  return res.json(
    createResponse(true, 201, "User created successfully", newUser)
  );
});

export const updateUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "User ID is required"));
  }

  const updateData = req.body;

  const updatedUser = await User.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedUser) {
    return next(createError(404, "User not found"));
  }

  return res.json(
    createResponse(true, 200, "User updated successfully", updatedUser)
  );
});

export const deleteUser = handleAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(createError(400, "User ID is required"));
  }

  const deletedUser = await User.findByIdAndDelete(id);

  if (!deletedUser) {
    return next(createError(404, "User not found"));
  }

  return res.json(
    createResponse(true, 200, "User deleted successfully", deletedUser)
  );
});
