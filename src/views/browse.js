import { html, styleMap, until, topics, render } from '../libraries.js';
import {getQuizzes} from '../api/data.js';
import { spinner } from '../common/loaders.js';

const browseTemplate = (choose) => html `
    <div id="browse-container" class="glass">
    <header class="browse-header">
        <h1 class="common">All quizzes</h1>

    <div class="filter-holder">
        <form @change=${choose} class="common">
        <label>
            <span>Filter quizzes by category:</span>
            <select class="input" name="topic" .value = '' >
            <option value="0">-- All</option>
                ${Object.entries(topics).map(([k,v]) => html`<option value=${k}>${v}</option>`)}
            </select>
        </label>
        </form>
    </div>
    </header>

    <div class="questions-browse-holder">

    ${until(loadAllQuizzes(), spinner())}
    
    </div>
    
    </div>
`;


async function loadAllQuizzes(topic){
    const quizzes = await getQuizzes();
    
    if(topic == undefined || topic == 0){
    return html `
    <div id="recent-quizzes" class="common">
        ${[...quizzes].map(quizTemplate)}
    </div>`;
    } else {
        const filtered = quizzes.filter(quiz => quiz.topic == topic);
        
        if(filtered.length > 0){
            return html `
            <div id="recent-quizzes" class="common">
                ${[...filtered].map(quizTemplate)}
            </div>`;
        } else {
            return html`
            <div id="info-div">
                 <div id="list-icon" class="sad-face-icon">
                 <i class="far fa-frown common"></i>
                </div>
                <div id="greating" class="common">
                    <h1>There are no quizzes in this category just yet!</h1>
                    <p>
                        Be the one to create the first!
                    </p>

                    ${sessionStorage.getItem('username') == null ? html`<a href="/register" class="common choose blink" data-micron="fade" data-micron-duration=".8">Sign up to
            create a quiz</a>` : html `<a href="/create" class="common choose blink" data-micron="fade" data-micron-duration=".8">Create Quizz</a>`}

                </div>
            </div>
            `
        }
    }


}

const quizTemplate = (quiz) => html`
<article class="quiz-preview">
    <div class="quiz-description">
        <h3><a class="common" href=${'/details/' + quiz.objectId}>${quiz.title}</a></h3>
        <span class="quiz-topic">Topic: ${quiz.topic}</span>
        <div class="quiz-meta">
            <span>${quiz.questionCount} question${quiz.questionCount == 1 ? '' : 's'}</span>
            <span>|</span>
            <span>Taken ${quiz.taken} ${quiz.taken==1 ? 'time' : 'times'}</span>
            </div>
        </div>

        <div class="view-quiz">
        ${ quiz.owner.objectId == sessionStorage.getItem('userId') ? 
        html`<a class="common choose" href=${'/edit/' + quiz.objectId}>Edit Quiz</a>` 
        : ''}
            <a class="common choose" href=${'/details/' + quiz.objectId}>View Quiz</a>
        </div>
</article>
`;

async function choose(ev){
    const element = document.querySelector('.questions-browse-holder');
    render(spinner(), element)
    render(await loadAllQuizzes(ev.target.value), element)
    
}

export function renderBrowsePage(ctx){
    ctx.render(browseTemplate(choose))
}