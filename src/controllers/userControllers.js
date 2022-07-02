import { addSessionToken, userRegister } from "../database/index.js";
import { compareSync } from "bcrypt";
  
// 1-2*fix: validateUserLogin -> sanitizeData -> userLogin
export async function userLogin(req, res) {
  const user = res.locals.user;
  const credentials = res.locals.credentials;
  console.log(credentials);
  if (compareSync(credentials.password, user.password)) {
    const sessionData = await addSessionToken(user);
    res.status(200).send(sessionData);
    return;
  }
  res.status(401).send("Usuário ou senha incorretos");
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
