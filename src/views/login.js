import {html, styleMap} from "../libraries.js";
import {onArrowClick,previousSlide} from '../common/formAction.js';

const loginTemplate = (onArrowClick, onSubmit, formData, ctx) => html`
<div @click=${onArrowClick.bind(event, formData,)} id="login-container" class="glass">
<div @click=${previousSlide} id="back-arrow-holder" class="common" style = ${styleMap({display: 'none'})}>
        <i class="fas fa-angle-double-left"></i>
        <span class="use-for-check">Back</span>
    </div>
    
    <form @submit=${onSubmit.bind(event, formData, ctx)} id="login-form">
        <div class="name-field">
            <i class="fas fa-user"></i>
            <input type="text" placeholder="Username" name="username" required>
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

function onSubmit(formData, ctx){
    event.preventDefault();
    console.log(formData);
    ctx.page.redirect('/')
}