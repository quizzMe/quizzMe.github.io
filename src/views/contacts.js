import { html } from '../libraries.js';

const contactPageTemplate = () => html `
     <header id="header-nav">
                    <div data-text="QuizzMe" id="logo" class="common">
                        <a class="common" href="/"><span><i class="far fa-question-circle"></i> QuizzMe <i
                                    class="far fa-question-circle"></i></span></a>
                    </div>

                    <nav id="navigation">
                        <div class="guest">
                            <ul>
                                <li><a href="/login" class="common choose"data-micron="fade" data-micron-duration=".8">Login</a></li>
                                <li><a href="/register" class="common choose" data-micron="fade" data-micron-duration=".8">Register</a></li>
                                <li><a href="/about" class="common choose" data-micron="fade" data-micron-duration=".8">About</a></li>
                                <li><a href="/contacts" class="common choose" data-micron="fade" data-micron-duration=".8">Contacts</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>

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