import { getDataEntries, newDataEntry, deleteDataEntry, updateDataEntry } from "../controllers/accountControllers.js";
import { Router } from "express";
import validateUserToken from "../middlewares/validateToken.js";

const entryRouter = Router();

entryRouter.use(validateUserToken);
entryRouter.get("/data", getDataEntries);
entryRouter.post("/data", newDataEntry);
entryRouter.put("/data/:id", updateDataEntry);
entryRouter.delete("/data/:id", deleteDataEntry);

export default entryRouter;