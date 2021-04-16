import {html} from "../../libraries.js";
import {createList} from './list.js';

const template = (quiz) => html`
 <section id="editor" class="glass common">

    <header class="edit-create-title">
        <h1>${quiz ? 'Edit Quiz' : 'New Quiz'}</h1>
    </header>

    <div class="setup-new-quiz glass">
    <form>
        <label>
            <span>Title:</span>
            <input class="input" type="text" name="title" .value=${quiz ? quiz.title : ''} >
        </label>
        <label>
            <span>Topic:</span>
            <select class="input" name="topic" .value = ${quiz ? quiz.topic : '0'} >
                <option value="0">-- Select Category</option>
                <option value="it">Languages</option>
                <option value="hardware">Hardware</option>
                <option value="software">Tools and Software</option>
            </select>
        </label>
        <input class="save-btn choose common" type="submit" value="Save">
    </form>
    </div>

    ${quiz ? html`<header class="quiestions-banner">
        <h2>Questions</h2>
    </header>` : ''}

    ${quiz ? createList(quiz.questions) : ''}

</section>
`;


const questions = [{
    text: 'Is this the first question?',
    answers: ['Yes', 'No', 'Maybe'],
    correctIndex: 0
},
{
    text: 'Is this the second question?',
    answers: ['Maybe', 'Yes', 'No'],
    correctIndex: 1
}
]

export function editorPage(ctx){
    const quizId = ctx.params.id;

    const quiz = null;

    ctx.render(template(quiz))
}