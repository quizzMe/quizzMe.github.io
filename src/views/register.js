import { html, render, until } from '../libraries.js';
// import {animateRegister} from '../common/register-login.js'

const registerTemplate = (onArrowClick, onSubmit, formData, currentPass) => html`
<div @click=${onArrowClick.bind(event, formData, currentPass)} id="register-container" class="glass">
    <form @submit=${onSubmit.bind(event, formData)} id="register-form">
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
    ctx.render(registerTemplate(onArrowClick, onSubmit, formData, currentPass));
}


function onArrowClick() {
    if (event.target.classList.contains('fa-arrow-down')) {
        const input = event.target.previousElementSibling;
        const parent = event.target.parentNode;
        const nextForm = parent.nextElementSibling;

        //Check for validation
        if (input.name === 'username' && validateUser(input)) {
            formData['username'] = input.value;
            nextSlide(parent, nextForm);
        } else if (input.name === 'email' && validateEmail(input)) {
            formData['email'] = input.value;
            nextSlide(parent, nextForm);
        } else if (input.name === 'password' && validateUser(input)) {
            formData['password'] = input.value;
            currentPass = input.value
            nextSlide(parent, nextForm);
        } else if ((input.name === 'rePass') && (input.value == currentPass)) {
            nextSlide(parent, nextForm);
        } else {
            parent.style.animation = "shake 0.5s ease"
        }

        parent.addEventListener('animationend', () => {
            parent.style.animation = '';
        })
    }
}

function onSubmit() {
    event.preventDefault();
    let parent = event.target.parentNode.querySelector('.submit-holder');
    const nextForm = parent.nextElementSibling;
    nextSlide(parent, nextForm);
}

function validateUser(user) {
    if (user.value.length < 5) {
        errorBackground(true);
    } else {
        errorBackground(false);
        return true;
    }
}

function validateEmail(email) {
    //add regexp
    if (email.value.length < 6) {
        errorBackground(true);
    } else {
        errorBackground(false);
        return true;
    }
}

function errorBackground(mistake) {
    const container = document.getElementById('register-container');
    mistake ? container.style.backgroundImage = 'linear-gradient(97deg, rgba(218,111,111,0.989233193277311) 21%, rgba(172,75,75,1) 48%, rgba(170,93,93,1) 72%)' : container.style.backgroundImage = 'linear-gradient(90deg, rgba(33,29,99,1) 0%, rgba(68,37,190,1) 38%, rgba(131,24,187,1) 100%)'
}

function nextSlide(parent, nextForm) {
    parent.classList.add('inactive');
    parent.classList.remove('active');

    nextForm.classList.add('active');
}