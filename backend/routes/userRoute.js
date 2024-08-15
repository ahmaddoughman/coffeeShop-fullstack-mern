import express from "express";
import { getUser, loginUser, registerUser } from "../controllers/userController.js";


const userRouter = express.Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/profile", getUser);

export default userRouter;