import { html, styleMap } from '../libraries.js';


const browseTemplate = () => html `
    <div id="browse-container" class="glass">
    <header>
        <h1 class="common">All quizzes</h1>
    </header>


    <div id="recent-quizzes" class="common">
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

            <article class="quiz-preview">
                <div class="quiz-description">
                 <h3><a class="common" href="javascript.void(0)">Middle Ages</a></h3>
                    <span class="quiz-topic">Topic: History</span>
                    <div class="quiz-meta">
                       <span>10 questions</span>
                       <span>|</span>
                      <span>Taken 3 times</span>
                     </div>
                </div>

                <div class="view-quiz">
                     <a class="common choose" href="javascript.void(0)">View Quiz</a>
                </div>
            </article>

            <article class="quiz-preview">
                <div class="quiz-description">
                 <h3><a class="common" href="javascript.void(0)">Space</a></h3>
                    <span class="quiz-topic">Topic: Science</span>
                    <div class="quiz-meta">
                       <span>13 questions</span>
                       <span>|</span>
                      <span>Taken 6 times</span>
                     </div>
                </div>

                <div class="view-quiz">
                     <a class="common choose" href="javascript.void(0)">View Quiz</a>
                </div>
            </article>
        </div>
    </div>

    </div>
`;

export function renderBrowsePage(ctx){
    ctx.render(browseTemplate())
}