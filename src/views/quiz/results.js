import { html, styleMap } from '../../libraries.js';

const resultTemplate = (quiz, result, correctAnswers, showResults) => html`
<section id="summary" class="glass common">
    <article class="details">
        <h1>Quiz Results</h1>
        <h2>${quiz.title}</h2>
        <h2>A quiz by <a class="blink" data-micron="fade" data-micron-duration="2"
                href=${`/profile/${quiz.owner.objectId}`}>${quiz.owner.username} </a> </h2> 
                
                <div class="summary-top">
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

    <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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
        ev.target.innerHTML = resultHolder.style.display == 'none' ? '<i class="fas fa-clipboard-list"></i>See Details' : '<i class="fas fa-clipboard-list"></i> See Less';

        //<i class="fas fa-clipboard-list"></i> See Details</a>
    }
}