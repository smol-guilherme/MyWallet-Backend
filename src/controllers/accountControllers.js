import { postEntry, validateUserToken, getEntries } from "../database/index.js";

export async function newDataEntry(req, res) {
  const newEntry = req.body;
  const userToken = req.header('authorization').replace("Bearer ", "");
  const userId = await validateUserToken(userToken);
  if (userId === null) {
    res.status(404).send(false);
    return;
  }
  const response = postEntry(userId, newEntry);
  return res.status(201).send(response);
}

export async function getDataEntries(req, res) {
  const userToken = req.header('authorization').replace("Bearer ", "");
  const userId = await validateUserToken(userToken);
  if (!userId) {
    res.status(401).send(false);
    return;
  }
  const response = await getEntries(userId);
  res.status(200).send(response);
  return;
}
