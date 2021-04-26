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
</section>
`;

export async function detailsPage (ctx){
    let taken = await getSolutionCount(ctx.quiz.objectId.split());
    taken = Object.values(taken)[0]
    ctx.render(detailsTemplate(ctx.quiz, taken));

    // clears the clicked effect on all buttons
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => btn.classList.remove('clicked'))
}