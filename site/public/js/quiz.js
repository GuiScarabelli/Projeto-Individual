const questions = [
    {
      question: "Quem ganha numa guerra de AK-47?",
      answers: [
        {text: "Luis Inacio Lula da Silva", correct: false},
        {text: "Lobo pidão", correct: false},
        {text: "Blue pen (caneta azul)", correct: false},
        {text: "Galo cego", correct: true},
      ],
    },
    {
      question: "Quem foi a primeirar pessoa a pisar no Brasil?",
      answers: [
        {text: "Pelé", correct: false},
        {text: "Adão e Eva", correct: false},
        {text: "Pedro Alvares Cabral", correct: false},
        {text: "O Abraão", correct: true},
      ]
    }
  ];
  const quizBody = document.getElementById("quiz-body")
  const questionElement = document.getElementById("question")
  const answerButton = document.getElementById("answer-buttons")
  const nextButton = document.getElementById("next-btn")
  const chart = document.getElementById("chart_ranking")
  
  let currentQuestionIndex = 0
  let  score = 0
  
  function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = "Next"
    showQuestion()
  }
  
  function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement("button")
      button.innerHTML = answer.text;
      button.classList.add("btn");
      answerButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct
      }
      button.addEventListener("click", selectAnswer);
    });
  }
  
  function resetState(){
    
    nextButton.style.display = "none"
    

    while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild)
    }
  }
  
  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
      selectedBtn.classList.add("correct");
      score ++
    } else {
      selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButton.children).forEach(button => {
      if(button.dataset.correct === "true"){
        button.classList.add("correct")
      }
      button.disable = true
    })
    nextButton.style.display = "block"
  }
  
  
  function showScore(){
    resetState()
    quizBody.style.display = "block"
    questionElement.style.display = "none"
    chart.style.display = "block"
  }
  
  function handleNextButton() {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
  
    } else {
        showScore()
    }
  }
  
  nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
      handleNextButton()
    } else {
      startQuiz()
    }
  })
  
  startQuiz();



  // SCRIPT CHARTJS
  // const ctx = document.getElementById('myChart');
  // new Chart(ctx, {
  //   type: 'bar',
  //   data: {
  //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //     datasets: [{
  //       label: '# of Votes',
  //       data: [12, 19, 3, 5, 2, 3],
  //       borderWidth: 1
  //     }]
  //   },
  //   options: {
  //     scales: {
  //       y: {
  //         beginAtZero: true
  //       }
  //     }
  //   }
  // });





  window.onload = obterDadosGraficos();

  function obterDadosGraficos() {
      obterDadosGrafico(1)
  }


  function obterDadosGrafico(idUsuario) {

    fetch(`/usuarios/listar/${idUsuario}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();
                 plotarGrafico(resposta, idUsuario);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

// Esta função *plotarGrafico* usa os dados capturados na função anterior para criar o gráfico
// Configura o gráfico (cores, tipo, etc), materializa-o na página e, 
// A função *plotarGrafico* também invoca a função *atualizarGrafico*
function plotarGrafico(resposta, idUsuario) {

    console.log('iniciando plotagem do gráfico...');

    // Criando estrutura para plotar gráfico - labels
    let labels = [];

    // Criando estrutura para plotar gráfico - dados

    const ctxGraficoBarra = document.getElementById("myChart");
    let dados = {
        labels: labels,
        datasets: [{   
        label: "Nome",
        data: [],
        backgroundColor: "rgba(255, 69, 1, 0.7)",
        },
        {
            label: 'Pontos',
            data: [],
            fill: false,
            borderColor: 'rgb(199, 52, 52)',
            backgroundColor: "rgba(255, 69, 1, 0.7)",
            tension: 0.1
        }]
    };
    // Inserindo valores recebidos em estrutura para plotar o gráfico
    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.nome);
        dados.datasets[0].data.push(registro.nome);
        dados.datasets[1].data.push(registro.pontos);
    }

    // Adicionando gráfico criado em div na tela
    var chartBarra = new Chart(ctxGraficoBarra, {
    type: "bar",
    data: dados,
    });
}
