import { page, render } from './libraries.js';
import {homePage, loadingHomeTemplate} from "./views/home.js";
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {aboutPage} from './views/about.js';
import {contactPage} from './views/contacts.js';
import {renderBrowsePage} from './views/browse.js';
import {editorPage} from './views/editor/editor.js';

import * as api from './api/data.js';
window.api = api;

const main = document.querySelector('main');
setUserNav();
document.getElementById('logoutBtn').addEventListener('click', logoutUser.bind(event, api));

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/about', decorateContext, aboutPage);
page('/contacts', decorateContext, contactPage);
page('/browse', decorateContext, renderBrowsePage);
page('/create', decorateContext, editorPage);
page('/edit/:id', decorateContext, editorPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    ctx.setUserNav = setUserNav;
    next();
}

function setUserNav(){
    const user = sessionStorage.getItem('username');

    if(user){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}

//update!!
async function logoutUser(api) {
    await api.logout();
    setUserNav();
    page.redirect('/');
}
