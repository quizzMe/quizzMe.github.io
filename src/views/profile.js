import { html, until, render, classMap } from '../libraries.js';
import { getQuizzes, getUserById, getSolutionsByUserId, getQuizById } from '../api/data.js';
import { spinner } from '../common/loaders.js';


const profileTemplate = (userId, quizzes, visitorIsOwner, userProfile, showMyQuizzes, loadScores, showAllScores) => html`
    <div id="profile-page" class="glass common">

        <div class="content-preview">
             ${visitorIsOwner ? 
                html`<h1 class="score-nav">${sessionStorage.getItem('username')}</h1>` 
                : '' }

                <h2 class="score-nav">${visitorIsOwner ? 'Your' : `${userProfile}'s`} best score:</h2>

                <div class="best-score-holder">
                    ${until(loadScores(userId, false), spinner())}
                </div>

                <div @click=${showAllScores.bind(event, userId)} class="btn-holderr">
                <a class="add-answer-btn common choose" href='javascript:void(0)'> <i class="fas fa-info"></i> Show All Scores</a>
            </div>

            <h2>${visitorIsOwner ? 'You have' : `${userProfile} has`} ${quizzes.length == 1 ? 'only': ''} ${quizzes.length} quiz${quizzes.length == 1 ? '' : 'zes'}:</h2>
        
            <div @click=${(showMyQuizzes.bind(event, userId))} class="btn-holderr">
                <a class="add-answer-btn common choose" href='javascript:void(0)'> <i class="fas fa-info"></i> Show Owner Quizzes</a>
            </div>

             <div class="own-quizzes-holder">

                
             </div>
        </div>
        <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
`;

async function loadOwnerQuizzes(userId){
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);

    return userQuizzes.map(quizzTemplates);
}

async function loadScores(userId, isOn){
    const solutions = await getSolutionsByUserId(userId);
    
    if(solutions.length == 0) {

        return html`
        <div id="info-div">
             <div id="list-icon" class="sad-face-icon">
             <i class="fas fa-bomb"></i>
            </div>
            <div id="greating" class="common">
                <h1>No solutions yet!</h1>
                <p>
                    Take a quiz first!
                </p>
                <a href="/browse" class="common choose blink" data-micron="fade" data-micron-duration=".8">Check Quizzes</a>
            </div>
        </div>
        `
    }

    let filteredSolutions = solutions.sort((a,b) => (b.correct / b. total * 100) - (a.correct / a. total * 100));

    await filteredSolutions.reduce(async (a, c) => {
        const details = await getQuizById(c.quiz.objectId);
        c.quiz = details;
        const result = await a;
        result.push(details.title)

        return result;

    }, [])

    const best = [];
    best.push(filteredSolutions[0]);
    return isOn ? await filteredSolutions.map((s, i) => bestScores(s, i)) : await best.map(bestScores);
}

const quizzTemplates = (quiz) => html`
<article class="quiz-preview">
    <div class="quiz-description">
        <h3><a class="common" href=${'/details/' + quiz.objectId}>${quiz.title}</a></h3>
        <span class="quiz-topic">Topic: ${quiz.topic}</span>
        <div class="quiz-meta">
            <span>${quiz.questionCount} question${quiz.questionCount == 1 ? '' : 's'}</span>
            <span>|</span>
            <span>Taken ? times</span>
            </div>
        </div>

        <div class="view-quiz">
        ${ quiz.owner.objectId == sessionStorage.getItem('userId') ? 
        html`<a class="common choose" href=${'/edit/' + quiz.objectId}>Edit Quiz</a>` 
        : ''}
            <a class="common choose" href=${'/details/' + quiz.objectId}>View Quiz</a>
        </div>
</article>
`;

const bestScores = (solution, index) => html`
<article class=${classMap(index == 0 ? {'quiz-preview': true, 'all-scores':true, 'profile-view' : true} : {'quiz-preview': true, 'all-scores':true, 'profile-view' : false})}>
    <h2>${solution.quiz.title}</h2>

    <div class="summary-top">
         ${(solution.correct / solution.total * 100).toFixed(0)}%
    </div>

    <div class="summary-bottom view-quiz">
        ${solution.correct}/${solution.total} correct answers
    </div>

    <div class="btn-holderr">
        <a class="add-answer-btn common choose" href=${`/details/${solution.quiz.objectId}`}> <i class="fas fa-info"></i> View Quiz</a>
    </div>
</article>
`;

async function showMyQuizzes(userId, event){
    const element = document.querySelector('.own-quizzes-holder');
    const quizzes = await loadOwnerQuizzes(userId);

    
   event.target.innerHTML = event.target.innerHTML == ' <i class="fas fa-info"></i> Show Owner Quizzes' ?
   ' <i class="fas fa-info"></i> Hide Owner Quizzes' :
   ' <i class="fas fa-info"></i> Show Owner Quizzes'

   event.target.innerHTML == ' <i class="fas fa-info"></i> Show Owner Quizzes' ? 
   render('', element) :
   render(quizzes, element)
    
}

async function showAllScores(userId, event){
    const element = document.querySelector('.best-score-holder');
    render(spinner(), document.querySelector('.best-score-holder'))

    event.target.innerHTML = event.target.innerHTML == ' <i class="fas fa-info"></i> Show All Scores' ? 
    ' <i class="fas fa-info"></i> Hide All Scores' :
    ' <i class="fas fa-info"></i> Show All Scores'

    event.target.innerHTML == ' <i class="fas fa-info"></i> Show All Scores' ? 
    render(await loadScores(userId, false), element) :
    render(await loadScores(userId, true), element)
}

export async function profilePage(ctx){
    const userId = ctx.params.id;
    const allQuizzes = await getQuizzes();
    const userQuizzes = allQuizzes.filter(x => x.owner.objectId == userId);
    const userProfile = await getUserById(userId);


    ctx.render(profileTemplate(userId, userQuizzes, userId == sessionStorage.getItem('userId'), userProfile, showMyQuizzes, loadScores, showAllScores));

    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(ctx.pathname.includes(btn.textContent.toLowerCase())){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })
}