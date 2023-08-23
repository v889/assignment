import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import { getMyOrder, newOrder } from "../controller/orderController.js";

const OrderRouter = express.Router();
OrderRouter.post("/add-order",isAuthenticated,newOrder)
OrderRouter.get("/get-order/:id",getMyOrder)
export default OrderRouter