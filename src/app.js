import { page, render } from './libraries.js';
import {animateRegister} from "./common/register-login.js";
import {homePage, loadingHomeTemplate} from "./views/home.js";
import {registerPage} from './views/register.js';

// animateRegister();

page('/', homePage);
page('/register', registerPage);

page.start();