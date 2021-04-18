import {html, render} from "../../libraries.js";
import { createQuestion } from "./question.js";

import { deleteQuestion } from '../../api/data.js';

const questionList = (questions, addQuestion) => html`
    ${questions}

    <div class="editor-input">
        <button @click=${addQuestion} class="add-question-btn common choose blink" data-micron="fade" data-micron-duration=".8">
            <i class="fas fa-plus-circle"></i>
            Add question
        </button>
    </div>
`;


export function createList(quizId, questions){
    const currentQuestions = questions.map(q => createQuestion(quizId, q, removeQuestion));
    
    const element = document.createElement('div');
    element.className = 'question-holder';

    update();

    return element;

    function addQuestion(){
        currentQuestions.push(createQuestion(quizId, {
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion, true));

        update();
    }

    function update(){
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }

    async function removeQuestion(index, id){
        const confirmed = confirm('Are you sure you want to delete this question');

        if(confirmed){
   
            console.log(id);
            if(id){
                await deleteQuestion(id);
            }

            currentQuestions.splice(index, 1);
            update();
        }
    }
}