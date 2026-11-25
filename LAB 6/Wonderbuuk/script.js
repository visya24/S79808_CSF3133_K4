// Array of Quiz Questions
const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Text Machine Language",
            "Hyperlinks Text Mark Language",
            "Home Tool Markup Language"
        ],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "Which language is used to style web pages?",
        options: [
            "HTML",
            "CSS",
            "Java",
            "Python"
        ],
        answer: "CSS"
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: [
            "int",
            "string",
            "let",
            "define"
        ],
        answer: "let"
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: [
            "<!-- -->",
            "//",
            "**",
            "##"
        ],
        answer: "//"
    },
    {
        question: "Which function displays a message box in JavaScript?",
        options: [
            "prompt()",
            "document.write()",
            "alert()",
            "console.log()"
        ],
        answer: "alert()"
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        options: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        answer: "<a>"
    },
    {
        question: "Which method is used to select an HTML element by its ID?",
        options: [
            "getElementById()",
            "getElement()",
            "queryId()",
            "selectElement()"
        ],
        answer: "getElementById()"
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style System",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        answer: "Cascading Style Sheets"
    },
    {
        question: "Which operator is used for strict equality in JavaScript?",
        options: [
            "=",
            "==",
            "===",
            "!="
        ],
        answer: "==="
    },
    {
        question: "Which function generates a random number in JavaScript?",
        options: [
            "Math.random()",
            "Math.floor()",
            "random.number()",
            "Number.random()"
        ],
        answer: "Math.random()"
    }
];

// Global Variables
let shuffledQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let timeLeft = 15;
let timer;
let answered = false;

// Shuffle Questions
function shuffleQuestions() {

    shuffledQuestions = [...questions];

    for (let i = shuffledQuestions.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [shuffledQuestions[i], shuffledQuestions[j]] =
            [shuffledQuestions[j], shuffledQuestions[i]];
    }
}

// Start Quiz
function startQuiz() {

    clearInterval(timer);

    currentQuestion = 0;
    score = 0;

    shuffleQuestions();

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("result-screen").style.display = "none";
    document.getElementById("quiz-screen").style.display = "block";

    displayQuestion();

}

// Display Question
function displayQuestion() {

    clearInterval(timer);

    selectedAnswer = "";
    answered = false;

    const questionData = shuffledQuestions[currentQuestion];

    document.getElementById("question-number").textContent =
        "Question " + (currentQuestion + 1) +
        " / " + shuffledQuestions.length;

    document.getElementById("question").textContent =
        questionData.question;

    document.getElementById("feedback").textContent = "";

    document.getElementById("submit-btn").style.display = "inline-block";
    document.getElementById("submit-btn").disabled = false;

    document.getElementById("next-btn").style.display = "none";

    // Display Answer Options
    const optionsContainer = document.getElementById("answer-options");

    optionsContainer.innerHTML = "";

    questionData.options.forEach(function(option) {

        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.onclick = function() {

            if (answered) {
                return;
            }

            // Remove previous selection
            document.querySelectorAll(".option").forEach(function(btn) {
                btn.classList.remove("selected");
            });

            // Select current answer
            button.classList.add("selected");

            selectedAnswer = option;
        };

        optionsContainer.appendChild(button);

    });

    startTimer();

}

// Start Timer
function startTimer() {

    timeLeft = 15;

    document.getElementById("timer").textContent =
        "Time: " + timeLeft + "s";

    document.getElementById("timer-progress").style.width = "100%";

    timer = setInterval(function() {

        timeLeft--;

        document.getElementById("timer").textContent =
            "Time: " + timeLeft + "s";

        document.getElementById("timer-progress").style.width =
            (timeLeft / 15 * 100) + "%";

        if (timeLeft <= 5) {
            document.getElementById("timer-progress").style.backgroundColor = "red";
        } else {
            document.getElementById("timer-progress").style.backgroundColor = "#28a745";
        }

        if (timeLeft <= 0) {

            clearInterval(timer);

            if (!answered) {
                timeOut();
            }

        }

    }, 1000);

}

// Check Answer
function checkAnswer() {

    if (answered) {
        return;
    }

    if (selectedAnswer === "") {

        alert("Please select an answer first.");

        return;
    }

    clearInterval(timer);

    answered = true;

    const correctAnswer = shuffledQuestions[currentQuestion].answer;

    const feedback = document.getElementById("feedback");

    // Check whether the answer is correct
    if (selectedAnswer === correctAnswer) {

        score++;

        feedback.textContent = "Correct! Well done!";
        feedback.style.color = "green";

    } else {

        feedback.textContent =
            "Incorrect! The correct answer is: " + correctAnswer;

        feedback.style.color = "red";

    }

    // Highlight the correct and incorrect answers
    document.querySelectorAll(".option").forEach(function(button) {

        button.disabled = true;

        if (button.textContent === correctAnswer) {

            button.classList.add("correct");

        } else if (button.textContent === selectedAnswer) {

            button.classList.add("incorrect");

        }

    });

    document.getElementById("submit-btn").style.display = "none";

    document.getElementById("next-btn").style.display = "inline-block";

}

// Handle Timer Expiry
function timeOut() {

    answered = true;

    const correctAnswer = shuffledQuestions[currentQuestion].answer;

    const feedback = document.getElementById("feedback");

    feedback.textContent =
        "Time is up! The correct answer is: " + correctAnswer;

    feedback.style.color = "red";

    document.querySelectorAll(".option").forEach(function(button) {

        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }

    });

    document.getElementById("submit-btn").style.display = "none";

    document.getElementById("next-btn").style.display = "inline-block";

}

// Move to Next Question
function nextQuestion() {

    clearInterval(timer);

    currentQuestion++;

    if (currentQuestion < shuffledQuestions.length) {

        displayQuestion();

    } else {

        showResult();

    }

}

// Display Final Result
function showResult() {

    clearInterval(timer);

    document.getElementById("quiz-screen").style.display = "none";

    document.getElementById("result-screen").style.display = "block";

    document.getElementById("final-score").textContent =
        "Your Score: " + score + " / " + shuffledQuestions.length;

    let message = "";

    if (score === shuffledQuestions.length) {

        message = "Excellent! You got all the answers correct!";

    } else if (score >= shuffledQuestions.length / 2) {

        message = "Good job! You have a good understanding of JavaScript.";

    } else {

        message = "Keep practising! You can improve your score.";

    }

    document.getElementById("result-message").textContent = message;

}
