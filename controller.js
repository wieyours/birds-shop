const database = require("./database");
const birdRepository = require("./repository");

const repository = new birdRepository(database);

async function getAllBirds(request, reply) {
  const responseDB = await repository.getAllBirds();
  if (responseDB.error) return reply.status(404).json(responseDB.error);
  reply.json(responseDB);
}

async function getBirdById(request, reply) {
  const id = request.params.id;
  const responseBirds = await repository.getBirdById(id);
  const responseDados = await repository.getDadosById(id);
  if (responseBirds.error) return reply.status(404).json(responseBirds.error);

  const response = {
    bird: responseBirds,
    dados: responseDados,
  };
  reply.json(response);
}

async function setRegistration(request, reply) {
  const payInfo = request.body;
  console.log("Requisição recebida no backend:", payInfo);

  const responseDB = await repository.setRegistration(payInfo);
  if (responseDB.error) return reply.status(404).json(responseDB.error);
  reply.json(responseDB);
}

async function getHistoryByCpf(request, reply) {
  const cpf = request.params.cpf;
  const responseDB = await repository.getHistoryByCpf(cpf);
  if (responseDB.error) return reply.status(404).json(responseDB.error);
  reply.json(responseDB);
}

async function setDados(request, reply) {
  const dados = request.body;
  const responseDB = await repository.setDados(dados);
  if (responseDB.error) return reply.status(500).json(responseDB.error);
  reply.json(responseDB);
}

async function login(request, reply) {
  const { email, senha } = request.body;
  const result = await repository.checkLogin(email, senha);
  if (!result) {
    return reply.status(401).json({ error: "Inválido!" });
  }
  reply.json({ message: "Login bem-sucedido", user: result });
}

module.exports = { getAllBirds, getBirdById, setRegistration, getHistoryByCpf, setDados, login };