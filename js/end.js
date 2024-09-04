const score = JSON.parse(localStorage.getItem("score"));
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const scoreEle = document.querySelector("p");
const input = document.querySelector("input");
const saveButton = document.querySelector("button");
scoreEle.innerText = score;
const saveHanler = () => {
  if (!input.value || !score) {
    alert("Invalid username or score");
  } else {
    const finalScore = { name: input.value, score };
    highScores.push(finalScore);
    highScores.sort((a, b) => b.score - a.score);
    highScores.splice(10);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    localStorage.removeItem("scores");
    window.location.assign("./index.html");
  }
};
saveButton.addEventListener("click", saveHanler);
