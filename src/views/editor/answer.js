import { html, render } from "../../libraries.js";

const radioEdit = (questionIndex, index, value, isChecked, onDelete) => html`
   <div class="editor-input">
    
    <label class="radio">
       <input type="radio" class="radio-input" name=${`question-${questionIndex}`} value=${index}
           ?checked=${isChecked} />
       <div class="radio-radio"></div> 
   </label> 
   
   <input class="input question-input" type="text" name=${`answer-${index}`} .value=${value} />
   <button @click=${onDelete} data-index=${index} class="delete-answer"><i class="fas fa-trash-alt"></i></button>
</div>
`;


export function createAnswerList(answers, questionIndex, correctIndex) {
    const current = answers.slice();
    const fragment = document.createDocumentFragment();

    update();

    return fragment;


    function update() {
        render(html`
        ${current.map((a, i) => radioEdit(questionIndex, i, a, correctIndex == i, onDelete))}
        <div class="editor-input">
            <button @click=${addAnswer} class="add-answer-btn common choose">
                <i class="fas fa-plus-circle"></i>
                Add answer
            </button>
        </div>`, fragment);
    }

    function addAnswer(ev) {
        ev.preventDefault();
        current.push('');
        update();
    }

    function onDelete(ev){
        ev.preventDefault();
        let target = ev.target;
        if(target.tagName == 'I'){
            target = target.parentNode;
        }
        
        const index = target.dataset.index;
        current.splice(index, 1);
        update();
    }
}