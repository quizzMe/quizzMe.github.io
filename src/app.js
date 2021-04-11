import { page, render } from './libraries.js';
import {homePage, loadingHomeTemplate} from "./views/home.js";
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {aboutPage} from './views/about.js';
import {contactPage} from './views/contacts.js';

const main = document.querySelector('main');
setUserNav();

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/about', decorateContext, aboutPage);
page('/contacts', decorateContext, contactPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    next();
}

function setUserNav(){
    const user = sessionStorage.getItem('user')

    if(user){
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}
