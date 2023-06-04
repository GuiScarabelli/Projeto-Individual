const questions = [
    {
      question: 'Quem é conhecido como o "pai da bossa nova"?',
      answers: [ 
        {text: 'Gilberto Gil', correct: false},
        {text: 'Chico Buarque', correct: false},
        {text: 'Caetano Veloso', correct: false},
        {text: 'Tom Jobim', correct: true},
      ],
    },
    {
      question: 'Qual é o gênero musical que influenciou a MPB?',
      answers: [ 
        {text: 'Samba', correct: true},
        {text: 'Forró', correct: false},
        {text: 'Rock', correct: false},
        {text: 'Reggae', correct: false},
      ],
    },
    {
      question: 'Qual destes artistas NÃO é conhecido por sua contribuição para a MPB?',
      answers: [ 
        {text: 'Djavan', correct: false},
        {text: 'Elis Regina', correct: false},
        {text: 'Alcione', correct: false},
        {text: 'Wesley Safadão', correct: true},
      ],
    },
    {
      question: 'Qual dessas músicas é um clássico da MPB?',
      answers: [ 
        {text: '"Garota de Ipanema" - Tom Jobim e Vinicius de Moraes', correct: true},
        {text: '"Ai Se Eu Te Pego" - Michel Teló', correct: false},
        {text: '"Lepo Lepo" - Psirico', correct: false},
        {text: '"Cheia de Manias" - Raça Negra', correct: false},
      ],
    },
    {
      question: 'Quem é conhecido como o "malandro" da MPB?',
      answers: [
        {text: 'Zeca Pagodinho', correct: false},
        {text: 'Jorge Ben Jor', correct: true},
        {text: 'Cartola', correct: false},
        {text: 'Gilberto Gil', correct: false},
      ]
    },
    {
      question: 'Qual é o movimento cultural que influenciou a MPB nos anos 1960?',
      answers: [
        {text: 'Tropicalismo', correct: true},
        {text: 'Bossa Nova', correct: false},
        {text: 'Jovem Guarda', correct: false},
        {text: 'Sertanejo Universitário', correct: false},
      ],
    },
    {
      question: 'Qual desses artistas é conhecido por suas composições engajadas e de protesto na MPB?',
      answers: [
        {text: 'Caetano Veloso', correct: false},
        {text: 'Gilberto Gil', correct: true},
        {text: 'Raul Seixas', correct: false},
        {text: 'Milton Nascimento', correct: false},
      ],
    },
    {
      question: 'Quem é considerada a "rainha da MPB"',
      answers: [
        {text: 'Elis Regina', correct: true},
        {text: 'Marisa Monte', correct: false},
        {text: 'Gal Costa', correct: false},
        {text: 'Maria Bethânia', correct: false},
      ],
    },
    {
      question: 'Qual é o instrumento musical típico da MPB?',
      answers: [
        {text: 'Violão', correct: true},
        {text: 'Bateria', correct: false},
        {text: 'Teclado', correct: false},
        {text: 'Saxofone  ', correct: false},
      ],
    },
    {
      question: 'De quem é essa música?',
      answers: [
        {text: 'Chico Buarque', correct: true},
        {text: 'Tom Jobim', correct: false},
        {text: 'Seu Jorge', correct: false},
        {text: 'Elis Regina', correct: false},
      ],
    },
  ];



  const quizBody = document.getElementById('quiz-body')
  const questionElement = document.getElementById('question')
  const questionNoo= document.getElementById('questionNo')
  const answerButton = document.getElementById('answer-buttons')
  const nextButton = document.querySelector('.next-btn')
  const tituloResultado = document.getElementById('tituloResultado')
  const musica = document.querySelector('.musica')
  const questao3pontos = document.querySelector('.questao3pontos')
  var nomeSessao = sessionStorage.getItem('nome')
  var id = sessionStorage.getItem('id')

  tituloResultado.style.display = 'none'
  var valor = 1
  // validação para poder jogar só se estiver com login feito
  // if(id == undefined){
  //   alert('faça o login para jogar')
  //   window.location.href = './index.html'
  // }



  function startQuiz(){
    currentQuestionIndex = 0
    score = 0
    nextButton.innerHTML = 'Next'
    showQuestion()
  }
  
  function showQuestion(){
    resetState()
    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + '. '+ currentQuestion.question;
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button')
      button.innerHTML = answer.text;
      button.classList.add('btn');
      answerButton.appendChild(button);
      if(answer.correct){
        button.dataset.correct = answer.correct
      }

      if(currentQuestion == questions[8]){
        questao3pontos.style.display = 'block'
        questionElement.style.display = 'none'
        nextButton.style.display = 'block'
        answerButton.style.display = 'none'
        valor = 1
      } else if(currentQuestion == questions[9]){
        questionElement.style.display = 'block'
        nextButton.style.display = 'block'
        questao3pontos.style.display = 'none'
        answerButton.style.display = 'block'
        musica.style.display = 'block'
        valor = 3
      } else {
        musica.style.display = 'none'
        valor = 1
      }
      button.addEventListener('click', selectAnswer);
    });
  }
  
  function resetState(){
    nextButton.style.display = 'none'
    while(answerButton.firstChild){
      answerButton.removeChild(answerButton.firstChild)
    }
  }
  
  function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === 'true';
    if(isCorrect){
      selectedBtn.classList.add('correct');
      score += valor
    } else {
      selectedBtn.classList.add('incorrect')
    }
    Array.from(answerButton.children).forEach(button => {
      if(button.dataset.correct === 'true'){
        button.classList.add('correct')
      }
      button.disable = true
    })
    nextButton.style.display = 'block'
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
  
  nextButton.addEventListener('click', () =>{
    if(currentQuestionIndex < questions.length){
      handleNextButton()
    } else {
      startQuiz()
    }
  })
  
  startQuiz();
