const data = [
  {
    id: 0,
    question: "Which is the right word?",
    answers: [
      { answer: "paragraph", isCorrect: true },
      { answer: "pragarph", isCorrect: false },
      { answer: "peragph", isCorrect: false },
      { answer: "pragharx", isCorrect: false },
    ],
  },
  {
    id: 1,
    question: "Which of these fish is actually a fish?",
    answers: [
      { answer: "swordfish", isCorrect: true },
      { answer: "jellyfish", isCorrect: false },
      { answer: "starfish", isCorrect: false },
      { answer: "crayfish", isCorrect: false },
    ],
  },
  {
    id: 2,
    question: "A flutter is a group of:",
    answers: [
      { answer: "bees", isCorrect: false },
      { answer: "penguins", isCorrect: false },
      { answer: "butterflies", isCorrect: true },
      { answer: "camels", isCorrect: false },
    ],
  },
  {
    id: 3,
    question: "A group of which animals is referred to as a wake?",
    answers: [
      { answer: "bats", isCorrect: false },
      { answer: "vultures", isCorrect: true },
      { answer: "ants", isCorrect: false },
      { answer: "fuze", isCorrect: false },
    ],
  },
];

// Start code

const quizScreen = document.querySelector(".quiz");
const resultScreen = document.querySelector(".result");
const question = document.querySelector(".question");
const answerContainer = document.querySelector(".answerContainer");
const submitBtn = document.getElementById("submitBtn");
const reTest = document.getElementById("reTest");

let questionIndex = 0;
let correctAnswer = 0;
let wrongAnswer = 0;
// let totalScore;
let totalSelectedAnswer;

const showQuestions = questionNumber => {
  if (questionIndex === data.length) {
    return showResult();
  }
  totalSelectedAnswer = null;
  question.textContent = data[questionNumber].question;

  answerContainer.innerHTML = data[questionNumber].answers
    .map(
      (item, index) => ` <div class="answer">
        <input id="${index}" type="radio" value="${item.isCorrect}" name="ans">
        <label for="${index}">${item.answer}</label>
     </div>
  `
    )
    .join("");
  selectAnswer();
};

const selectAnswer = () => {
  answerContainer.querySelectorAll("input").forEach(el => {
    el.addEventListener("click", e => {
      totalSelectedAnswer = e.target.value;
    });
  });
};

const submitedAnswer = () => {
  submitBtn.addEventListener("click", () => {
    if (totalSelectedAnswer != null) {
      totalSelectedAnswer === "true" ? correctAnswer++ : wrongAnswer++;

      questionIndex++;
      showQuestions(questionIndex);
    } else {
      alert("Select an Answer");
    }
  });
};

const showResult = () => {
  resultScreen.style.display = "block";
  quizScreen.style.display = "none";

  resultScreen.querySelector(".wrong").textContent = `
  Wrong Answer: ${wrongAnswer}`;
  resultScreen.querySelector(".currect").textContent = `
  Correct Answer: ${correctAnswer}`;
  let totalScore = (correctAnswer - wrongAnswer) * 10;
  resultScreen.querySelector(
    ".score"
  ).textContent = `Your total score: ${totalScore}`;
};

reTest.addEventListener("click", () => {
  resultScreen.style.display = "none";
  quizScreen.style.display = "block";
});

showQuestions(questionIndex);

submitedAnswer();
