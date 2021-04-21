import { page, render } from './libraries.js';
import { homePage } from "./views/home.js";
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { aboutPage } from './views/about.js';
import { contactPage } from './views/contacts.js';
import { renderBrowsePage } from './views/browse.js';
import { editorPage } from './views/editor/editor.js';
import { quizPage } from './views/quiz/quiz.js';
import { detailsPage } from './views/details.js';
import { spinner } from './common/loaders.js';

import { getQuestionsByQuizId, getQuizById, logout as apiLogout } from './api/data.js';

const state = {};
const main = document.querySelector('main');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', logoutUser);

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/about', decorateContext, aboutPage);
page('/contacts', decorateContext, contactPage);
page('/browse', decorateContext, renderBrowsePage);
page('/create', decorateContext, editorPage);
page('/edit/:id', decorateContext, editorPage);
page('/details/:id', decorateContext, detailsPage);
page('/quiz/:id', decorateContext, getQuiz, quizPage)

page.start();

// Middleware //
async function getQuiz(ctx, next) {
    ctx.clearCache = clearCache;
    const quizId = ctx.params.id;
    if (state[quizId] == undefined) {
        ctx.render(spinner());
        state[quizId] = await getQuizById(quizId);
        const ownerId = state[quizId].owner.objectId;
        state[quizId].questions = await getQuestionsByQuizId(quizId, ownerId)
        state[quizId].answers = state[quizId].questions.map(q => undefined);
    }

    ctx.quiz = state[quizId];
    next();
}

function clearCache(quizId) {
    if (state[quizId]) {
        delete state[quizId];
    }
}


function decorateContext(ctx, next) {
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav() {
    const user = sessionStorage.getItem('username');

    if (user) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}


async function logoutUser() {
    await apiLogout();
    setUserNav();
    page.redirect('/');
}
