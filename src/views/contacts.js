import { html } from '../libraries.js';

const contactPageTemplate = () => html `
    <div class="glass" id="contacts-container">
        <div id="contact-div">
            <ul class="social-links">
                <li class="facebook">
                    <a href="#">
                         <i class="fab fa-facebook-square"></i>
                     </a>
                </li>

                <li class="twitter">
                    <a href="#">
                        <i class="fab fa-twitter"></i>
                    </a>
                </li>

                <li class="google">
                    <a href="#">
                        <i class="fab fa-google-plus"></i>
                    </a>
                </li>

                <li class="linkedin">
                    <a href="#">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </li>

                <li class="instagram">
                    <a href="#">
                        <i class="fab fa-instagram"></i>
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