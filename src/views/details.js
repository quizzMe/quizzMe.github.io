import { html } from '../libraries.js';

const detailsTemplate = () => html`
<section id="details" class="glass common">
    <div class="question-template">
        <article class="details">
            <h1>Extensible Markup Language</h1>
            <span class="quiz-topic">A quiz by <a href="#" class="blink" data-micron="fade" data-micron-duration=".8" >Peter</a> on the topic of Languages</span>
            <div class="quiz-meta">
                <span>15 Questions</span>
                <span>|</span>
                <span>Taken ? times</span>
            </div>
            <p class="quiz-desc">Test your knowledge of XML by completing this medium-difficulty quiz.
                Lorem ipsum dolor
                sit amet consectetur adipisicing elit. Aliquam recusandae corporis voluptatum quibusdam
                maxime similique reprehenderit rem, officia vero at.</p>

            <div class="start-quiz-holder">
                <a class="add-answer-btn common choose" href="#">Begin Quiz</a>
            </div>

        </article>
    </div>
</section>
`;

export async function detailsPage (ctx){
    ctx.render(detailsTemplate());
}