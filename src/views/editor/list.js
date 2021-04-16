import {html, render} from "../../libraries.js";
import { createQuestion } from "./question.js";

const questionList = (questions, addQuestion) => html`
    ${questions}

    <div class="editor-input">
        <button @click=${addQuestion} class="add-question-btn common choose blink" data-micron="fade" data-micron-duration=".8">
            <i class="fas fa-plus-circle"></i>
            Add question
        </button>
    </div>
`;


export function createList(questions){
    const currentQuestions = questions.map(q => createQuestion(q, removeQuestion));
    
    const element = document.createElement('div');
    element.className = 'question-holder';

    update();

    return element;

    function addQuestion(){
        currentQuestions.push(createQuestion({
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion));

        update();
    }

    function update(){
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }

    function removeQuestion(index){
        const confirmed = confirm('Are you sure you want to delete this question');

        if(confirmed){
            currentQuestions.splice(index, 1);
            update();
        }
    }
}