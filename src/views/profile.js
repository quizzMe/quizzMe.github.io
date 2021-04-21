import { html } from '../libraries.js';
import { getQuizzes, getUserById } from '../api/data.js';

const profileTemplate = (userId, quizzes, visitorIsOwner, userProfile) => html`
    <div id="profile-page" class="glass common">

        ${visitorIsOwner ? 
        html`<h1>Hello, ${sessionStorage.getItem('username')}</h1>` 
        : '' }

        <h2>${visitorIsOwner ? 'You have' : `${userProfile} has`} ${quizzes.length} quiz${quizzes.length > 1 ? 'zes' : ''}:</h2>
        
    </div>
`;

export async function profilePage(ctx){
    const userId = ctx.params.id;
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);
    const userProfile = await getUserById(userId);

    ctx.render(profileTemplate(userId, userQuizzes, userId == sessionStorage.getItem('userId'), userProfile));
}