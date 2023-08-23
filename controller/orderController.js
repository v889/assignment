import ErrorHandler from "../middleware/error.js";
import { Orders } from "../database/schema/orderSchema.js";
import { Users } from "../database/schema/userSchems.js";

export const newOrder = async (req, res, next) => {
  try {
    const {sub_total,phoneNumber,userId} = req.body;
    const existingUser=Users.findById(userId)
    if(!existingUser){
        return res.status(400).json({success:false,message:"wrong user id"})
    }

    await Orders.create({
      sub_total,
      phoneNumber,
      userId
    });

    res.status(201).json({
      success: true,
      message: "Order added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyOrder= async (req, res, next) => {
  try {
    const {id}=req.params
    const orders = await Orders.find({ userId: id });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    next(error);
  }
};



