import { html } from '../../libraries.js';

const resultTemplate = () => html`
<section id="summary">
    <div class="hero layout">
        <article class="details glass">
            <h1>Quiz Results</h1>
            <h2>Extensible Markup Language</h2>

            <div class="summary summary-top">
                85%
            </div>

            <div class="summary">
                12/15 correct answers
            </div>

            <a class="action cta" href="#"><i class="fas fa-sync-alt"></i> Retake Quiz</a>
            <a class="action cta" href="#"><i class="fas fa-clipboard-list"></i> See Details</a>

        </article>
    </div>
`;


export async function resultPage(ctx){
    ctx.render(resultTemplate());
}