const quizData = [
    {
        question: "¿Qué tipo de registro se caracteriza por seguir las reglas gramaticales y ortográficas de manera correcta?",
        options: ["Registro informal", "Registro coloquial", "Registro formal", "Registro vulgar", "Registro casual"],
        correct: 2,
        explanation: "El registro formal se caracteriza por el uso correcto de las reglas gramaticales y ortográficas, siendo utilizado en contextos profesionales y académicos."
    },
    {
        question: "En el registro informal, ¿a quién se dirige usualmente el emisor?",
        options: ["Al receptor de usted", "Al receptor de tú o vos", "Al receptor de ellos", "Al receptor de usted o señor", "Al receptor formal"],
        correct: 1,
        explanation: "El registro informal suele emplearse en conversaciones cercanas, donde el emisor se dirige al receptor con pronombres familiares como 'tú' o 'vos'."
    },
    {
        question: "¿Cuál de las siguientes características corresponde al registro formal?",
        options: ["Uso de muletillas y vulgarismos", "Oraciones simples y cortas", "Utilización de un vocabulario rico y variado", "Uso de diminutivos y apodos", "Omisión de palabras para mayor rapidez"],
        correct: 2,
        explanation: "El registro formal se distingue por un vocabulario variado y preciso, evitando términos coloquiales o informales."
    },
    {
        question: "¿Qué elemento es común en el registro informal?",
        options: ["Correcta pronunciación", "Ausencia de redundancias", "Expresiones estructuradas y coherentes", "Uso de muletillas, modismos o vulgarismos", "Evita omisiones de palabras"],
        correct: 3,
        explanation: "El registro informal a menudo incluye modismos, muletillas y vulgarismos, ya que es usado en contextos relajados y no formales."
    },
    {
        question: "¿Cuál de los siguientes ejemplos es de registro formal?",
        options: ["¡Nooo! Cuesta un ojo de la cara.", "Che en qué quilombo te metiste eh.", "Estimado señor Caballero le escribo para informarle sobre...", "Se re zarparon con eso.", "Fijate lo que te escribí."],
        correct: 2,
        explanation: "El registro formal se utiliza en situaciones profesionales o formales, como correspondencias laborales o comunicados oficiales."
    },
    {
        question: "En el registro formal, ¿cómo suelen ser las oraciones?",
        options: ["Cortas y simples", "Largas y complejas", "Con modismos", "Repetitivas", "Con muletillas"],
        correct: 1,
        explanation: "El registro formal tiende a utilizar oraciones más elaboradas, con mayor complejidad estructural para expresar ideas completas de manera precisa."
    },
    {
        question: "¿Qué evita el registro formal en sus expresiones?",
        options: ["Sinónimos y redundancias", "Modismos, vulgarismos o muletillas", "Pronombres", "Información coherente", "Estructuración de la información"],
        correct: 1,
        explanation: "El registro formal evita expresiones informales como modismos, vulgarismos o muletillas, buscando siempre la precisión y el respeto."
    },
    {
        question: "¿Cuál de las siguientes opciones es un ejemplo del registro informal?",
        options: ["Disculpe, ¿podría decirme qué hora es?", "Espero tenga en cuenta mi candidatura...", "¡Qué copado que no tengamos tareas hoy!", "Debido a los sucesos acontecidos el mes pasado...", "Si tiene alguna duda no dude en contactarme"],
        correct: 2,
        explanation: "El registro informal es característico en expresiones cotidianas, como '¡Qué copado!', que reflejan una conversación relajada."
    },
    {
        question: "¿Cuál de las siguientes afirmaciones es correcta sobre el registro informal?",
        options: ["Usa sinónimos para evitar redundancias", "No acepta diminutivos o apodos", "Suele omitir palabras para mayor rapidez", "Utiliza un vocabulario rico y variado", "Presenta la información de manera estructurada y coherente"],
        correct: 2,
        explanation: "En el registro informal, a menudo se omiten palabras para hacer la comunicación más rápida y casual, especialmente en diálogos cotidianos."
    },
    {
        question: "¿Qué se evita en el registro formal para mantener una comunicación adecuada?",
        options: ["Pronombres", "Uso de sinónimos", "Estructura gramatical", "Expresiones coloquiales como apodos o diminutivos", "Lenguaje técnico"],
        correct: 3,
        explanation: "El registro formal evita expresiones coloquiales como apodos o diminutivos, ya que busca una comunicación clara, objetiva y respetuosa."
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