const express = require("express");
const Controller = require("./controller");
const cors = require("cors");

const server = express();
const PORT = 8080;

server.use(cors());
server.use(express.json());

server.get("/birds", Controller.getAllBirds);
server.get("/bird/:id", Controller.getBirdById);
server.post("/registration", Controller.setRegistration);
server.get("/history/:cpf", Controller.getHistoryByCpf);
server.post("/dados", Controller.setDados);
server.post("/login", Controller.login);

server.listen(PORT, () => console.log("Server ON"));