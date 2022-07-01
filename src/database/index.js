import { MongoClient, ObjectId } from "mongodb";
import { compareSync, hashSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import dayjs from 'dayjs';
import "dotenv/config";

const URL = process.env.MONGO_URL;
const PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB_NAME;
const USER_COLLECTION = process.env.MONGO_USERS_COLLECTION;
const ENTRIES_COLLECTION = process.env.MONGO_DATA_COLLECTION;
const SESSION_COLLECTION = process.env.MONGO_SESSION_COLLECTION;
const SEC_FACTOR = 10;

const client = new MongoClient(`mongodb://${URL}:${PORT}`);

async function connectToDb() {
  try {
    await client.connect();
    return client.db(DB_NAME);
  } catch (err) {
    return err;
  }
}

export async function validateUserLogin(credentials) {
  const user = await getUser(credentials.email);
  if (user === null) {
    return null;
  }
  if (compareSync(credentials.password, user.password)) {
    const sessionData = addSessionToken(user);
    return sessionData;
  }
  return false;
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

export async function validateUserToken(token) {
  try {
    const db = await connectToDb();
    const response = await db.collection(SESSION_COLLECTION).findOne({ token: token });
    if (response !== null) {
      const user = await db.collection(USER_COLLECTION).findOne({})
      return user._id;
    }
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function getEntries(uid) {
  try {
    const db = await connectToDb();
    console.log('userid', uid);
    const response = await db.collection(ENTRIES_COLLECTION).find({ uid: ObjectId(uid)}).toArray();
    console.log(response);
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export async function postEntry(uid, data) {
  try {
    const db = await connectToDb();
    const entry = { 
      uid: uid,
      data: {...data, date: dayjs().format("DD/MM")}
    };
    console.log(entry);
    await db.collection(ENTRIES_COLLECTION).insertOne(entry);
    const response = await db.collection(ENTRIES_COLLECTION).find({}).toArray();
    return response;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getUser(userEmail) {
  try {
    const db = await connectToDb();
    const user = await db
      .collection(USER_COLLECTION)
      .findOne({ email: userEmail });
    client.close();
    console.log(user._id);
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function addSessionToken(user) {
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
