import Quiz from "./quiz.module.js";
import Question from "./question.module.js";

// HTML Elements
const categoryMenu = document.getElementById('categoryMenu');
const difficultyOptions = document.getElementById('difficultyOptions');
const questionsNumber = document.getElementById('questionsNumber');
const startQuiz = document.getElementById('startQuiz');
const quizOptions = document.getElementById('quizOptions');
export const questionsContainer = document.querySelector('.questions-container');

// Variables
export let newQuiz = {};
export let questions = [];

// Events
startQuiz.addEventListener('click', async function () {
    const category = categoryMenu.value;
    const difficulty = difficultyOptions.value;
    const amount = questionsNumber.value;
    
    newQuiz = new Quiz(category, difficulty, amount);
    
    questions = await newQuiz.getQuestions();
    
    quizOptions.classList.replace('d-flex', 'd-none');
    
    const firstQuestion = new Question(0);
    firstQuestion.displayQuestion();
})