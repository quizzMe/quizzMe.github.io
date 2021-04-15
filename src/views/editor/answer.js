import { html, render } from "../../libraries.js";

const template = (answers,  questionIndex, correctIndex) => html`
    ${answers.map((a,i)=>radioEdit(questionIndex, i, a, correctIndex))}
`;

const radioEdit = (questionIndex, index, value, isChecked) => html`
    <div class="editor-input">
            
        <label class="radio">
            <input class="radio-input" type="radio"  name=${`question-${questionIndex}`} value=${index} ?checked=${isChecked} />
            <div class="radio-radio"></div>
        </label>
            
        <input class="input question-input" type="text" name=${`answer-${index}`} .value=${value} />
        <button class="delete-answer"><i class="fas fa-trash-alt"></i></button>
    </div>
`;


export function createAnswerList(answers, questionIndex, correctIndex){
    const element = document.createElement('div');

    render(template(answers, questionIndex, correctIndex), element);

    return element;
}