import { addSessionToken, userRegister } from "../database/index.js";
import { compareSync } from "bcrypt";

export async function userLogin(req, res) {
  const user = res.locals.user;
  const credentials = res.locals.credentials;
  if (compareSync(credentials.password, user.password)) {
    const sessionData = await addSessionToken(user);
    res.status(200).send(sessionData);
    return;
  }
  res.status(401).send("Usuário ou senha incorretos");
  return;
}

export async function userSignup(req, res) {
  const credentials = res.locals.credentials;
  const response = await userRegister(credentials);
  if (response === null) {
    res.status(201).send();
    return;
  }
  res.status(500).send("Erro ao processar a operação. Tente novamente.");
  return;
}
