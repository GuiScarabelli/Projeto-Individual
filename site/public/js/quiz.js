const questions = [
    {
      question: "Quem ganha numa guerra de AK-47?",
      answers: [
        {text: "Luis Inacio Lula da Silva", correct: false},
        {text: "Lobo pidão", correct: false},
        {text: "Blue pen (caneta azul)", correct: false},
        {text: "Galo cego", correct: true},
      ],
    }
    // {
    //   question: "Quem foi a primeirar pessoa a pisar no Brasil?",
    //   answers: [
    //     {text: "Pelé", correct: false},
    //     {text: "Adão e Eva", correct: false},
    //     {text: "Pedro Alvares Cabral", correct: false},
    //     {text: "O Abraão", correct: true},
    //   ]
    // }
  ];

  const quizBody = document.getElementById("quiz-body")
  const questionElement = document.getElementById("question")
  const answerButton = document.getElementById("answer-buttons")
  const nextButton = document.getElementById("next-btn")
  const resultado = document.getElementById("resultado")
  const registros = document.getElementById("registros")
  var nomeSessao = sessionStorage.getItem('nome')



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
    sessionStorage.setItem('pontos', score)
    quizBody.style.display = "block"
    questionElement.style.display = "none"
    resultado.style.display = "block"
  }
  
  function handleNextButton() {
    
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
  
    } else {
        showScore()
        fetch('/usuarios/jogar', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idUsuario: sessionStorage.getItem('id'),
            pontos: score
          })
        }).then(res => {
          console.log(res)
        }).catch(err => console.error(err))
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

  window.onload = obterDados();

  function obterDados() {
      obterDados(1)
  }

  function obterDados() {
    fetch(`/usuarios/listarPlacar`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                 exibirDados(resposta);
            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });
}

function exibirDados(resposta) {

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        var nome = resposta[i].nome
        var pontos = registro.pontuacao
        

        registros.innerHTML += `<tr><td>${nome}</td><td>${pontos}</td></tr>`
        console.log(pontos)
      }
}

