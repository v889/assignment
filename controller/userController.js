import { Users } from "../database/schema/userSchems.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/sendCookie.js";
import ErrorHandler from "../middleware/error.js";

export const login = async (req, res, next) => {
  try {
    const { phoneNumber, password } = req.body;

    const user = await Users.findOne({ phoneNumber }).select("+password");

    if (!user) return res.status(400).json({success:false,message:"Invalid phoneNumber or Password"}) 
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch)
      return res.status(400).json({success:false,message:"Invalid phoneNumber or Password"}) 

    sendCookie(user, res, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

export const register = async (req, res,next) => {
  try {
    const { name,phoneNumber, password } = req.body;

    const user = await Users.findOne({ phoneNumber });
    if(!user || !name || !password){
      return res.status(400).json({success:false,message:"every field required"}) 
    }

    if (user) return res.status(400).json({success:false,message:"User Already Exist"}) 

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
