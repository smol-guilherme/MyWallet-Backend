import { validateUserLogin, userRegister } from "../database/index.js";

export async function userLogin(req, res) {
  const credentials = req.body;
  const data = await validateUserLogin(credentials);
  if (data === null) {
    return res.status(404).send("Usuário não encontrado");
  }
  if (data === false) {
    return res.status(409).send("E-mail ou senha incorretos");
  }
  return res.status(200).send(data);
}

export async function userSignup(req, res) {
  const credentials = req.body;
  const response = await userRegister(credentials);
  if (response === null) {
    return res.status(201).send();
  }
  return res.status(409).send("Usuário já existe");
}
