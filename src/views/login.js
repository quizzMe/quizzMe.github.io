import {html} from "../libraries.js";
import {onArrowClick,nextSlide} from '../common/formAction.js';

const loginTemplate = (onArrowClick, onSubmit, formData, ctx) => html`
<div @click=${onArrowClick.bind(event, formData,)} id="login-container" class="glass">
    <div id="back-arrow-holder" class="common">
        <i class="fas fa-angle-double-left"></i>
        <span>Back</span>
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
}

function onSubmit(formData, ctx){
    event.preventDefault();
    ctx.page.redirect('/')
}