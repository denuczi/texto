const quizData = [
    {
        question: "¿Cuál es el propósito principal de la trama narrativa?",
        options: ["Describir objetos o lugares.", "Indicar procedimientos para realizar una actividad.", "Relatar acciones o hechos que se desarrollan en un tiempo.", "Explicar conceptos o ideas en profundidad.", "Desarrollar argumentos para persuadir sobre un tema."],
        correct: 2,
        explanation: "La trama narrativa se centra en contar historias o eventos que ocurren en un momento y lugar específicos."
    },
    {
        question: "¿Qué ejemplo corresponde a una trama descriptiva?",
        options: ["Novela", "Receta", "Ensayo", "Monografía", "Texto científico"],
        correct: 4,
        explanation: "La trama descriptiva se enfoca en describir objetos, lugares, seres vivos o fenómenos de manera objetiva."
    },
    {
        question: "¿Cuál es la finalidad de una trama instructiva?",
        options: ["Describir seres vivos o lugares", "Relatar anécdotas", "Explicar procedimientos para realizar una actividad", "Desarrollar un intercambio de diálogo", "Persuadir sobre un tema"],
        correct: 2,
        explanation: "La trama instructiva busca guiar al lector a través de pasos específicos para lograr un objetivo."
    },
    {
        question: "¿Qué tipo de texto tiene como propósito explicar conceptos o ideas en profundidad?",
        options: ["Expositivo", "Narrativo", "Argumentativo", "Descriptivo", "Conversacional"],
        correct: 0,
        explanation: "El texto expositivo se centra en explicar y analizar conceptos, teorías y ideas de manera detallada."
    },
    {
        question: "¿Qué ejemplo corresponde a una trama argumentativa?",
        options: ["Chiste", "Afiche", "Guía", "Crónica", "Descripción en un cuento"],
        correct: 1,
        explanation: "La trama argumentativa busca persuadir al lector o espectador sobre un tema o idea específica."
    },
    {
        question: "¿Qué propósito tiene la trama conversacional?",
        options: ["Desarrollar argumentos para persuadir sobre un tema", "Explicar conceptos o ideas en profundidad", "Reproducir un intercambio de diálogo", "Relatar hechos que se desarrollan en el tiempo", "Describir objetos o lugares"],
        correct: 2,
        explanation: "La trama conversacional se enfoca en representar diálogos entre personas."
    },
    {
        question: "¿Cuál de los siguientes ejemplos pertenece a una trama expositiva?",
        options: ["Crónica", "Afiche", "Receta", "Chiste", "Cuento"],
        correct: 0,
        explanation: "La crónica es un tipo de texto que combina elementos narrativos y descriptivos para explicar eventos históricos o sociales."
    },
    {
        question: "¿Qué tipo de trama se utiliza para describir objetos, lugares o seres vivos?",
        options: ["Narrativa", "Argumentativa", "Descriptiva", "Instructiva", "Conversacional"],
        correct: 2,
        explanation: "La trama descriptiva se utiliza para proporcionar detalles precisos y objetivos sobre objetos, lugares, seres vivos o fenómenos."
    },
    {
        question: "¿Cuál de las siguientes opciones es un ejemplo de texto instructivo?",
        options: ["Monografía", "Diálogo en novelas", "Ensayo", "Receta", "Texto científico"],
        correct: 3,
        explanation: "La receta es un ejemplo de texto instructivo que guía al lector a través de pasos específicos para preparar un plato."
    },
    {
        question: "¿Cuál es el propósito de una trama argumentativa?",
        options: ["Explicar conceptos o ideas en profundidad", "Reproducir un intercambio de diálogo", "Persuadir sobre un tema mediante argumentos", "Relatar hechos que se desarrollan en un tiempo", "Indicar procedimientos para realizar una actividad"],
        correct: 2,
        explanation: "La trama argumentativa busca persuadir al lector o espectador sobre un tema o idea específica mediante argumentos lógicos y evidencia."
    }
];

let currentQuestion = 0;
let score = 0;
const userAnswers = [];

const questionElement = document.querySelector(".question");
const optionsContainer = document.querySelector(".options");
const nextButton = document.getElementById("nextButton");
const resultsContainer = document.querySelector(".results");
const scoreElement = document.getElementById("score");
const feedbackElement = document.getElementById("feedback");
const questionCountElement = document.getElementById("questionCount");

function loadQuestion() {
    const currentQuizData = quizData[currentQuestion];
    questionCountElement.textContent = `Pregunta ${currentQuestion + 1} de ${quizData.length}`;
    questionElement.textContent = currentQuizData.question;
    optionsContainer.innerHTML = "";

    currentQuizData.options.forEach((option, index) => {
        const li = document.createElement("li");
        li.innerHTML = `<button class="option-button" onclick="selectAnswer(${index})">${option}</button>`;
        optionsContainer.appendChild(li);
    });

    nextButton.style.display = "none";
}

function selectAnswer(index) {
    document.querySelectorAll(".option-button").forEach((button, idx) => {
        button.classList.toggle("selected", idx === index);
    });
    nextButton.style.display = "block";
    userAnswers[currentQuestion] = index;
}

function nextQuestion() {
    const correctAnswer = quizData[currentQuestion].correct;
    if (userAnswers[currentQuestion] === correctAnswer) {
        score++;
    }
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionElement.style.display = "none";
    optionsContainer.style.display = "none";
    nextButton.style.display = "none";
    resultsContainer.style.display = "block";
    
    scoreElement.textContent = `Puntuación: ${score} de ${quizData.length}`;
    
    feedbackElement.innerHTML = quizData.map((data, index) => {
        const isCorrect = userAnswers[index] === data.correct;
        const feedbackItem = `
            <div class="feedback-item ${isCorrect ? 'correct' : 'incorrect'}">
                <h3>Pregunta: ${data.question}</h3>
                <p>Tu respuesta: ${data.options[userAnswers[index]] || "Sin responder"}</p>
                <p>Respuesta correcta: ${data.options[data.correct]}</p>
                <p class="explanation">${data.explanation}</p>
            </div>`;
        return feedbackItem;
    }).join("");
}

loadQuestion();