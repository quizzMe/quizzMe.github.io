import { html, until } from '../libraries.js';
import { getQuizzes, getUserById } from '../api/data.js';
import { spinner } from '../common/loaders.js';


const profileTemplate = (userId, quizzes, visitorIsOwner, userProfile) => html`
    <div id="profile-page" class="glass common">

        <div class="content-preview">
             ${visitorIsOwner ? 
                html`<h1>Hello, ${sessionStorage.getItem('username')}</h1>` 
                : '' }

            <h2>${visitorIsOwner ? 'You have' : `${userProfile} has`} ${quizzes.length} quiz${quizzes.length == 1 ? '' : 'zes'}:</h2>
        
             ${until(loadOwnerQuizzes(userId), spinner())}
        </div>
    </div>
`;

async function loadOwnerQuizzes(userId){
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

export async function profilePage(ctx){
    const userId = ctx.params.id;
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);
    const userProfile = await getUserById(userId);

    ctx.render(profileTemplate(userId, userQuizzes, userId == sessionStorage.getItem('userId'), userProfile));
}