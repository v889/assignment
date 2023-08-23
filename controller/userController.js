import { Users } from "../database/schema/userSchems.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await Users.findOne({ phoneNumber }).select("+password");

    if (!user) return next(new ErrorHandler("Invalid phoneNumber or Password", 400));

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return next(new ErrorHandler("Invalid phoneNumber or Password", 400));

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res,next) => {
  try {
    const { name,phoneNumber, password } = req.body;

    const user = await Users.findOne({ phoneNumber });

    if (user) return next(new ErrorHandler("User Already Exist", 400));

    const hashedPassword = await bcrypt.hash(password, 10);

    const new_user = await Users.create({ name, phoneNumber, password: hashedPassword });

    sendCookie(new_user, res, "Registered Successfully", 201);
  } catch (error) {
    return next(new ErrorHandler(error, 400));
  }
};

export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res,next) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Develpoment" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Develpoment" ? false : true,
    })
    .json({
      success: true,
      user: req.user,
    });
};