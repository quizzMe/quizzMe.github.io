import {html} from "../../libraries.js";
import { createQuestion } from "./question.js";

const template = (questions) => html`
 <section id="editor" class="glass common">

    <header class="edit-create-title">
        <h1>New quiz</h1>
    </header>

    <div class="setup-new-quiz glass">
    <form>
        <label>
            <span>Title:</span>
            <input class="input" type="text" name="title"></label>
        <label>
            <span>Topic:</span>
            <select class="input" name="topic">
                <option value="all">All Categories</option>
                <option value="it">Languages</option>
                <option value="hardware">Hardware</option>
                <option value="software">Tools and Software</option>
            </select>
        </label>
        <input class="save-btn choose common" type="submit" value="Save">
    </form>
    </div>

    <header class="quiestions-banner">
        <h2>Questions</h2>
    </header>

    ${questionList(questions)}

</section>
`;


const questionList = (questions) => html`
<div class="question-holder">

    ${questions.map((q, i) => createQuestion(q, i+1, false))}

    <div class="editor-input">
        <button class="add-question-btn common choose blink" data-micron="fade" data-micron-duration=".8">
            <i class="fas fa-plus-circle"></i>
            Add question
        </button>
    </div>
   

</div>
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
    ctx.render(template(questions));
}