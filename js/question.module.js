import { newQuiz, questions, questionsContainer } from './index.js';

export default class Question {
    constructor(index) {
        this.index = index;
        this.question = questions[index].question;
        this.correct = questions[index].correct_answer;
        this.incorrect = questions[index].incorrect_answers;
        this.category = questions[index].category;
        this.allAnswers = this.shuffleAnswers();
        this.isAnswered = false;
    }
    shuffleAnswers() {
        return this.incorrect.concat(this.correct).sort();
    }
    displayQuestion() {
        let questionsBox = `
            <div class="question shadow-lg col-lg-6 offset-lg-3 p-4 rounded-3 d-flex flex-column justify-content-center align-items-center gap-3 animate__animated animate__bounceIn">
                <div class="w-100 d-flex justify-content-between">
                    <span class="btn btn-category">${this.category}</span>
                    <span class="fs-6 btn btn-questions">${this.index + 1} of ${questions.length} Questions</span>
                </div>
                <h2 class="text-capitalize h4 text-center">${this.question}</h2>  
                <ul class="choices w-100 list-unstyled m-0 d-flex flex-wrap text-center">
                ${this.allAnswers.map((choice) => `<li>${choice}</li>`).join("")}
                </ul>
                <h2 class="text-capitalize text-center score-color h3 fw-bold">
                    <i class="bi bi-emoji-laughing"></i> 
                    Score: ${newQuiz.score}
                </h2>        
            </div>`;
        questionsContainer.innerHTML = questionsBox;
        const allChoices = document.querySelectorAll('.choices');
        allChoices.forEach(choice => {
            choice.addEventListener('click', (e) => {
                this.checkAnswer(e);
            })
        });
    }
    checkAnswer(e) {
        if (!this.isAnswered) {
            this.isAnswered = true;
            if (this.correct === e.target.innerHTML) {
                e.target.classList.add(
                    "correct",
                    "animate__animated",
                    "animate__flipInY")
                newQuiz.score++;
            } else {
                e.target.classList.add(
                    "wrong",
                    "animate__animated",
                    "animate__shakeX")
            }
            this.animatedQuestion(e.target);
        }
    }
    displayNextQuestion() {
        this.index++;
        if (this.index < questions.length) {
            const nextQuestion = new Question(this.index);
            nextQuestion.displayQuestion();
            return;
        }
        questionsContainer.innerHTML = newQuiz.endQuiz();
        const tryAgain = document.querySelector('.again');
        tryAgain.addEventListener('click', function () {
            window.location.reload();
        })
    }
    animatedQuestion(element) {
        setTimeout(() => {
            element.closest('.question').classList.add('animate__animated', 'animate__bounceOutLeft');
            setTimeout(() => { this.displayNextQuestion() }, 1000);
        }, 500);
    }
}