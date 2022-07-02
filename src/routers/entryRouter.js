import { getDataEntries, newDataEntry, deleteDataEntry, updateDataEntry } from "../controllers/accountControllers.js";
import { Router } from "express";

const entryRouter = Router();

entryRouter.get("/data", getDataEntries);
entryRouter.post("/data", newDataEntry);
// EDIT NÃO ESTA EDITANDO CORRETAMENTE, ESTA SALVANDO NO OBJETO ERRADO
entryRouter.put("/data/:id", updateDataEntry);
entryRouter.delete("/data/:id", deleteDataEntry);

export default entryRouter;