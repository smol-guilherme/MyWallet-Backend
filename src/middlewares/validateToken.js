export async function validateUserToken(req, res) {
  try {
    const db = await connectToDb();
    const response = await db
      .collection(SESSION_COLLECTION)
      .findOne({ token: token });
    if (response !== null) {
      const user = await db.collection(USER_COLLECTION).findOne({});
      return user._id;
    }
    res.status(404).send();
    return;
  } catch (err) {
    console.log(err);
    return null;
  }
}