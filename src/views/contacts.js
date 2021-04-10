import { html } from '../libraries.js';

const contactPageTemplate = () => html `
        <div class="glass" id="about-container">
            <div id="info-div">
                <p>lorem impsum</p>
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