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


  const ctx = document.getElementById('myChart');
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [{
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });