import { html, styleMap } from '../libraries.js';

export const loadingHomeTemplate = () => html`
    <div id="load-container">
        <h1 class="common" id="welcome-header">Welcome</h1>
         <p class="common" id="wait-msg">We shall start any minute now</p>
            
        <div id="spinner-container">
            <div class="lds-roller">
               <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
            
        <p class="common" id="loading">Loading ...</p>
    </div>
`;


const homeTemplate = () => html `
<div class="glass" id="home-container">
    <div id="info-div">
        <div id="greating" class="common">
            <h1>Welcome to QuizzMe!</h1>
            <p>
            QuizzMe is a free web application, where you can choose quizzes from variaty of categories.
            You can compete with your friends and create your own quizzes as well. Start now!
            </p>
            <a href="/register" class="common choose blink" data-micron="fade" data-micron-duration=".8">Sign up to
            create a quiz</a>
        </div>
        <div id="list-icon">
             <i class="fas fa-clipboard-list common"></i>
        </div>
    </div>

    <div id="more" style=${styleMap({display: 'none'})}>
        <div id="recent-quizzes" class="common">
            <h2 class="common">Most recent quizzes:</h2>
             <article class="quiz-preview">
                <div class="quiz-description">
                 <h3><a class="common" href="javascript.void(0)">History of the Roman Empire</a></h3>
                    <span class="quiz-topic">Topic: History</span>
                    <div class="quiz-meta">
                       <span>17 questions</span>
                       <span>|</span>
                      <span>Taken 4 times</span>
                     </div>
                </div>

                <div class="view-quiz">
                     <a class="common choose" href="javascript.void(0)">View Quiz</a>
                </div>
            </article>

            <article class="quiz-preview">
                <div class="quiz-description">
                 <h3><a class="common" href="javascript.void(0)">Quantum Physics</a></h3>
                    <span class="quiz-topic">Topic: Science</span>
                    <div class="quiz-meta">
                       <span>15 questions</span>
                       <span>|</span>
                      <span>Taken 2 times</span>
                     </div>
                </div>

                <div class="view-quiz">
                     <a class="common choose" href="javascript.void(0)">View Quiz</a>
                </div>
            </article>

            <article class="quiz-preview">
                <div class="quiz-description">
                 <h3><a class="common" href="javascript.void(0)">Capitals of Europe</a></h3>
                    <span class="quiz-topic">Topic: Geography</span>
                    <div class="quiz-meta">
                       <span>21 questions</span>
                       <span>|</span>
                      <span>Taken 10 times</span>
                     </div>
                </div>

                <div class="view-quiz">
                     <a class="common choose" href="javascript.void(0)">View Quiz</a>
                </div>
            </article>

            <div class="veiw-all-quizzes">
                <a class="common choose" href="/browse">See All Quizzes</a>
            </div>
        </div>
    </div>
</div>
<div @click=${onShowMore} id="show-more">
    <span class="common">
        Show More
        <p>
            <i class="fas fa-angle-double-down"></i>
        </p>
    </span>
</div>
`;

export function homePage(ctx){
    ctx.render(loadingHomeTemplate());
    setTimeout(renderHome, 2000);

    function renderHome(){
        ctx.render(homeTemplate());
        [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => btn.classList.remove('clicked')); 
        
        const user = sessionStorage.getItem('user');

        if(user){
            document.getElementById('more').style.display = 'block'
            document.getElementById('show-more').style.display = 'none';
            document.getElementById('info-div').style.display = 'none';
            document.getElementById('recent-quizzes').style.borderTop = 'none';
        }
        
    }
}

function onShowMore(ev){
    if(ev.target.classList.contains('common') || ev.target.classList.contains('fa-angle-double-down') || ev.target.tagName == 'P'){
        document.getElementById('more').style.display = 'block'
        let showMoreContainer = ev.target.parentNode;
        
        while(showMoreContainer.id != 'show-more'){
            showMoreContainer = showMoreContainer.parentNode;
        }

        showMoreContainer.style.display = 'none';
    }
}