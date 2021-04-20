import { html, until, styleMap, classMap } from '../../libraries.js';
import { spinner } from '../../common/loaders.js';

const quizTemplate = (quiz, questions, answers, currentIndex, onSelect) => html`
<section id="quiz" class="glass common">
    <header id="quiz-navigation" class="edit-create-title">
        <h1>${quiz.title}</h1>
        <h2>Question ${currentIndex + 1} / ${questions.length}</h2>
        <nav class="quiestions-banner">
            <span class="block">Question index</span>
            ${questions.map((q, i) => indexTemplate(quiz.objectId, i, currentIndex == i, answers[i] != undefined))}
        </nav>
    </header>
    <div class="question-template">

        <article class="question">
            <p class="q-text">
                ${questions[currentIndex].text}
            </p>

            <form @change=${onSelect}>

                ${questions.map((q,i) => questionTemplate(q, i, i==currentIndex, false))}

            </form>

            <nav class="q-control">
                <span class="block question-progress">${answers.filter(x => x == undefined).length} questions remaining</span>
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

const indexTemplate = (quizId, i, isCurrent, isAnswered) => {
    const className = {
        'q-index': true,
        'q-current': isCurrent,
        'q-answered' : isAnswered
    }

    return html`<a class=${classMap(className)}
    href="/quiz/${quizId}?question=${i +1}"></a>`
};

const questionTemplate = (question, index, isCurrent) => html`
<div data-index='question-${index}' class="option-holder" style=${styleMap({display: isCurrent ? '' : 'none'})} >

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
    const index = Number(ctx.querystring.split('=')[1] || 1) - 1;
    const questions = ctx.quiz.questions;
    const answers = ctx.quiz.answers;
    update();

    function onSelect(event){
        const questionIndex = Number(event.target.name.split('-')[1]);
        
        if(Number.isNaN(questionIndex) != true){
            const answer = Number(event.target.value);
            answers[questionIndex] = answer;
            update();
        }
    }

    function update(){
        ctx.render(quizTemplate(ctx.quiz, questions, answers, index, onSelect));
    }

}