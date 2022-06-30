import { postEntry, validateUserToken } from "../database/index.js";

export async function newDataEntry(req, res) {
  const newEntry = req.body;
  const userToken = req.header('Authorization').replace("Bearer ", "");
  const tokenResponse = await validateUserToken(userToken);
  if (tokenResponse === null) {
    return false;
  }
  const response = postEntry(tokenResponse, newEntry);
  return res.status(201).send(response);
}

export async function getDataEntries(req, res) {
  const userToken = req.header('Authorization').replace("Bearer ", "");
  if (await !validateUserToken(userToken)) {
    return false;
  }
  const response = getEntries();
  console.log(response);
  return response;
}
