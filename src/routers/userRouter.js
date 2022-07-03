import { Router } from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";
import validateUserLogin from "../middlewares/validateLogin.js";
import validateSignupData from "../middlewares/validateSignupData.js";

const userRouter = Router();

userRouter.post("/", validateUserLogin, userLogin);
userRouter.post("/signup", validateSignupData, userSignup);

export default userRouter;