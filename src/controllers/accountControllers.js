import { postEntry, validateUserToken, getEntries, modifyEntry } from "../database/index.js";

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

export async function deleteDataEntry(req, res) {
  const itemId = req.params.id;
  const userToken = req.header('authorization').replace("Bearer ", "");
  // console.log(itemId);

  const response = await modifyEntry(itemId, userToken, true);
  if(response!== null) {
    // console.log(response);
    res.status(200).send(response);
    return;
  }
  res.status(404).send("Objeto não encontrado");
  return;
}
