import formatData from "./helper.js";

const loader = document.getElementById("loader");
const container = document.getElementById("container");
const questionText = document.getElementById("question-text");
const answerList = document.querySelectorAll(".answer-text");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const qustionNumber = document.getElementById("question-number");
const error = document.getElementById("error");
const level = localStorage.getItem("lavel") || "medium";

const CORRECT_BONUS = 10;
const URL = `https://opentdb.com/api.php?amount=10&difficulty=${level}&type=multiple`;

let formattedData = null;
let questionIndex = 0;
let correctAnswer = null;
let score = 0;
let isAcceptet = true;

const fetchData = async () => {
  try {
    const response = await fetch(URL);
    const jsons = await response.json();
    formattedData = formatData(jsons.results);

    console.log(formattedData);
    start();
  } catch (error) {
    loader.style.display = " none";
    error.style.display = "block";
  }
};

const start = () => {
  showQuestion(formattedData);
  loader.style.display = "none";
  container.style.display = "block";
};

const showQuestion = () => {
  qustionNumber.innerText = questionIndex + 1;
  const { question, answers, correctAnswerIndex } =
    formattedData[questionIndex];
  correctAnswer = correctAnswerIndex;
  console.log(correctAnswer);
  questionText.innerText = question;
  answerList.forEach((button, index) => {
    button.innerText = answers[index];
  });
};

const checkAnswer = (event, index) => {
  if (!isAcceptet) return;
  isAcceptet = false;
  const isCorrect = correctAnswer === index ? true : false;
  if (isCorrect) {
    event.target.classList.add("correct");
    score += CORRECT_BONUS;
    scoreText.innerText = score;
  } else {
    event.target.classList.add("incorrect");
    answerList[correctAnswer].classList.add("correct");
  }
};

const nextHandler = () => {
  questionIndex++;

  if (questionIndex < formattedData.length) {
    isAcceptet = true;
    removeClass();
    showQuestion();
  } else {
    finishHandler();
  }
};

const removeClass = () => {
  answerList.forEach((button) => (button.className = "answer-text"));
};

const finishHandler = () => {
  localStorage.setItem("score", JSON.stringify(score));
  window.location.assign("end.html");
};

//******************************************************************* */

window.addEventListener("load", fetchData);
nextButton.addEventListener("click", nextHandler);
finishButton.addEventListener("click", finishHandler);
answerList.forEach((button, index) => {
  button.addEventListener("click", (event) => {
    checkAnswer(event, index);
  });
});
