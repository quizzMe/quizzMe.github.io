import { html, render } from "../../libraries.js";

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
    <textarea class="inputd" name="text" placeholder="Enter question" .value=${data.text}></textarea>
    
    ${data.answers.map((a,i)=>radioEdit(index, i, a, data.correctIndex==i))}

    <div class="editor-input">
        <button class="add-answer-btn common choose">
            <i class="fas fa-plus-circle"></i>
            Add answer
        </button>
    </div>
</form>
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




const viewTemplate = (data, index, onEdit, onDelete) => html`
        <div class="question-head">
            <h3>Question ${index}</h3>
            <div class="question-control">
                <button @click=${onEdit} class="save-btn choose common"><i class="fas fa-edit"></i> Edit</button>
                <button @click=${onDelete} class="save-btn choose common"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
        </div>
        <form>
            <p class="editor-input">${data.text}</p>
            
            ${data.answers.map((a,i)=>radioView(a, data.correctIndex==i))}

        </form>
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



export function createQuestion(question, index, edit) {
    const element = document.createElement('article');
    element.className = 'editor-question glass';

    if (edit) {
        render(editorTemplate(question, index, onSave, onCancel), element);
    } else {
        render(viewTemplate(question, index, onEdit, onDelete), element);
    }

    return element;


    function onEdit(){
        render(editorTemplate(question, index, onSave, onCancel), element);
    }

    async function onDelete(){
        const confirmed = confirm('Are you sure you want to delete this quesiton?');

        if(confirmed){
            element.remove();
        }
    }

    async function onSave(){

    }

    function onCancel(){
        render(viewTemplate(question, index, onEdit, onDelete), element);
    }
}