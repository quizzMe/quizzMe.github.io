import { html, render } from "../../libraries.js";
import { createAnswerList } from "./answer.js";

const editorTemplate = (data, index, onSave, onCancel) => html`
<div class="question-head">
    <h3>Qestion ${index}</h3>
    <div class="question-control">
        <button @click=${onSave} class="save-btn choose common"><i class="fas fa-check-double"></i>
            Save</button>
        <button @click=${onCancel} class="save-btn choose common"><i class="fas fa-times"></i> Cancel</button>
    </div>
</div>
<form>
    <textarea class="input" name="text" placeholder="Enter question" .value=${data.text}></textarea>
    
    ${createAnswerList(data.answers, index, data.correctIndex)}

</form>
`;



const viewTemplate = (data, index, onEdit, onDelete) => html`
        <div class="question-head">
            <h3>Question ${index}</h3>
            <div class="question-control">
                <button @click=${onEdit} class="save-btn choose common"><i class="fas fa-edit"></i> Edit</button>
                <button @click=${onDelete} class="save-btn choose common"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        </div>
        <div>
            <p class="editor-input">${data.text}</p>
            
            ${data.answers.map((a,i)=>radioView(a, data.correctIndex==i))}

        </div>
`;


const radioView = (value, isChecked) => html`
 <div class="editor-input">
        
        <label class="radio">
            <input class="radio-input" type="radio" disabled ?checked=${isChecked} />
            <div class="radio-radio"></div>
        </label>

        <span>${value}</span>
    </div>
`;



export function createQuestion(question, index) {
    const element = document.createElement('article');
    element.className = 'editor-question glass';

    showView();

    return element;


    function onEdit(){
       showEditor();
    }

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this quesiton?');

        if(confirmed){
            element.remove();
        }
    }

    async function onSave(){
        const formData = new FormData(element.querySelector('form'));

        const data = [...formData.entries()].reduce((a,[k,v])=> Object.assign(a, {[k]:v}),{});
        console.log(data);
    }

    function onCancel(){
        showView();
    }

    function showView(){
        render(viewTemplate(question, index, onEdit, onDelete), element);
    }

    function showEditor(){
        render(editorTemplate(question, index, onSave, onCancel), element);
    }
}