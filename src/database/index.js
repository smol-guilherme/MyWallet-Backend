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

const database = {

};
export default database;