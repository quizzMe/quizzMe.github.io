import { html } from '../../libraries.js';

const quizTemplate = (quiz) => html`
<section id="quiz" class="glass common">
    <header id="quiz-navigation" class="edit-create-title">
        <h1>Extensible Markup Language</h1>
        <h2>Question 1 / 15</h2>
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
            <div class="editor-input">
                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    <div class="radio-radio"></div>
                </label>
                <span>This is answer 1</span>

            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    <div class="radio-radio"></div>
                </label>
                <span>This is answer 2</span>
            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="radio-input" type="radio" name="question-1" value="0" />
                    <div class="radio-radio"></div>
                </label>
                <span>This is answer 3</span>
            </div>

            <nav class="q-control">
                <span class="block question-progress">12 questions remaining</span>
                <a class="add-answer-btn common choose" href=#><i class="fas fa-arrow-left"></i> Previous</a>
                <a class="add-answer-btn common choose" href=#><i class="fas fa-sync-alt"></i> Start over</a>
                <div class="right-col">
                    <a class="add-answer-btn common choose" href=#>Next <i class="fas fa-arrow-right"></i></a>
                    <a class="add-answer-btn common choose" href=#>Submit answers</a>
                </div>
            </nav>
        </article>

    </div>
</section>
`;

export async function quizPage(ctx) {
    ctx.render(quizTemplate());
}