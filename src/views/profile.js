import { html, until, render } from '../libraries.js';
import { getQuizzes, getUserById, getSolutionsByUserId } from '../api/data.js';
import { spinner } from '../common/loaders.js';


const profileTemplate = (userId, quizzes, visitorIsOwner, userProfile, showMyQuizzes) => html`
    <div id="profile-page" class="glass common">

        <div class="content-preview">
             ${visitorIsOwner ? 
                html`<h1>${sessionStorage.getItem('username')}</h1>` 
                : '' }

                <h2>${visitorIsOwner ? 'Your' : `${userProfile}'s`} best score:</h2>
                <article class="quiz-preview profile-view">
                    <h2>History of the Byzantine Empire</h2>

                    <div class="summary-top">
                        100%
                    </div>

                    <div class="summary-bottom view-quiz">
                         3/3 correct answers
                    </div>

                    <div class="btn-holderr">
                        <a class="add-answer-btn common choose" href='#'> <i class="fas fa-info"></i> View Quiz</a>
                    </div>
                </article>

            <h2>${visitorIsOwner ? 'You have' : `${userProfile} has`} ${quizzes.length == 1 ? 'only': ''} ${quizzes.length} quiz${quizzes.length == 1 ? '' : 'zes'}:</h2>
        
            <div @click=${(showMyQuizzes.bind(event, userId))} class="btn-holderr">
                <a class="add-answer-btn common choose" href='javascript:void(0)'> <i class="fas fa-info"></i> Show Own Quizzes</a>
            </div>

             <div class="own-quizzes-holder">

                <!-- until(loadOwnerQuizzes(userId), spinner()) -->
             </div>
        </div>
    </div>
`;

async function loadOwnerQuizzes(userId){
    render(spinner(), document.querySelector('.own-quizzes-holder'))
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);

    return userQuizzes.map(quizzTemplates);
}

const quizzTemplates = (quiz) => html`
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
        ${ quiz.owner.objectId == sessionStorage.getItem('userId') ? 
        html`<a class="common choose" href=${'/edit/' + quiz.objectId}>Edit Quiz</a>` 
        : ''}
            <a class="common choose" href=${'/details/' + quiz.objectId}>View Quiz</a>
        </div>
</article>
`;

async function showMyQuizzes(userId, event){
    const element = document.querySelector('.own-quizzes-holder');
    const quizzes = await loadOwnerQuizzes(userId);

   event.target.innerHTML = event.target.innerHTML == ' <i class="fas fa-info"></i> Show Own Quizzes' ?
   ' <i class="fas fa-info"></i> Hide Own Quizzes' :
   ' <i class="fas fa-info"></i> Show Own Quizzes'

   event.target.innerHTML == ' <i class="fas fa-info"></i> Show Own Quizzes' ? 
   render('', element) :
   render(quizzes, element)
    
}

export async function profilePage(ctx){
    const userId = ctx.params.id;
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);
    const userProfile = await getUserById(userId);
    const solutions = await getSolutionsByUserId(userId);
    const filteredSolutions = solutions.sort((a,b) => (b.correct / b. total * 100) - (a.correct / a. total * 100));
    console.log(solutions);

    ctx.render(profileTemplate(userId, userQuizzes, userId == sessionStorage.getItem('userId'), userProfile, showMyQuizzes));

    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}