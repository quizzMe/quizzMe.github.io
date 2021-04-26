import { html, until, styleMap } from '../libraries.js';
import { spinner } from '../common/loaders.js';
import { getMostRecentQuizzes } from '../api/data.js';


const homeTemplate = (userId) => html `
<div class="glass" id="home-container">
    <div id="info-div" style=${styleMap(userId ? {display: 'none'}: {display: 'flex'})}>
        <div id="greating" class="common">
            <h1>Welcome to QuizzMe!</h1>
            <p>
            QuizzMe is a free web application, where you can choose quizzes from variaty of categories.
            You can compete with your friends and create your own quizzes as well. Start now!
            </p>
            <a href="/register" class="common choose blink" data-micron="fade" data-micron-duration=".8">Sign up to
            create a quiz</a>
        </div>
        <div id="list-icon">
             <i class="fas fa-clipboard-list common"></i>
        </div>
    </div>

    <div id="more" style=${styleMap(userId ? {display: 'block'}: {display: 'none'})}>


    ${until(loadRecent(userId), spinner())}

    </div>

    
</div>
<div @click=${onShowMore} id="show-more" style=${styleMap(userId ? {display: 'none'}: {display: 'block'})}>
    <span class="common">
        Show More
        <p>
            <i class="fas fa-angle-double-down"></i>
        </p>
    </span>
</div>
`;


async function loadRecent (userId){
    const quiz = await getMostRecentQuizzes();

    return quiz.length > 0 ? html `
        <div id="recent-quizzes" class="common" style=${styleMap( userId ? {border: 'none'} : {'border-top': '1px solid rgba(255, 255, 255, 0.5)'})}>
            <h2 class="common">Most recent quizzes:</h2>

            ${quiz.map(quizRecentTemplate)}

            <div class="veiw-all-quizzes">
                <a class="common choose" href="/browse">See All Quizzes</a>
            </div>
        </div>
    ` : html`
    <div id="recent-quizzes" class="common" style=${styleMap( userId ? {border: 'none'} : {'border-top': '1px solid rgba(255, 255, 255, 0.5)'})}>
            <h2 class="common">There are no quizzes yet</h2>

    </div>
    `
}

const quizRecentTemplate = (quiz) => html`
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

export function homePage(ctx){
    const userId = sessionStorage.getItem('userId')
    ctx.render(homeTemplate(userId));
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => btn.classList.remove('clicked')); 
        
     const user = sessionStorage.getItem('user');

    if(user){
        document.getElementById('more').style.display = 'block'
        document.getElementById('show-more').style.display = 'none';
        document.getElementById('info-div').style.display = 'none';
        document.getElementById('recent-quizzes').style.borderTop = 'none';
    }
}

function onShowMore(ev){
    if(ev.target.classList.contains('common') || ev.target.classList.contains('fa-angle-double-down') || ev.target.tagName == 'P'){
        document.getElementById('more').style.display = 'block'
        let showMoreContainer = ev.target.parentNode;
        
        while(showMoreContainer.id != 'show-more'){
            showMoreContainer = showMoreContainer.parentNode;
        }

        showMoreContainer.style.display = 'none';
    }
}