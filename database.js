const { Pool } = require("pg");

const URL_PG = "postgresql://postgres:sunless244@localhost:5432/birds-shop";

const database = new Pool({
  connectionString: URL_PG,
});

module.exports = database;