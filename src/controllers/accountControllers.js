import { validateUserToken } from "../database/index.js";

export async function newDataEntry(req, res) {
  const newEntry = req.body;
  const userToken = req.header('Authorization').replace("Bearer ", "");
  console.log(userToken);
  if (!checkTokenValidity()) {
    return false;
  }
  return res.status(409).send();
}

export async function getDataEntries() {
  if (!checkTokenValidity()) {
    return false;
  }
  const response = getEntries();
  console.log(response);
  return response;
}

function checkTokenValidity() {
  return validateUserToken();
}
