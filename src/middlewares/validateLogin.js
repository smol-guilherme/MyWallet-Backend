import { getUser } from "../database/index.js";
import sanitizeData from "../database/models/sanitizeData.js"
import validateUser from "../database/models/user.js";

// 1-3: validateUserLogin -> getUser
// *fix: now 1-2 instead of 1-3
export default async function validateUserLogin(req, res, next) {
  const credentials = await validateUser(sanitizeData(req.body));
  const user = await getUser(credentials.email);
  if (user === null) {
    const message = "Usuário não encontrado";
    res.status(404).send(message);
    return;
  }
  res.locals.user = user;
  res.locals.credentials = credentials;
  next();
}