import { html } from '../libraries.js';

const aboutPageTemplate = () => html `
        <div class="glass" id="about-container">
            <div id="info-div" class="common about-info">
                <p>QuizzMe is a SPA (Single Page Application) made as a school project by web developer ${html`<a href="https://github.com/doychinivanov" target="_blank">Doychin Ivanov</a>`} as a way to practice and master his skills currently gained at ${html`<a href="https://softuni.bg/" target="_blank">SoftUni</a>`}.
                    The project aims to practice consepts like Asynchronous Programming, using a remote server (BaaS), CRUD operations, User Authentication, Client Side Rendering (Templating Concepts), Routing, Component Approach and others. More about the project can be found at QuizzMe's ${html`<a href="https://github.com/quizzMe" target="_blank">github page</a>`}. 
                </p>
            </div>

         </div>
`;

export function aboutPage(ctx){
    ctx.render(aboutPageTemplate(ctx));
    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}