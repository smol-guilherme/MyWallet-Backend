import { validateUserLogin, userRegister } from "../database/index.js";

export async function userLogin(req, res) {
  const credentials = req.body;
  console.log(credentials);
  const data = await validateUserLogin(credentials);
  if (data === null) {
    res.status(404).send("Usuário não encontrado");
    return;
  }
  if (data === false) {
    res.status(409).send("E-mail ou senha incorretos");
    return;
  }
  res.status(200).send(data);
  return;
}

export async function userSignup(req, res) {
  const credentials = req.body;
  const response = await userRegister(credentials);
  if (response === null) {
    return res.status(201).send();
  }
  return res.status(409).send("Usuário já existe");
}
