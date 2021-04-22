import { html } from '../../libraries.js';

const resultTemplate = (quiz, result) => html`
<section id="summary" class="glass common">
        <article class="details">
            <h1>Quiz Results</h1>
            <h2>${quiz.title}</h2>
            <h2>A quiz by <a class="blink" data-micron="fade" data-micron-duration="2" href=${`/profile/${quiz.owner.objectId}`}>${quiz.owner.username}</a></h2>

            <div class="summary-top">
                ${result.percent}%
            </div>

            <div class="summary-bottom">
            ${result.correct}/${result.total} correct answers
            </div>

            <div class="btn-holderr">
                <a class="add-answer-btn common choose" href=${`/quiz/${quiz.objectId}`}><i class="fas fa-sync-alt"></i> Retake Quiz</a>
                <a class="add-answer-btn common choose" href="javascript:void(0)"><i class="fas fa-clipboard-list"></i> See Details</a>
            </div>
        </article>

        <article class="quiz-preview result-holder">
            <div class="quiz-description">
            <h3> Question 1</h3>
            <span class="quiz-topic">This is the question</span>
            <i class="fas fa-times"></i>
            <i class="fas fa-check"></i>
        </article>

        <article class="quiz-preview result-holder">
            <div class="quiz-description">
            <h3> Question 1</h3>
            <span class="quiz-topic">This is the question</span>
            <i class="fas fa-times"></i>
            <i class="fas fa-check"></i>
        </article>
</section>
`;


export async function resultPage(ctx){
    const questions = ctx.quiz.questions;
    const answers = ctx.quiz.answers;
    const correct = answers.reduce((r, c, i) => r + Number(questions[i].correctIndex == c), 0);
    
    ctx.render(resultTemplate(ctx.quiz, {
        percent: (correct / questions.length * 100).toFixed(0),
        correct,
        total: questions.length
    }));
}