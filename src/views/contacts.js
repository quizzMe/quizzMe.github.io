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
        <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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