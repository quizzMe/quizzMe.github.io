import {html, styleMap} from "../libraries.js";
import {onArrowClick,previousSlide} from '../common/formAction.js';
import { login } from '../api/data.js';

const loginTemplate = (onArrowClick, onSubmit, formData, ctx) => html`
<div @keypress=${onArrowClick.bind(event, formData)} @click=${onArrowClick.bind(event, formData,)} id="login-container" class="glass">
    <div @click=${previousSlide} id="back-arrow-holder" class="common" style = ${styleMap({display: 'none'})}>
        <i class="fas fa-angle-double-left"></i>
        <span class="use-for-check">Back</span>
    </div>
    
    <form @submit=${onSubmit.bind(event, formData, ctx)} id="login-form">
        <div class="name-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" name="username" required autofocus>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="password-field inactive">
            <i class="fas fa-key"></i>
            <input type="password" placeholder="Password" name="password" required>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="submit-holder inactive">
            <input class="choose common blink" data-micron="fade" data-micron-duration=".8" type="submit"
                value="Login" name='submit'>
        </div>
    </form>
</div>
`;

const formData = {};
export function loginPage(ctx) {
    ctx.render(loginTemplate(onArrowClick, onSubmit, formData, ctx));
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}

async function onSubmit(formData, ctx){
    event.preventDefault();
    await login(formData);
    ctx.setUserNav();
    ctx.page.redirect('/')
}