import { html, render } from "../../libraries.js";

const radioEdit = (questionIndex, index, value, isChecked) => html`
    <div class="editor-input">
    
        <label class="radio">
            <input class="radio-input" type="radio" name=${`question-${questionIndex}`} value=${index}
                ?checked=${isChecked} />
            <div class="radio-radio"></div>
        </label>
    
        <input class="input question-input" type="text" name=${`answer-${index}`} .value=${value} />
        <button data-index=${index} class="delete-answer"><i class="fas fa-trash-alt"></i></button>
    </div>
`;


export function createAnswerList(answers, questionIndex, correctIndex) {
    const current = answers.slice();
    const element = document.createElement('div');
    element.addEventListener('click', onDelete);

    update();

    return element;


    function update() {
        render(html`
        ${current.map((a, i) => radioEdit(questionIndex, i, a, correctIndex == i))}
        <div class="editor-input">
            <button @click=${addAnswer} class="add-answer-btn common choose">
                <i class="fas fa-plus-circle"></i>
                Add answer
            </button>
        </div>`, element);
    }

    function addAnswer(ev) {
        ev.preventDefault();
        current.push('');
        update();
    }

    function onDelete(ev){
        ev.preventDefault();
        let target = ev.target;
        while(target && target != element && target.tagName != 'BUTTON'){
            target = target.parentNode;
        }
        
        const index = target.dataset.index;
        if(index != undefined){
            console.log(index);
            current.splice(index, 1);
            console.log(current);
            update();
        }
    }
}