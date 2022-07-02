import { Router } from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";
import validateUserLogin from "../middlewares/validateLogin.js";
import validateSignupData from "../middlewares/validateSignupData.js";

const userRouter = Router();

// REFATORANDO AS ROTAS EM ETAPAS X-Y, ONDE X = ROTA, Y = PROXIMO METODO/MIDDLEWARE DA ROTA
// 1.1: login: validateUserLogin -> sanitizeData -> userLogin -> OK!
userRouter.post("/", validateUserLogin, userLogin);
// 2.1: signup/register: validateSignupData -> sanitizeData -> userSignup -> NOT YET OK
userRouter.post("/signup", validateSignupData, userSignup);

export default userRouter;