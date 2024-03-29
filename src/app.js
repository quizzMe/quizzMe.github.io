import { page, render } from './libraries.js';
import { homePage } from "./views/home.js";
import { registerPage } from './views/register.js';
import { loginPage } from './views/login.js';
import { aboutPage } from './views/about.js';
import { contactPage } from './views/contacts.js';
import { renderBrowsePage } from './views/browse.js';
import { editorPage } from './views/editor/editor.js';
import { quizPage} from './views/quiz/quiz.js';
import { resultPage } from './views/quiz/results.js';
import { detailsPage } from './views/details.js';
import { profilePage } from './views/profile.js';
import { spinner } from './common/loaders.js';

import { getQuestionsByQuizId, getQuizById, logout as apiLogout } from './api/data.js';

const state = {};
const main = document.querySelector('main');
setUserNav();
[...document.querySelectorAll('.logoutBtn')].forEach(btn => btn.addEventListener('click', logoutUser));
const hamburger = document.querySelector('.hamburger');
const navLinks = [...document.querySelectorAll('.nav-links')];
const links = [...document.querySelectorAll('.nav-links li')];

hamburger.addEventListener('click', ()=>{
    const user = sessionStorage.getItem('userId');
    if(user){
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'none');

    } else {
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'block');
    }


    navLinks.forEach(ul => ul.classList.toggle('open'));
    navLinks.forEach(ul => ul.classList.toggle('glass'));
    links.forEach(l => l.classList.toggle('fade'));
})

navLinks.forEach(ul=> {
    ul.addEventListener('click', (ev)=>{
        if(ev.target.tagName == 'A' || ev.target.tagName == 'LI'){
            ul.classList.remove('open');
            links.forEach(l => l.classList.remove('fade'))
        }
    })
})

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/about', decorateContext, aboutPage);
page('/contacts', decorateContext, contactPage);
page('/browse', decorateContext, renderBrowsePage);
page('/create', decorateContext, editorPage);
page('/edit/:id', decorateContext, editorPage);
page('/details/:id', decorateContext, getQuiz, detailsPage);
page('/summary/:id',decorateContext, getQuiz, resultPage);
page('/profile/:id', decorateContext, profilePage);
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
    const user = sessionStorage.getItem('userId');
    if (user) {
        // Sets elements according to user
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'block');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'none');

        if(screen.width < 550){
            [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
            [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'none');
        }


        // sets href to profile button
        const profileBtn = [...document.getElementById('navigation').querySelectorAll('a')].filter(l => l.textContent == 'Profile')[0];
        const profileBtnMobile = [...document.getElementById('mobile-navigation').querySelectorAll('a')].filter(l => l.textContent == 'Profile')[0];
        profileBtn.setAttribute('href', '/profile/' + user);
        profileBtnMobile.setAttribute('href', '/profile/' + user);

        // sets welcome message
        document.getElementById('welcome-user').style.display = 'block';
        document.getElementById('welcome-user').querySelector('span').textContent = `Welcome, ${sessionStorage.getItem('username')}`
        document.getElementById('welcome-user').querySelector('a').setAttribute('href', '/profile/' + user);

        document.getElementById('header-nav').style.width = '94%'
    } else {
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'block');

        document.getElementById('header-nav').style.width = '100%'
    }
}


async function logoutUser() {
    await apiLogout();
    setUserNav();
    if(screen.width < 550){
        [...document.querySelectorAll('.user')].forEach(a => a.style.display = 'none');
        [...document.querySelectorAll('.guest')].forEach(a => a.style.display = 'none');
    }
    page.redirect('/');
}
