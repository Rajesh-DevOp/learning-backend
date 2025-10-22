import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
const registerUser = asyncHandler(async (req, res) => {
  //get user details from frontend
  const { username, email, fullname, password } = req.body;

  //perform validation not empty
  if (
    [username, email, fullname, password].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    console.log({ username, email, password, fullname });
    throw new ApiError({
      statusCode: 400,
      message: "All fields are required",
    });
  }
  //check if user is already existed
  const existedUser = await User.findOne({
    $or: [{ email }, { username }],
  });
  console.log("existed user", existedUser);
  if (existedUser) {
    throw new ApiError(409, "User Already exist");
  }
  //check for image check for avatar
  const avatarLocalPath = req.files?.avatar[0]?.path;
  const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
  if (!avatarLocalPath) throw new ApiError(400, "Avatar file is required");

  //upload on cloudinary
  const avatarUploadResult = await uploadOnCloudinary(avatarLocalPath);
  const coverImageUploadResult = await uploadOnCloudinary(coverImageLocalPath);
  console.log("avatarUpload", avatarUploadResult);
  if (!avatarUploadResult) throw new ApiError(400, "Avatar is require");

  //create user object-> db calls
  const user = await User.create({
    fullname,
    username: username.toLowerCase(),
    avatar: avatarUploadResult.url,
    coverImage: coverImageUploadResult?.url ?? "",
    email: email.toLowerCase(),
    password,
  });
  //remove password and refresh token field
  //check for user creation
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );
  if (!createdUser)
    throw new ApiError(500, "Something went wrong while creating User");
  //return response
  res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User register Successfully"));
});

export default registerUser;
