import { userLogin, userSignup } from "../controllers/userControllers.js";
import { getDataEntries, newDataEntry, deleteDataEntry, updateDataEntry } from "../controllers/accountControllers.js";
import { Router } from "express";

const router = Router();

router.post("/", userLogin);
router.post("/signup", userSignup);
router.get("/data", getDataEntries);
router.post("/data", newDataEntry);
router.put("/data/:id", updateDataEntry);
router.delete("/data/:id", deleteDataEntry);

export default router;
