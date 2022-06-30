import { Router } from "express";
import { userLogin, userSignup } from "../controllers/userControllers.js";

const router = Router();

router.get("/health", (req, res) => res.status(200).send("OK"));
router.post("/", userLogin);
router.post("/signup", userSignup);

export default router;