const questions = [
    {
      question: "dada",
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
    },
    {
      question: "De quem é essa música?",
      answers: [
        {text: "Tim Maia", correct: true},
        {text: "Tom Jobim", correct: false},
        {text: "Seu Jorge", correct: false},
        {text: "Elis Regina", correct: false},
      ],
    },
    {
      question: "Atenção",
      answers: [
        {text: "Voce", correct: false},
        {text: "Do leme ao pontal", correct: false},
        {text: "Faroeste Caboclo", correct: false},
        {text: "DJ Arana", correct: true},
      ],
    }
  ];



  const quizBody = document.getElementById("quiz-body")
  const questionElement = document.getElementById("question")
  const questionNoo= document.getElementById("questionNo")
  const answerButton = document.getElementById("answer-buttons")
  const nextButton = document.querySelector(".next-btn")
  const tituloResultado = document.getElementById("tituloResultado")
  const musica = document.querySelector(".musica")
  const questao3pontos = document.querySelector(".questao3pontos")
  var nomeSessao = sessionStorage.getItem('nome')
  var id = sessionStorage.getItem('id')

  tituloResultado.style.display = "none"



  let currentQuestionIndex = 0
  let  score = 0


  // validação para poder jogar só se estiver com login feito
  // if(id == undefined){
  //   alert('faça o login para jogar')
  //   window.location.href = './index.html'
  // }



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

      if(currentQuestion == questions[1]){
        questao3pontos.style.display = 'block'
        questionElement.style.display = "none"
        nextButton.style.display = "block"
        answerButton.style.display = 'none'
      } else if(currentQuestion == questions[2]){
        questionElement.style.display = "block"
        nextButton.style.display = "block"
        questao3pontos.style.display = 'none'
        answerButton.style.display = 'block'
        musica.style.display = 'block'
      } else {
        musica.style.display = 'none'
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
    setTimeout(() =>{
      window.location.href = './resultado.html'
     },0)
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
