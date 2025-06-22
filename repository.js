class birdRepository {
  constructor(database) {
    this.database = database;
  }

  async getAllBirds() {
    try {
      const sql = "select * from birds";
      const responseDB = await this.database.query(sql);
      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
}

async getBirdById(id) {
    try {
      const sql = "select id, nome, preco from birds where id = $1";
      const responseDB = await this.database.query(sql, [id]);
      return responseDB.rows;
    } catch (error) {
      return { error: error.message };
    }
  }

  async getDadosById(idBirds) {
  try {
    const sql = "select * from dados where id_birds = $1";
    const responseDB = await this.database.query(sql, [idBirds]);
    return responseDB.rows;
  } catch (error) {
    return { error: error.message };
  }
}

async setRegistration(payInfo){
    try {
      const sql = 
      `insert into registration(id_birds, cpf, pay_date, description, price, name) 
       values($1, $2, $3, $4, $5, $6) 
        returning *;
        `;
      
       const responseDB = await this.database.query(sql, [
       payInfo.id_birds,
              payInfo.cpf,
              payInfo.pay_date,
              payInfo.description,
              payInfo.price,
              payInfo.name
       ]);

      console.log("Resultado do insert:", responseDB.rows);
    return "Pagamento realizado!";
  } catch (error) {
    return { error: error.message };
  }
 }

  async getHistoryByCpf(cpf) {
  try {
    const sql = `select * from registration where cpf = $1 order by pay_date desc`;
    const responseDB = await this.database.query(sql, [cpf]);
    return responseDB.rows;
  } catch (error) {
    return { error: error.message };
  }
 }

 async setDados(dados) {
  try {
    const sql = `insert into dados (id, id_birds, tipo, quantidade, genero, legalizacao, nomePessoa, pagamento)
                 values (default, $1, $2, $3, $4, $5, $6, $7)
                 RETURNING *`;
    const responseDB = await this.database.query(sql, [
      dados.id_birds,
      dados.tipo,
      dados.quantidade,
      dados.genero,
      dados.legalizacao,
      dados.nomePessoa,
      dados.pagamento
    ]);
    return responseDB.rows[0];
  } catch (error) {
    return { error: error.message };
  }
}

async checkLogin(email, senha) {
  try {
    const sql = "select * from users where email = $1 and senha = $2";
    const result = await this.database.query(sql, [email, senha]);
    return result.rows[0] || null;
  } catch (error) {
    return { error: error.message };
  }
}
}

module.exports = birdRepository;
