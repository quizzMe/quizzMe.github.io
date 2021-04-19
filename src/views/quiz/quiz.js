import { html } from '../../libraries.js';

const quizTemplate = (quiz) => html`
<section id="quiz" class="glass common">
    <header id="quiz-navigation" class="edit-create-title">
        <h1>Extensible Markup Language: Question 1 / 15</h1>
        <nav class="quiestions-banner">
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
    <div class="question-template">

        <article class="question">
            <p class="q-text">
                This is the first question. Veniam unde beatae est ab quisquam quos officia, eius
                harum accusamus adipisci?
            </p>

            <div class="option-holder">
                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    This is answer 1
                    <div class="radio-radio"></div>
                </label>

                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    This is answer 2
                    <div class="radio-radio"></div>
                </label>

                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    This is answer 3
                    <div class="radio-radio"></div>
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