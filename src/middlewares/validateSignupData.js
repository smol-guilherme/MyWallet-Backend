import { getUser } from "../database/index.js";
import sanitizeData from "../database/models/sanitizeData.js"
import validateSignup from "../database/models/register.js";

// 1-3: validateSignupData -> getUser
// *fix: now 1-2 instead of 1-3
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