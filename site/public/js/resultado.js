obterDados();


function obterDados() {
  var filtro = caral.value
  fetch(`/usuarios/listarPlacar/${filtro}`, {
    cache: "no-store",
  })
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (resposta) {
          exibirDados(resposta);
        });
      } else {
        console.error("Nenhum dado encontrado ou erro na API");
      }
    })
    .catch(function (error) {
      console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });
}

function exibirDados(resposta) {
  for (i = 0; i < resposta.length; i++) {    
    var registro = resposta[i];
    var nome = resposta[i].nome;
    var pontos = registro.pontuacao;
    registros.innerHTML += `<tr><td>${nome}</td><td>${pontos}</td></tr>`;
    console.log(pontos);
    resultado.style.display = "block";
    tituloResultado.style.display = "block";
  }
}

