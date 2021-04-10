import { page, render } from './libraries.js';
import {homePage, loadingHomeTemplate} from "./views/home.js";
import {registerPage} from './views/register.js';
import {loginPage} from './views/login.js';
import {aboutPage} from './views/about.js';

const main = document.querySelector('main');

page('/', decorateContext, homePage);
page('/register', decorateContext, registerPage);
page('/login', decorateContext, loginPage);
page('/about', decorateContext, aboutPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, main);
    next();
}
