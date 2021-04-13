import { html } from '../libraries.js';

const contactPageTemplate = () => html `
    <div class="glass" id="contacts-container">
        <div id="contact-div">
            <ul class="social-links">
                <li class="github">
                    <a href="https://github.com/doychinivanov" target="_blank">
                        <i class="fab fa-github"></i>
                    </a>
                </li>

                <li class="mail">
                    <a href="mailto:doychinivn@gmail.com">
                        <i class="fas fa-envelope"></i>
                    </a>
                </li>

                <li class="linkedin">
                    <a href="#">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </li>

                <li class="instagram">
                    <a href="https://www.instagram.com/doichinf/" target="_blank">
                        <i class="fab fa-instagram"></i>
                    </a>
                </li>

                <li class="facebook">
                    <a href="https://www.facebook.com/doichi.ivanov" target="_blank">
                         <i class="fab fa-facebook-square"></i>
                     </a>
                </li>
            </ul>
        </div>

    </div>
`;

export function contactPage(ctx){
    ctx.render(contactPageTemplate(ctx));
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}