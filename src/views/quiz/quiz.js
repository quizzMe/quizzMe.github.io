import { html, until } from '../../libraries.js';
import { getQuizById, getQuestionsByQuizId } from '../../api/data.js';
import { spinner } from '../../common/loaders.js';

const quizTemplate = (quiz, questions, currentIndex) => html`
<section id="quiz" class="glass common">
    <header id="quiz-navigation" class="edit-create-title">
        <h1>${quiz.title}</h1>
        <h2>Question ${currentIndex + 1} / ${questions.length}</h2>
        <nav class="quiestions-banner">
            <span class="block">Question index</span>
            ${questions.map((q, i) => html`<a class="q-index q-current q-answered"
                href="/quiz/${quiz.objectId}?question=${i}"></a>`)}
        </nav>
    </header>
    <div class="question-template">

        <article class="question">
            <p class="q-text">
                ${questions[currentIndex].text}
            </p>

            <form>

                ${questions.map((q,i) => questionTemplate(q, i, i==currentIndex))}

            </form>

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


const questionTemplate = (question, index, isCurrent) => html`
<div data-index='question-${index}' class="option-holder" style=${isCurrent ? '' : 'display:none' } >

    ${question.answers.map((a, i) => answerTemplate(index, i, a))}

</div>
`;


const answerTemplate = (questionIndex, index, value) => html`
    <div class="editor-input">
        <label class="radio">
            <input class="radio-input" type="radio" name="question-${questionIndex}" value=${index} />
            <div class="radio-radio"></div>
        </label>
        <span>${value}</span>
    </div>
`;

export async function quizPage(ctx) {
    const quizId = ctx.params.id;
    ctx.render(until(getQuiz(quizId), spinner()));
}

async function getQuiz(quizId) {
    const quiz = await getQuizById(quizId);
    const ownerId = quiz.owner.objectId;
    const questions = await getQuestionsByQuizId(quizId, ownerId);

    return quizTemplate(quiz, questions, 0);
}