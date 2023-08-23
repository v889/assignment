import express from "express";
import { getMyProfile, login, logout, register } from "../controller/userController.js";
import { isAuthenticated } from "../middleware/auth.js";

const Userrouter = express.Router();

Userrouter.post("/add-user", register);
Userrouter.post("/login-user", login);

Userrouter.get("/logout", logout);

Userrouter.get("/me", isAuthenticated, getMyProfile);

export default Userrouter;