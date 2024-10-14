
const quizData = [
    {
        question: "¿Qué recurso de cohesión léxica se utiliza para evitar la repetición al reemplazar una palabra por otra equivalente?",
        options: ["Repetición", "Sinonimia", "Sustitución", "Hiperonimia", "Campo semántico"],
        correct: 2,
        explanation: "La sustitución permite evitar la repetición reemplazando una palabra por otra que tiene el mismo significado o un significado relacionado."
    },
    {
        question: "¿Cuál de los siguientes ejemplos corresponde al uso de hiperonimia e hiponimia?",
        options: ["Era linda, tan linda que brillaba.", "El señor se fue; era un hombre joven.", "Compramos algodón, barbijos y alcohol en gel.", "Las flores que tienen mayor perfume son las rosas, las gardenias y los jazmines.", "La gente dice lo que piensa."],
        correct: 3,
        explanation: "Las palabras 'rosas', 'gardenias' y 'jazmines' son hipónimos de 'flores', que es un hiperónimo que abarca estas categorías específicas."
    },
    {
        question: "El recurso que vincula palabras con rasgos de significado en común se denomina:",
        options: ["Sinonimia", "Sustitución", "Repetición", "Palabras generalizadoras", "Campo semántico"],
        correct: 4,
        explanation: "El campo semántico agrupa palabras que comparten rasgos de significado en común, facilitando la cohesión en el discurso."
    },
    {
        question: "¿Cuál de las siguientes opciones es un ejemplo de elipsis?",
        options: ["Era linda, tan linda que brillaba.", "El suyo es nuevo.", "Juana llegó tarde, la noté cansada.", "Luisa está aquí. Juan, allá.", "Llegué tarde porque no andaba el tren."],
        correct: 3,
        explanation: "La elipsis se presenta cuando se omite información que se sobreentiende, como en 'Luisa está aquí. Juan, allá', donde 'está' se sobreentiende."
    },
    {
        question: "¿Qué recurso de cohesión léxica se observa en la oración: \"El señor se fue; era un hombre joven\"?",
        options: ["Sustitución", "Repetición", "Sinonimia", "Hiperonimia", "Campo semántico"],
        correct: 2,
        explanation: "Se utiliza la sinonimia, ya que 'señor' y 'hombre' tienen un significado equivalente en este contexto."
    },
    {
        question: "Las palabras con significado amplio o indefinido se conocen como:",
        options: ["Hiperónimos", "Hipónimos", "Palabras generalizadoras", "Pronombres", "Conectores"],
        correct: 2,
        explanation: "Las palabras generalizadoras abarcan significados amplios, permitiendo referirse a varias categorías de manera global."
    },
    {
        question: "¿Qué recurso de cohesión gramatical relaciona un pronombre con otra palabra para darle sentido?",
        options: ["Elipsis", "Repetición", "Conexión", "Referencia por pronombres", "Sustitución"],
        correct: 3,
        explanation: "La referencia por pronombres permite relacionar un pronombre con su antecedente, proporcionando coherencia al texto."
    },
    {
        question: "¿Qué recurso de cohesión se utiliza cuando se expresa la relación entre palabras mediante conectores?",
        options: ["Elipsis", "Repetición", "Conexión", "Sustitución", "Hiperonimia"],
        correct: 2,
        explanation: "Los conectores permiten unir ideas de manera lógica, facilitando la cohesión del texto mediante la conexión de conceptos."
    },
    {
        question: "¿Qué recurso se emplea en la frase: \"Era linda, tan linda que brillaba\"?",
        options: ["Hiperonimia", "Repetición", "Sinonimia", "Campo semántico", "Sustitución"],
        correct: 1,
        explanation: "La repetición refuerza la idea al repetir la misma palabra o estructura, creando énfasis en la expresión."
    },
    {
        question: "¿Cuál de las siguientes oraciones es un ejemplo del uso de palabras generalizadoras?",
        options: ["El señor se fue; era un hombre joven.", "Compramos algodón, barbijos y alcohol en gel.", "Era linda, tan linda que brillaba.", "La gente dice lo que piensa.", "Llegué tarde porque no andaba el tren."],
        correct: 3,
        explanation: "Las palabras generalizadoras como 'la gente' abarcan significados amplios, lo que permite evitar especificaciones innecesarias."
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