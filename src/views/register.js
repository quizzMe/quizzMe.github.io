import { html, render, until } from '../libraries.js';
import {animateRegister} from '../common/register-login.js'

const registerTemplate = () => html`
 <div id="register-container" class="glass">
                <form id="register-form">
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
                        <input class="choose common blink" data-micron="fade" data-micron-duration=".8" type="submit" value="Register" name='submit'>
                    </div>

                    <div class="finish-field inactive">
                        <p class="common">Successful Registration</p>
                        <i class="fas fa-check-circle"></i>
                    </div>
                </form>
            </div>
`;

export function registerPage(){
    render(registerTemplate(), document.querySelector('main'))
}