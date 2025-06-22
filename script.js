var infoBirds = {};
var infoDados = [];
var totalPrice = 0;

async function getBird(idBirds) {
    const response = await fetch("http://localhost:8080/bird/" + idBirds);
    const data = await response.json();

    infoBirds = data.bird[0];
    infoDados = data.dados;
    totalPrice = infoBirds.preco;
    document.querySelector("#price").innerHTML = infoBirds.preco.toFixed(2);
    renderDados();
}

function renderDados() {
  const container = document.querySelector(".dados");
  container.innerHTML = "";

  let div = document.createElement("div");
  div.innerHTML = `
  <h2 style="text-align:center; color:#8b4513; margin-bottom: 10px;">REGISTRO:</h2>
  <div class="outros-form">  
    
    <label>Tipo:
        <input type="text" id="tipo">
      </label>

      <label>Quantidade:
        <input type="number" id="quantidade" value="1" min="1">
      </label>

      <label>Gênero:
        <select id="genero">
          <option value="F">Fêmea</option>
          <option value="M">Macho</option>
        </select>
      </label>
<label style="flex-direction: row; align-items: center;">
  <input type="checkbox" id="legalizacao" onchange="setTotalPrice()" style="margin-right: 10px;" />
  Incluir legalização (R$ 144.22)
</label>
  </div>
   
 <div class="dadosP-form">  
 <h2 style="text-align:center; color:#8b4513; margin-bottom: 10px;">DADOS CLIENTE:</h2>
 <label>Nome cliente:
 <input type="text" id="nome">
 </label>

  <label>Pagamento:
        <select id="pagamento">
          <option value="P">Pix</option>
          <option value="C">Cartão</option>
          <option value="A">À vista</option>
        </select>
      </label>
       <div class="buyer-container">
            CPF do comprador: <input type="number" id="cpf">
        </div>
      </div>
  `;
  container.appendChild(div);
}

function setTotalPrice() {
  const legalizacaoChecked = document.querySelector("#legalizacao").checked;
  const quantidade = parseInt(document.querySelector("#quantidade").value) || 1;
  const basePrice = infoBirds.preco * quantidade;
  const valorLegalizacao = legalizacaoChecked ? 144.22 : 0;
  totalPrice = basePrice + valorLegalizacao;
  document.querySelector("#price").innerHTML = totalPrice.toFixed(2);
}

async function sendRegistroExtra() {
  const tipo = document.querySelector("#tipo").value;
  const quantidade = parseInt(document.querySelector("#quantidade").value);
  const genero = document.querySelector("#genero").value;
  const legalizacao = document.querySelector("#legalizacao").checked ? 144.22 : 0;
  const nomePessoa = document.querySelector("#nome").value;
  const pagamento = document.querySelector("#pagamento").value;

  const payload = {
    id_birds: infoBirds.id,
    tipo: tipo,
    quantidade: quantidade,
    genero: genero,
    legalizacao: legalizacao,
    nomePessoa: nomePessoa,
    pagamento: pagamento
  };

  const response = await fetch("http://localhost:8080/dados", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("Dado inserido:", data);
}

async function confirmRegistration() {
  const cpf = document.querySelector("#cpf").value;
  if (!cpf) {
    alert("É necessário ter o CPF!");
    return;
  }

  await sendRegistroExtra();
  const description = `${infoBirds.nome}`;
  const nameCliente = document.querySelector("#nome").value;

  const payload = {
    id_birds: infoBirds.id,
    cpf: cpf,
    name: nameCliente,
    pay_date: new Date().toISOString().split("T")[0],
    description: description,
    price: totalPrice,
  };
  const response = await fetch("http://localhost:8080/registration", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  console.log("Resposta do backend:", data);

  Swal.fire({
    title: "A compra da ave foi registrada com sucesso!",
    text: "Algum outro registro?",
    imageUrl: "imagens/bird.webp",
    imageWidth: 150,
    imageHeight: 150,
    imageAlt: "Pássaro feliz",
    background: "#fffbe6",
    color: "#5c3b00",
    showClass: {
      popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    },
    confirmButtonText: "Fechar",
    customClass: {
      popup: "meu-modal",
      confirmButton: "meu-botao-confirmar"
    }
  });
}
function renderHistorico(data) {
  const tbody = document.querySelector("#historyTable tbody");
  tbody.innerHTML = "";

  for (let item of data) {
    const dataFormatada = item.pay_date ? new Date(item.pay_date).toLocaleDateString() : "Sem data";
    const descricao = item.description || "Sem descrição";
    const preco = item.price ? `R$ ${Number(item.price).toFixed(2)}` : "Sem preço";
    const nome = item.name || "Sem nome";

    let row = `
      <tr>
        <td>${dataFormatada}</td>
        <td>${descricao}</td>
        <td>${preco}</td>
        <td>${nome}</td>
      </tr>
    `;
    tbody.innerHTML += row;
  }
}

async function filtrarHistoricoPorCpf() {
  const cpf = document.querySelector("#cpfFilter").value.trim();
  if (!cpf) {
    alert("Digite um CPF válido para filtrar.");
    return;
  }
  const response = await fetch(`http://localhost:8080/history/${cpf}`);
  const data = await response.json();
  renderHistorico(data);
}

  document.addEventListener("DOMContentLoaded", () => {  
  document.querySelector(".close").addEventListener("click", () => {
  document.querySelector("#historyModal").style.display = "none";

  });

  document.querySelector("#historico").addEventListener("click", () => {
  document.querySelector("#historyModal").style.display = "block";

  });

  getBird(1);
});
