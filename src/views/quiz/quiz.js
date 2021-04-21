import { html, until, styleMap, classMap } from '../../libraries.js';
import { submitSolution } from '../../api/data.js';
import { spinner } from '../../common/loaders.js';

const quizTemplate = (quiz, questions, answers, currentIndex, onSelect, resetQuiz, onSubmit) => html`
<section id="quiz" class="glass common">
    ${sessionStorage.getItem('userId') != null ? 
    html `<header id="quiz-navigation" class="edit-create-title">
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

            <form id='quiz-form' @change=${onSelect}>

                ${questions.map((q,i) => questionTemplate(q, i, i==currentIndex, false))}

            </form>

            <nav class="q-control">
                <span class="block question-progress">${answers.filter(x => x == undefined).length} questions remaining</span>
                ${currentIndex > 0 ?
                    html`<a class="add-answer-btn common choose" href="/quiz/${quiz.objectId}?question=${currentIndex}" ><i class="fas fa-arrow-left"></i> Previous</a>` 
                    : ''
                }
                <a @click=${resetQuiz} class="add-answer-btn common choose" href="javascript:void(0)"><i class="fas fa-sync-alt"></i> Start over</a>
                <div class="right-col">
                   ${currentIndex < questions.length - 1 ? 
                   html` <a class="add-answer-btn common choose" href="/quiz/${quiz.objectId}?question=${currentIndex + 2}" >Next <i class="fas fa-arrow-right"></i></a>` 
                : ''}
                    

                    ${(answers.filter(x => x == undefined).length == 0 || currentIndex == questions.length - 1) ?
                        html`<a @click=${onSubmit} class="add-answer-btn common choose" href="javascript:void(0)" >Submit answers</a>`
                        : ''
                    }
                </div>
            </nav>
        </article>

    </div>`

    : html `
    <div id="info-div">
        <div id="list-icon" class="sad-face-icon">
        <i class="far fa-frown"></i>
        </div>
        <div id="greating" class="common">
            <h1>Bad Request!</h1>
            <p>
            In order to take quizzes you must be registered.
            </p>
            <p>
            It takes just a second!
            </p>
            <a href="/register" class="common choose blink" data-micron="fade" data-micron-duration=".8">Sign up here!</a>
        </div>
    </div>` }
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

    function resetQuiz(){
        const confirmed = confirm('Are you sure you want to reset your answers?');

        if(confirmed){
            ctx.clearCache(ctx.quiz.objectId);
            ctx.page.redirect('/quiz/' + ctx.quiz.objectId)
        }
    }

    async function onSubmit(){
        const unaswered = answers.filter(x => x == undefined).length;
        if(unaswered > 0){
            const confirmed = confirm(`There are ${unaswered} unanswered questions. Are you sure you want to proceed forward?`)
        
            if(confirmed == false){
                return;
            }
        }

        let correct = 0;
        for(let i = 0; i < questions.length; i++){
            if(questions[i].correctIndex == answers[i]){
                correct++;
            };
        }

        const solution = {
            correct,
            total: questions.length
        };

        ctx.render(spinner())
        await submitSolution(ctx.quiz.objectId, solution);
        ctx.page.redirect('/result/' + ctx.quiz.objectId);
    }


    function update(){
        ctx.render(quizTemplate(ctx.quiz, questions, answers, index, onSelect, resetQuiz, onSubmit));
    }

}