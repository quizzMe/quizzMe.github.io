import { html } from '../libraries.js';
import {getSolutionCount} from '../api/data.js';

const detailsTemplate = (quiz, taken) => html`
<section id="details" class="glass common">
    <div class="question-template">
        <article class="details">
            <h1> ${quiz.title} </h1>
            <span class="quiz-topic">A quiz by <a href=${'/profile/' + quiz.owner.objectId} class="blink" data-micron="fade" data-micron-duration="2" > ${quiz.owner.username} </a> on the topic of ${quiz.topic} </span>
            <div class="quiz-meta">
                <span> ${quiz.questions.length} Questions</span>
                <span>|</span>
                <span>Taken ${taken} ${taken==1 ? 'time' : 'times'}</span>
            </div>
            <p class="quiz-desc"> ${quiz.description} </p>

            <div class="start-quiz-holder">
                <a class="add-answer-btn common choose" href= ${'/quiz/' + quiz.objectId} >Begin Quiz</a>
            </div>

        </article>
    </div>
    <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
</section>
`;

export async function detailsPage (ctx){
    let taken = await getSolutionCount(ctx.quiz.objectId.split());
    taken = Object.values(taken)[0]
    ctx.render(detailsTemplate(ctx.quiz, taken));

    // clears the clicked effect on all buttons
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => btn.classList.remove('clicked'))
}