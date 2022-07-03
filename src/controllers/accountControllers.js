import { postEntry, getEntries, modifyEntry } from "../database/index.js";
import validateEntry from "../database/models/entry.js";
import sanitizeData from "../database/models/sanitizeData.js"

export async function getDataEntries(req, res) {
  const userData = res.locals.userData
  const response = await getEntries(userData);
  if(response !== null) {
    res.status(200).send(response);
    return;
  }
  res.status(500).send();
  return;
}

export async function newDataEntry(req, res) {
  const newEntry = await validateEntry(sanitizeData(req.body));
  if(newEntry === null) {
    res.status(422).send();
    return;
  }
  const userData = res.locals.userData;
  const response = await postEntry(userData, newEntry);
  res.status(201).send(response);
  return;
}

export async function deleteDataEntry(req, res) {
  const userData = res.locals.userData
  const itemId = req.params.id;
  const response = await modifyEntry(itemId, userData, true);
  if(response!== null) {
    res.status(200).send(response);
    return;
  }
  res.status(404).send("Objeto não encontrado");
  return;
}

export async function updateDataEntry(req, res) {
  const updatedEntry = await validateEntry(sanitizeData(req.body));
  const itemId = req.params.id;
  const userData = res.locals.userData
  const response = await modifyEntry(itemId, userData, false, updatedEntry);
  if(response!== null) {
    res.status(200).send(response);
    return;
  }
  res.status(404).send("Objeto não encontrado");
  return;
}