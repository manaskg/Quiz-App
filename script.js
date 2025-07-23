document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("start-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const questionContainer = document.getElementById("question-container");
  const questionText = document.getElementById("question-text");
  const choicesList = document.getElementById("choices-list");
  const resultContainer = document.getElementById("result-container");
  const scoreDisplay = document.getElementById("score");

  const questions = [
    {
      question: "What is the capital of France?",
      choices: ["Paris", "London", "Berlin", "Madrid"],
      answer: "Paris",
      marks: 3,
    },
    {
      question: "Which planet is known as the Red Planet?",
      choices: ["Mars", "Venus", "Jupiter", "Saturn"],
      answer: "Mars",
      marks: 3,
    },
    {
      question: "Who wrote 'Hamlet'?",
      choices: [
        "Charles Dickens",
        "Jane Austen",
        "William Shakespeare",
        "Mark Twain",
      ],
      answer: "William Shakespeare",
      marks: 2,
    },
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  startBtn.addEventListener("click", startQuiz);

  function startQuiz() {
    startBtn.classList.add("hidden");
    // resultContainer.classList.add("hidden");
    questionContainer.classList.remove("hidden");
    showQuestion();
  }

  function showQuestion() {
    nextBtn.classList.add("hidden");
    questionText.textContent = questions[currentQuestionIndex].question;
    choicesList.innerHTML = ""; //clears previous choices

    questions[currentQuestionIndex].choices.forEach((choiceText) => {
      const li = document.createElement("li");
      li.textContent = choiceText;
      choicesList.appendChild(li);

      li.addEventListener("click", function tap(e) {
        selectAnswer(choiceText, li, e);
        // disableChoices
        // li.removeEventListener("click", tap);
      });
    });
  }

  function selectAnswer(choiceText, li, e) {
    const correctAnswer = questions[currentQuestionIndex].answer;
    //Prevent further selection: remove click listeners from all choices
    Array.from(choicesList.children).forEach((child) => {
      child.style.pointerEvents = "none";
    });

    if (choiceText === correctAnswer) {
      // score++;
      score = score + questions[currentQuestionIndex].marks;
    }
    li.classList.add("selected");
    nextBtn.classList.remove("hidden");
    console.log(e);
  }

  nextBtn.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    let points = 0;
    questions.forEach((q) => {
      points += q.marks;
    });

    questionContainer.classList.add("hidden");
    resultContainer.classList.remove("hidden");
    scoreDisplay.textContent = `${score} out of ${points}`;
  }

  restartBtn.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultContainer.classList.add("hidden");
    startQuiz();
  });
});
