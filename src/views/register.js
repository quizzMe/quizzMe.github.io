import { html, render, until } from '../libraries.js';
import {onArrowClick,nextSlide} from '../common/formAction.js';

const registerTemplate = (onArrowClick, onSubmit, formData, ctx) => html`
<div @click=${onArrowClick.bind(event, formData)} id="register-container" class="glass">
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
}

function onSubmit(formData, ctx) {
    event.preventDefault();
    let parent = event.target.parentNode.querySelector('.submit-holder');
    const nextForm = parent.nextElementSibling;
    nextSlide(parent, nextForm, ctx);
    setTimeout(redirectHome, 1500);

    function redirectHome(){
        ctx.page.redirect('/')
    }
}