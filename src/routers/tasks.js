import { Router } from "express";
import database from "../database/index.js";

const router = Router();

router.get("/health", (req, res) => res.status(200).send("OK"));

router.post("/", (req, res) => {
    const reqData = {
        email: req.body.email,
        password: req.header('password').toString('utf-8')
    };
    const { userLogin } = database;
    if(userLogin(reqData) === null) {
        return res.status(404).send("Usuário não encontrado");
    }
    return res.status(200).send(Date().toString());
});

router.post("/signup", (req, res) => {
    const reqData = { 
        name: req.body.name,
        email: req.body.email,
        password: req.header('password').toString('utf-8')
    };
    const { userRegister } = database;
    if(userRegister(reqData) !== null) {
        return res.status(409).send("Usuário já existe");
    }
    return res.status(201).send();
});

export default router;