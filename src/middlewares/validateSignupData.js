import { getUser } from "../database/index.js";
import sanitizeData from "../database/models/sanitizeData.js"
import validateSignup from "../database/models/register.js";

export default async function validateSignupData(req, res, next) {
  const credentials = await validateSignup(sanitizeData(req.body));
  const user = await getUser(credentials.email);
  if (user !== null) {
    const message = "Usuário já existe";
    res.status(409).send(message);
    return;
  }
  res.locals.credentials = credentials;
  next();
}