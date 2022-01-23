const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')


let secondsLeft = 75;
let timer = document.getElementById('timer');
let scoresDiv = document.getElementById('scores-div');
let buttonsDiv = document.getElementById("buttons")
let viewScoresBtn = document.getElementById("view-scores")


function setTime() {
    displayQuestions();
    let timerInterval = setInterval(function() {
      secondsLeft--;
      timer.textContent = "";
      timer.textContent = "Time: " + secondsLeft;
      if (secondsLeft <= 0 || questionCount === questions.length) {
        clearInterval(timerInterval);
        captureUserScore();
      } 
    }, 1000);
  }

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame, setTime)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'What is github?',
    answers: [
      { text: 'consist of code', correct: true },
      { text: 'consist websites', correct: false },
      {text: 'consist of mathematical expressions', correct: false},
      {text: 'consist of mathematical calculator', correct: false}

    ]
  },
  {
    question: 'An arrays length can be evaluated with the what property?',
    answers: [
      { text: 'lenght', correct: true },
      { text: 'log', correct: false },
      { text: 'the console', correct: false },
      { text: 'loop', correct: false }
    ]
  },
  {
    question: 'Properties in a JavaScript oject are often refferred to as what?',
    answers: [
      { text: 'dot walking', correct: false },
      { text: 'key-value pairs', correct: true },
      { text: 'undefined', correct: false },
      { text: 'nested properties', correct: false }
    ]
  },
  {
    question: 'What is a callback function?',
    answers: [
      { text: 'a function that accepts an array as an argument', correct: true },
      { text: 'I function that performs an HTTP request', correct: false },
      { text: 'a data type similar to a string or a boolean', correct: false },
      { text: 'log', correct: false }
    ]
},

    {
    question: 'Which array method inserts an element at the end of the array??',
    answers: [
      { text: 'pop', correct: false },
      { text: 'push', correct: true },
      { text: 'lenght', correct: false },
      { text: 'log', correct: false }
    ]
  }
]