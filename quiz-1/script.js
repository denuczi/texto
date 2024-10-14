const quizData = [
    {
        question: "¿Cuál de los siguientes elementos es necesario para que una producción sea considerada un texto?",
        options: ["Extensión mínima de 100 palabras", "Uso exclusivo de lenguaje formal", "Intencionalidad comunicativa", "Uso de elementos gráficos", "Debe estar escrito en prosa"],
        correct: 2,
        explanation: "Para que una producción sea considerada un texto, debe tener un propósito específico, como persuadir, entretener o informar. Este es un aspecto esencial de la intencionalidad comunicativa."
    },
    {
        question: "¿Qué propiedad asegura que los elementos de un texto se relacionen entre sí para formar una unidad de sentido?",
        options: ["Autonomía", "Cohesión", "Coherencia", "Adecuación", "Extensión"],
        correct: 2,
        explanation: "La coherencia garantiza que los elementos del texto, como palabras, oraciones y párrafos, estén relacionados entre sí y con el tema global, creando una unidad de sentido en el plano del contenido."
    },
    {
        question: "¿Cuál es la propiedad que permite que la coherencia de un texto sea perceptible a través de sus formas de expresión?",
        options: ["Intencionalidad", "Autonomía", "Adecuación", "Cohesión", "Extensión"],
        correct: 3,
        explanation: "La cohesión se refiere al plano de la forma y expresión, asegurando que los elementos del texto estén conectados de manera tal que la coherencia sea perceptible a través de la estructura del discurso."
    },
    {
        question: "¿Qué característica NO es necesaria para que una producción sea considerada un texto?",
        options: ["Autonomía", "Coherencia", "Extensión mínima de 50 palabras", "Unidad", "Adecuación"],
        correct: 2,
        explanation: "No existe un requisito de longitud mínima para que algo sea considerado un texto. Lo esencial es que cumpla con propiedades como la coherencia, cohesión, autonomía y adecuación."
    },
    {
        question: "¿Qué se entiende por 'autonomía' en un texto?",
        options: ["Que el texto está completo en sí mismo, con un principio y un final.", "Que el texto puede tener varias interpretaciones.", "Que el texto debe ser extenso.", "Que el texto debe ser escrito por una sola persona.", "Que el texto no necesita intencionalidad comunicativa."],
        correct: 0,
        explanation: "La autonomía de un texto implica que este debe estar delimitado con un marco claro que lo defina, es decir, debe tener un principio y un final para ser considerado autónomo."
    },
    {
        question: "¿Qué relación debe haber entre los componentes de un texto para que se considere que tiene unidad?",
        options: ["Deben estar en diferentes formatos.", "Deben estar todos centrados en una sola idea o tema común.", "Deben estar relacionados por el uso de la primera persona.", "Deben ser escritos en distintos tiempos verbales.", "Deben incluir imágenes y gráficos."],
        correct: 1,
        explanation: "La unidad de un texto se refiere a que sus componentes palabras, oraciones, párrafos deben estar relacionados entre sí y centrados en un tema común, lo que asegura un sentido global."
    },
    {
        question: "¿Cuál de las siguientes NO es una propiedad de un texto?",
        options: ["Coherencia", "Adecuación", "Unidad", "Extensión mínima de 200 palabras", "Autonomía"],
        correct: 3,
        explanation: "La extensión no es una propiedad esencial de un texto. Lo importante es que cumpla con otras características como coherencia, cohesión, unidad, autonomía e intencionalidad comunicativa."
    },
    {
        question: "¿Qué función cumple la adecuación en un texto?",
        options: ["Asegurar que el texto tiene un tema común.", "Hacer que los diferentes componentes del texto se relacionen entre sí.", "Adaptar el texto a la situación comunicativa en la que se produce.", "Dar autonomía al texto para que tenga un principio y un final.", "Garantizar la coherencia entre las oraciones."],
        correct: 2,
        explanation: "La adecuación asegura que el texto se ajusta correctamente a la situación, contexto o audiencia en la que se genera el acto comunicativo."
    },
    {
        question: "¿Cuál es el propósito principal de la cohesión en un texto?",
        options: ["Darle un marco delimitado con un principio y un final.", "Hacer que las palabras y oraciones estén conectadas de manera lógica.", "Asegurar que el texto se ajusta a la situación comunicativa.", "Facilitar que el texto tenga varias interpretaciones.", "Evitar repeticiones innecesarias en el texto."],
        correct: 1,
        explanation: "La cohesión actúa en el plano de la forma o expresión, asegurando que los elementos del texto estén unidos de manera lógica y adecuada para facilitar la interpretación correcta de su contenido."
    },
    {
        question: "¿Por qué es importante la coherencia en un texto?",
        options: ["Porque garantiza que las partes del texto sean independientes.", "Porque asegura que todos los elementos estén relacionados entre sí y con el tema global.", "Porque le da al texto una estructura visual adecuada.", "Porque permite que el texto sea más extenso.", "Porque adapta el texto al contexto comunicativo."],
        correct: 1,
        explanation: "La coherencia es esencial para que un texto tenga un sentido lógico y que todos los elementos estén conectados y contribuyan a la comprensión del tema general del texto."
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