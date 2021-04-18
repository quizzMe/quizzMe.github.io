import { html, styleMap, until } from '../libraries.js';
import {getQuizzes} from '../api/data.js';
import { spinner } from '../common/loaders.js';

const browseTemplate = () => html `
    <div id="browse-container" class="glass">
    <header>
        <h1 class="common">All quizzes</h1>
    </header>

    ${until(loadAllQuizzes(), spinner())}

    </div>
`;


async function loadAllQuizzes(){
    const quizzes = await getQuizzes();

    return html `
    <div id="recent-quizzes" class="common">
        ${[...quizzes].map(quizTemplate)}
    </div>`;
}

const quizTemplate = (quiz) => html`
<article class="quiz-preview">
    <div class="quiz-description">
        <h3><a class="common" href=${'/details/' + quiz.objectId}>${quiz.title}</a></h3>
        <span class="quiz-topic">Topic: ${quiz.topic}</span>
        <div class="quiz-meta">
            <span>${quiz.questionCount} question${quiz.questionCount == 1 ? '' : 's'}</span>
            <span>|</span>
            <span>Taken ? times</span>
            </div>
        </div>

        <div class="view-quiz">
            <a class="common choose" href=${'/details/' + quiz.objectId}>View Quiz</a>
        </div>
</article>
`;

export function renderBrowsePage(ctx){
    ctx.render(browseTemplate())
}