import { MongoClient, ObjectId } from "mongodb";
import 'dotenv/config';

const URL = process.env.MONGO_URL;
const PORT = process.env.MONGO_PORT;
const MESSAGE_COLLECTION = process.env.MONGO_DATA_COLLECTION;
const USER_COLLECTION = process.env.MONGO_USERS_COLLECTION;

