import express, { json } from "express";
import cors from "cors";
import router from "./src/routers/tasks.js"
import "dotenv/config";

const PORT_IN_USE = process.env.PRIMARY_PORT || process.env.SECONDARY_PORT;

const server = express();
server.use(cors());
server.use(json());
server.use("/", router);

server.listen(PORT_IN_USE, () => console.log(`Server up and running @${Date().toString()} from port ${PORT_IN_USE}`))