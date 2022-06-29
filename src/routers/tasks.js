import { Router } from "express";
import database from "../database/index.js";

const router = Router();

router.get("/health", (req, res) => res.status(200).send("OK"));

router.post("/", async(req, res) => {
    const credentials = req.body;
    const { userLogin } = database;
    if(await userLogin(credentials) === null) {
        return res.status(404).send("Usuário não encontrado");
    }
    if(await userLogin(credentials) === false) {
        return res.status(409).send("E-mail ou senha incorretos");
    }
    return res.status(200).send(Date().toString());
});

router.post("/signup", async(req, res) => {
    const credentials = req.body;
    const { userRegister } = database;
    if(await userRegister(credentials) !== null) {
        return res.status(409).send("Usuário já existe");
    }
    return res.status(201).send();
});

export default router;