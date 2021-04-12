import { html, render, until, styleMap} from '../libraries.js';
import {onArrowClick,nextSlide, previousSlide} from '../common/formAction.js';

const registerTemplate = (onArrowClick, onSubmit, formData, ctx) => html`
<div @click=${onArrowClick.bind(event, formData)} id="register-container" class="glass">
    <div @click=${previousSlide} id="back-arrow-holder" class="common" style = ${styleMap({display: 'none'})}>
        <i class="fas fa-angle-double-left"></i>
        <span class="use-for-check">Back</span>
    </div>
    
    <form @submit=${onSubmit.bind(event, formData, ctx)} id="register-form">
        <div class="name-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" name="username" required>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="email-field inactive">
            <i class="fas fa-envelope"></i>
            <input type="email" placeholder="Email" name="email" required>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="password-field inactive">
            <i class="fas fa-key"></i>
            <input type="password" placeholder="Password" name="password" required>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="rePass-field inactive">
            <i class="fas fa-key"></i>
            <input type="password" placeholder="Repeat Password" name="rePass" required>
            <i class="fas fa-arrow-down"></i>
        </div>

        <div class="submit-holder inactive">
            <input class="choose common blink" data-micron="fade" data-micron-duration=".8" type="submit"
                value="Register" name='submit'>
        </div>

        <div class="finish-field inactive">
            <p class="common">Successful Registration</p>
            <i class="fas fa-check-circle"></i>
        </div>
    </form>
</div>
`;

const formData = {};
let currentPass = '';
export function registerPage(ctx) {
    ctx.render(registerTemplate(onArrowClick, onSubmit, formData, ctx));
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}

function onSubmit(formData, ctx) {
    event.preventDefault();
    let parent = event.target.parentNode.querySelector('.submit-holder');
    const nextForm = parent.nextElementSibling;
    nextSlide(parent, nextForm, ctx);
    setTimeout(redirectHome, 1500);
    console.log(formData);
    function redirectHome(){
        ctx.setUserNav();
        ctx.page.redirect('/')
    }
}