import { MongoClient, ObjectId } from "mongodb";
import 'dotenv/config';

const URL = process.env.MONGO_URL;
const PORT = process.env.MONGO_PORT;
const DB_NAME = process.env.MONGO_DB_NAME;
const MESSAGE_COLLECTION = process.env.MONGO_DATA_COLLECTION;
const USER_COLLECTION = process.env.MONGO_USERS_COLLECTION;

const client = new MongoClient(`mongodb://${URL}:${PORT}`);

async function connectToDb() {
    try {
        await client.connect();
        return client.db(DB_NAME);
    } catch (err) {
        return err;
    }
}

function userLogin(credentials) {
    const user = getUser(credentials.email);
    if(user.password === credentials.password) {
        return user;
    }
    return null;
}

async function getUser(userEmail) {
    try {
        const db = await connectToDb();
        const user = await db.collection(USER_COLLECTION).findOne({ email: userEmail });
        console.log(user);
        client.close();
        return user;
    } catch (err) {
        console.log(err);
        return null;
    }
}

async function userRegister(credentials) {
    if(await getUser(credentials.email) !== null) {
        return null;
    }
    const db = await connectToDb();
    await db.collection(USER_COLLECTION).insertOne(credentials);
    client.close();
    return true;
}

const database = {
    userRegister,
    userLogin
};
export default database;