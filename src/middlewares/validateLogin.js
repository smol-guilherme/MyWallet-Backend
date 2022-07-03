import { getUser } from "../database/index.js";
import sanitizeData from "../database/models/sanitizeData.js"
import validateUser from "../database/models/user.js";

export default async function validateUserLogin(req, res, next) {
  const response = await validateUser(sanitizeData(req.body));
  if (response.hasOwnProperty('type') && response.type === 'string.empty') {
    const message = "Dados inválidos";
    res.status(422).send(message);
    return;
  }
  const user = await getUser(response.email);
  if (user === null) {
    const message = "Usuário não encontrado";
    res.status(404).send(message);
    return;
  }
  res.locals.user = user;
  res.locals.credentials = response;
  next();
}