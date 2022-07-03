import { connectToDb, updateSessionToken } from "../database/index.js";
import { validate } from "uuid";

const SESSION_COLLECTION = process.env.MONGO_SESSION_COLLECTION;

export default async function validateUserToken(req, res, next) {
  try {
    const userToken = req.header('authorization').replace("Bearer ", "");
    if (!validate(userToken)) {
      const message = "Token inválido";
      res.status(401).send(message);
      return;
    }
    const db = await connectToDb();
    const response = await db
      .collection(SESSION_COLLECTION)
      .findOne({ token: userToken });
    if(response === null) {
      res.status(404).send();
    }
    res.locals.userData = response;
    updateSessionToken(response);
    next();
  } catch (err) {
    console.log(err);
    res.status(500).send();
    return;
  }
}
