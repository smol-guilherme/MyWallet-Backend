import { getDataEntries, newDataEntry, deleteDataEntry, updateDataEntry } from "../controllers/accountControllers.js";
import { Router } from "express";
import validateUserToken from "../middlewares/validateToken.js";

const entryRouter = Router();

// 2.1 getData: validateToken -> 
entryRouter.use(validateUserToken);
entryRouter.get("/data", getDataEntries);
entryRouter.post("/data", newDataEntry);
// EDIT NÃO ESTA EDITANDO CORRETAMENTE, ESTA SALVANDO NO OBJETO ERRADO - CONSERTADO
entryRouter.put("/data/:id", updateDataEntry);
entryRouter.delete("/data/:id", deleteDataEntry);

export default entryRouter;