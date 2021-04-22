import { html, styleMap } from '../../libraries.js';

const resultTemplate = (quiz, result, correctAnswers, showResults) => html`
<section id="summary" class="glass common">
    <article class="details">
        <h1>Quiz Results</h1>
        <h2>${quiz.title}</h2>
        <h2>A quiz by <a class="blink" data-micron="fade" data-micron-duration="2"
                href=${`/profile/${quiz.owner.objectId}`}>${quiz.owner.username} </a> </h2> <div class="summary-top">
                ${result.percent}%
                </div>

                <div class="summary-bottom">
                    ${result.correct}/${result.total} correct answers
                </div>

                <div class="btn-holderr">
                    <a class="add-answer-btn common choose" href=${`/quiz/${quiz.objectId}`}> <i
                        class="fas fa-sync-alt"></i> Retake Quiz</a>
                    <a @click=${showResults} class="add-answer-btn common choose" href="javascript:void(0)"><i
                            class="fas fa-clipboard-list"></i> See Details</a>
                </div>
    </article>

    <div id="result-questions" style=${styleMap({display:'none'})} >
    ${correctAnswers.map(questionReview)}
    </div>

</section>
`;

const questionReview = (currentQuestion) => html`
<article class="quiz-preview result-holder" style=${styleMap(currentQuestion.isCorrect ? {borderColor : 'rgba(124, 188, 6, 0.92)', backgroundColor :'green' } : {borderColor : 'rgba(247, 69, 69, 0.644)', backgroundColor : 'red'})}>
    <div class="quiz-description">
        <h3> Question ${currentQuestion.index + 1 }</h3>
        <span class="quiz-topic">${currentQuestion.question}</span>

    </div>
        ${currentQuestion.isCorrect ? html`<i class="fas fa-check"></i>` : html`<i class="fas fa-times"></i>`}

</article>
`;


export async function resultPage(ctx) {
    const correctAnswers = [];
    const questions = ctx.quiz.questions;
    const answers = ctx.quiz.answers;
    const correct = answers.reduce((r, c, i) => r + Number(questions[i].correctIndex == c), 0);
    questions.forEach((q, i) => correctAnswers.push({ index: i, question: q.text, isCorrect: q.correctIndex == answers[i] }));

    ctx.render(resultTemplate(ctx.quiz, {
        percent: (correct / questions.length * 100).toFixed(0),
        correct,
        total: questions.length
    }, correctAnswers, showResults));

    function showResults(ev){
        const resultHolder = document.getElementById('result-questions');

        resultHolder.style.display = resultHolder.style.display == 'none' ? 'block' : 'none';
        ev.target.innerHTML = resultHolder.style.display == 'none' ? '<a> <i class="fas fa-clipboard-list"></i> See Details</a>' : '<a> <i class="fas fa-clipboard-list"></i> See Less</a>';

        //<i class="fas fa-clipboard-list"></i> See Details</a>
    }
}