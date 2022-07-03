import { getUser } from "../database/index.js";
import sanitizeData from "../database/models/sanitizeData.js"
import validateSignup from "../database/models/register.js";

export default async function validateSignupData(req, res, next) {
  const response = await validateSignup(sanitizeData(req.body));
  if (response.hasOwnProperty('type') && response.type === 'string.empty') {
    const message = "Dados inválidos";
    res.status(422).send(message);
    return;
  }
  const user = await getUser(response.email);
  if (user !== null) {
    const message = "Usuário já existe";
    res.status(409).send(message);
    return;
  }
  res.locals.credentials = response;
  next();
}