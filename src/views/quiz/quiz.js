import { html } from '../../libraries.js';

const quizTemplate = (quiz) => html`
<section id="quiz">
    <header class="pad-large">
        <h1>Extensible Markup Language: Question 1 / 15</h1>
        <nav class="layout q-control">
            <span class="block">Question index</span>
            <a class="q-index q-current" href="#"></a>
            <a class="q-index q-answered" href="#"></a>
            <a class="q-index q-answered" href="#"></a>
            <a class="q-index q-answered" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
            <a class="q-index" href="#"></a>
        </nav>
    </header>
    <div class="pad-large alt-page">

        <article class="question">
            <p class="q-text">
                This is the first question. Veniam unde beatae est ab quisquam quos officia, eius
                harum accusamus adipisci?
            </p>

            <div>
                <label class="q-answer radio">
                    <input class="input" type="radio" name="question-1" value="0" />
                    <i class="fas fa-check-circle"></i>
                    This is answer 1
                </label>

                <label class="q-answer radio">
                    <input class="input" type="radio" name="question-1" value="0" />
                    <i class="fas fa-check-circle"></i>
                    This is answer 2
                </label>

                <label class="q-answer radio">
                    <input class="input" type="radio" name="question-1" value="0" />
                    <i class="fas fa-check-circle"></i>
                    This is answer 3
                </label>

            </div>

            <nav class="q-control">
                <span class="block">12 questions remaining</span>
                <a class="action" href=#><i class="fas fa-arrow-left"></i> Previous</a>
                <a class="action" href=#><i class="fas fa-sync-alt"></i> Start over</a>
                <div class="right-col">
                    <a class="action" href=#>Next <i class="fas fa-arrow-right"></i></a>
                    <a class="action" href=#>Submit answers</a>
                </div>
            </nav>
        </article>

    </div>
</section>
`;

export async function quizPage(ctx) {
    ctx.render(quizTemplate());
}