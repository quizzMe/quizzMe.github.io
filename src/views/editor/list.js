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


export function createList(quizId, questions, updateCount){
    const currentQuestions = questions.map(q => createQuestion(quizId, q, removeQuestion, updateCount));
    
    const element = document.createElement('div');
    element.className = 'question-holder';

    update();

    return element;

    function addQuestion(){
        questions.push({
            text: '',
            answers: [],
            correctIndex: 0
        })

        currentQuestions.push(createQuestion(quizId, {
            text: '',
            answers: [],
            correctIndex: 0
        }, removeQuestion, updateCount, true));

        update();
    }

    function update(){
        render(questionList(currentQuestions.map((c, i) => c(i)), addQuestion), element);
    }

    async function removeQuestion(index, id){
        const confirmed = confirm('Are you sure you want to delete this question');

        if(confirmed){
            if(id){
                await deleteQuestion(id);
                updateCount(-1);
            }

            questions.splice(index, 1);
            currentQuestions.splice(index, 1);
            update();
        }
    }
}