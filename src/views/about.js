import { html } from '../libraries.js';

const aboutPageTemplate = () => html `
        <div class="glass" id="about-container">
            <div id="info-div" class="common about-info">
                <p>QuizzMe is a SPA (Single Page Application) made as a school project by web developer ${html`<a href="https://github.com/doychinivanov" target="_blank">Doychin Ivanov</a>`} as a way to practice and master his skills currently gained at ${html`<a href="https://softuni.bg/" target="_blank">SoftUni</a>`}.
                    The project aims to practice consepts like Asynchronous Programming, using a remote server (BaaS), CRUD operations, User Authentication, Client Side Rendering (Templating Concepts), Routing, Component Approach and others. More about the project can be found at QuizzMe's ${html`<a href="https://github.com/quizzMe" target="_blank">github page</a>`}. 
                </p>
            </div>
            <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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