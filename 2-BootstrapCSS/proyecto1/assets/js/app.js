// select all elements
const start = document.getElementById("start");
const title = document.getElementById("title");
const greet = document.getElementById("greet");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const containerElement = document.getElementById("card");
const scoreDiv = document.getElementById("scoreContainer");

// create our questions
let questions = [
  {
    question: "¿Quién inventó Javascript?",
    choiceA: "Brendan Eich",
    choiceB: "Douglas Crockford",
    choiceC: "Sheryl Sandberg",
    correct: "A",
  },
  {
    question: "¿Cuál de estos es un administrador de paquetes de JavaScript?",
    choiceA: "Node.js",
    choiceB: "npm",
    choiceC: "Typescript",
    correct: "B",
  },
  {
    question: "¿Cuál de estos es un testing para JavaScript?",
    choiceA: "Node.js",
    choiceB: "npm",
    choiceC: "Jest",
    correct: "C",
  },
  {
    question:
      "¿Qué herramienta puedes usar para asegurar la calidad del código?",
    choiceA: "Angular",
    choiceB: "jQuery",
    choiceC: "EsLint",
    correct: "C",
  },
  {
    question: "¿Cuál de estos es un Framework para JavaScript?",
    choiceA: "Node.js",
    choiceB: "Bootstrap",
    choiceC: "Angular",
    correct: "C",
  },
  {
    question: "¿Cuál de estos es un módulo de paquetes de JavaScript?",
    choiceA: "React.js",
    choiceB: "webpack",
    choiceC: "Typescript",
    correct: "B",
  },
];

// create some variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render a question
function renderQuestion() {
  let q = questions[runningQuestion];

  question.innerHTML = "<p>" + q.question + "</p>";
  choiceA.innerHTML = q.choiceA;
  choiceB.innerHTML = q.choiceB;
  choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click", startQuiz);

// start quiz
function startQuiz() {
  start.style.display = "none";
  title.style.display = "none";
  greet.style.display = "none";
  renderQuestion();
  quiz.style.display = "block";
  renderProgress();
  renderCounter();
  TIMER = setInterval(renderCounter, 1000); // 1000ms = 1s
}

// render progress
function renderProgress() {
  for (let qIndex = 0; qIndex <= lastQuestion; qIndex++) {
    progress.innerHTML += "<div class='prog' id=" + qIndex + "></div>";
  }
}

// counter render

function renderCounter() {
  if (count <= questionTime) {
    counter.innerHTML = count;
    timeGauge.style.width = count * gaugeUnit + "px";
    count++;
  } else {
    count = 0;
    // change progress color to red
    answerIsWrong();
    if (runningQuestion < lastQuestion) {
      runningQuestion++;
      renderQuestion();
    } else {
      // end the quiz and show the score
      clearInterval(TIMER);
      scoreRender();
    }
  }
}

// checkAnwer

function checkAnswer(answer) {
  if (answer == questions[runningQuestion].correct) {
    // answer is correct
    score++;
    // change progress color to green
    answerIsCorrect();
  } else {
    // answer is wrong
    // change progress color to red
    answerIsWrong();
  }
  count = 0;
  if (runningQuestion < lastQuestion) {
    runningQuestion++;
    renderQuestion();
  } else {
    // end the quiz and show the score
    clearInterval(TIMER);
    scoreRender();
  }
}

// answer is correct
function answerIsCorrect() {
  document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// answer is Wrong
function answerIsWrong() {
  document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// score render
function scoreRender() {
  scoreDiv.style.display = "block";

  // calculate the amount of question percent answered by the user
  const scorePerCent = Math.round((100 * score) / questions.length);

  quiz.style.display = "none";
  containerElement.style.display = "none";

  // choose the image based on the scorePerCent
  let img =
    scorePerCent >= 80
      ? "assets/img/5.png"
      : scorePerCent >= 60
      ? "assets/img/4.png"
      : scorePerCent >= 40
      ? "assets/img/3.png"
      : scorePerCent >= 20
      ? "assets/img/2.png"
      : "assets/img/1.png";

  scoreDiv.innerHTML = "<img src=" + img + ">";
  scoreDiv.innerHTML += "<p>" + scorePerCent + "%</p>";
  scoreDiv.innerHTML +=
    "<a href='index.html' class='btn btn-primary'>Volver</a>";
}
