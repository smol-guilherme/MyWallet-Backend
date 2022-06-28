import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => res.status(200).send("OK"));

router.post("/", (req, res) => {
    const reqData = { email: req.body.email, password: req.header('password').toString('utf-8') };
    console.log(reqData)
});

router.post("/signup", (req, res) => {

});

export default router;