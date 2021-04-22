import { html } from '../../libraries.js';

const resultTemplate = (quiz, result) => html`
<section id="summary" class="glass common">
    <div>
        <article class="details">
            <h1>Quiz Results</h1>
            <h2>${quiz.title}</h2>
            <h2>A quiz by <a class="blink" data-micron="fade" data-micron-duration="2" href=${`/profile/${quiz.owner.objectId}`}>${quiz.owner.username}</a></h2>

            <div class="summary summary-top">
                ${result.percent}%
            </div>

            <div class="summary">
            ${result.correct}/${result.total} correct answers
            </div>

            <a class="action cta" href=${`/quiz/${quiz.objectId}`}><i class="fas fa-sync-alt"></i> Retake Quiz</a>
            <a class="action cta" href="#"><i class="fas fa-clipboard-list"></i> See Details</a>

        </article>
    </div>
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