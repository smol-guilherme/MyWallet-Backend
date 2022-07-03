import { MongoClient, ObjectId } from "mongodb";
import { hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from "dayjs";
import "dotenv/config";

const URL = process.env.MONGO_URL;
const PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB_NAME;
const USER_COLLECTION = process.env.MONGO_USERS_COLLECTION;
const ENTRIES_COLLECTION = process.env.MONGO_DATA_COLLECTION;
const SESSION_COLLECTION = process.env.MONGO_SESSION_COLLECTION;
const SEC_FACTOR = 10;

const client = new MongoClient(`mongodb://${URL}:${PORT}`);

export async function connectToDb() {
  try {
    await client.connect();
    return client.db(DB_NAME);
  } catch (err) {
    return err;
  }
}

export async function userRegister(credentials) {
  if ((await getUser(credentials.email)) !== null) {
    return false;
  }
  const db = await connectToDb();
  credentials.password = hashSync(credentials.password, SEC_FACTOR);
  await db.collection(USER_COLLECTION).insertOne(credentials);
  client.close();
  return null;
}

export async function getEntries(uData) {
  try {
    const db = await connectToDb();
    const responseData = await db
      .collection(ENTRIES_COLLECTION)
      .aggregate([
        { $match: { uid: uData.userId } },
        {
          $group: {
            _id: "$uid",
            total: { $sum: "$data.value" },
            data: { $push: "$data" },
          },
        },
      ])
      .toArray();
    delete responseData[0]._id;
    const response = { ...responseData[0] };
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function postEntry(uData, data) {
  try {
    const db = await connectToDb();
    const entry = {
      uid: uData.userId,
      data: { id: ObjectId(), ...data, date: dayjs().format("DD/MM") },
    };
    await db.collection(ENTRIES_COLLECTION).insertOne(entry);
    const response = await db
      .collection(ENTRIES_COLLECTION)
      .find({ uid: uData.userId })
      .toArray();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function modifyEntry(iid, uid, deletionFlag, data) {
  try {
    const db = await connectToDb();
    if (deletionFlag) {
      const asdf = await db
        .collection(ENTRIES_COLLECTION)
        .deleteOne({ "data.id": ObjectId(iid) });
      return await getEntries(uid);
    }
    await db
      .collection(ENTRIES_COLLECTION)
      .updateOne(
        { "data.id": ObjectId(iid) },
        {
          $set: {
            "data.value": data.value,
            "data.description": data.description,
          },
        }
      );
    return await getEntries(uid);
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getUser(userEmail) {
  try {
    const db = await connectToDb();
    const user = await db
      .collection(USER_COLLECTION)
      .findOne({ email: userEmail });
    client.close();
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function addSessionToken(user) {
  try {
    const db = await connectToDb();
    user.token = uuid();
    await db
      .collection(SESSION_COLLECTION)
      .insertOne({ userId: ObjectId(user._id), token: user.token });
    const response = {
      name: user.name,
      token: user.token,
    };
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}
