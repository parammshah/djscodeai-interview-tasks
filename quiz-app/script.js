const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedback = document.getElementById("feedback");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");
const timerEl = document.getElementById("timer");
const scoreContainer = document.getElementById("score-container");
const leaderboardEl = document.getElementById("leaderboard");

let currentQuestionIndex = 0;
let score = 0;
let time = 0;
let timerInterval;
let quizEnded = false;

// Load leaderboard from localStorage
function loadLeaderboard() {
  return JSON.parse(localStorage.getItem("leaderboard")) || [];
}

function saveLeaderboard(newScore) {
  let leaderboard = loadLeaderboard();
  leaderboard.push(newScore);
  leaderboard.sort((a, b) => b.score - a.score);
  leaderboard = leaderboard.slice(0, 5); // top 5
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  return leaderboard;
}

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  time = 0;
  quizEnded = false;

  scoreContainer.classList.add("hidden");
  leaderboardEl.classList.add("hidden");
  restartBtn.classList.add("hidden");

  startTimer();
  showQuestion();
}

let timer; 
let timeLeft = 30; // start from 30

function startTimer() {
  clearInterval(timer);
  timeLeft = 30; // reset to 30 each question
  timerEl.textContent = `⏳ Time Left: ${timeLeft}s`;

  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `⏳ Time Left: ${timeLeft}s`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      feedback.textContent = `⏰ Time’s up! Correct answer: ${questions[currentQuestionIndex].options[questions[currentQuestionIndex].correct]}`;
      feedback.classList.add("feedback-incorrect");
      disableOptions();
      nextBtn.classList.remove("hidden");
      nextBtn.classList.add("fade-in-btn");
    }
  }, 1000);
}

function showQuestion() {
  const q = questions[currentQuestionIndex];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  feedback.textContent = "";

  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectAnswer(i);
    optionsEl.appendChild(btn);
  });

  nextBtn.classList.add("hidden");
}

function selectAnswer(index) {
  const q = questions[currentQuestionIndex];

  feedback.className = "";
  if (index === q.correct) {
    feedback.textContent = "✅ Correct!";
    feedback.classList.add("feedback-correct");
    score++;
  } else {
    feedback.textContent = `❌ Incorrect! Correct answer: ${q.options[q.correct]}`;
    feedback.classList.add("feedback-incorrect");
  }

  disableOptions();

  nextBtn.classList.remove("hidden");
  nextBtn.classList.add("fade-in-btn");
}

function disableOptions() {
  [...optionsEl.children].forEach(btn => (btn.disabled = true));
}

function showScore() {
  clearInterval(timerInterval);
  quizEnded = true;

  scoreContainer.classList.remove("hidden");
  scoreContainer.textContent = `🎯 Your Score: ${score}/${questions.length} in ${time}s`;

  const leaderboard = saveLeaderboard({ score, time });
  leaderboardEl.classList.remove("hidden");
  leaderboardEl.innerHTML = "<h3>🏆 Leaderboard</h3><ul>" +
    leaderboard.map((s, i) => `<li>#${i + 1} → ${s.score}/${questions.length} in ${s.time}s</li>`).join("") +
    "</ul>";

  restartBtn.classList.remove("hidden");
  restartBtn.classList.add("fade-in-btn");
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

restartBtn.addEventListener("click", () => {
  startQuiz();
});

startQuiz();
