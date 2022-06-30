import { Router } from "express";
import { getDataEntries, newDataEntry } from "../controllers/accountControllers.js";
import { userLogin, userSignup } from "../controllers/userControllers.js";

const router = Router();

router.get("/health", (req, res) => res.status(200).send("OK"));
router.post("/", userLogin);
router.post("/signup", userSignup);
router.get("/data", getDataEntries);
router.post("/data", newDataEntry);

export default router;
