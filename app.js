import express  from "express";
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import Userrouter from "./Routes/userRoutes.js";
import OrderRouter from "./Routes/orderRoutes.js";


export const app=express();
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}));
app.use("/api/v1/user",Userrouter)
app.use("/api/v1/order",OrderRouter)
config(
    {
        path:"./public/config.env"
    }
)
