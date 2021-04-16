import { html, render } from "../../libraries.js";

const radioEdit = (questionIndex, index, value, isChecked, onDelete, onChange) => html`
<div @change=${onChange} class="editor-input">

    <label class="radio">
        <input type="radio" class="radio-input" name=${`question-${questionIndex}`} value=${index}
            ?checked=${isChecked} />
        <div class="radio-radio"></div>
    </label>

    <input class="input question-input" type="text" name=${`answer-${index}`} .value=${value} />
    <button @click=${onDelete} data-index=${index} class="delete-answer"><i class="fas fa-trash-alt"></i></button>
</div>
`;


export function createAnswerList(data, questionIndex) {
    const answers = data.answers;
    const fragment = document.createDocumentFragment();

    update();

    return fragment;


    function update() {
        render(html`
        ${answers.map((a, i) => radioEdit(questionIndex, i, a, data.correctIndex == i, onDelete, onChange))}
        <div class="editor-input">
            <button @click=${addAnswer} class="add-answer-btn common choose">
                <i class="fas fa-plus-circle"></i>
                Add answer
            </button>
        </div>`, fragment);
    }

    function onChange(ev) {
        if (ev.target.getAttribute('type') == 'text') {
            const index = Number(ev.target.name.split('-')[1]);
            answers[index] = ev.target.value || '';
        } else {
            data.correctIndex = Number(ev.target.value);
        }
    }

    function addAnswer(ev) {
        ev.preventDefault();
        answers.push('');
        update();
    }

    function onDelete(ev) {
        ev.preventDefault();
        let target = ev.target;
        if (target.tagName == 'I') {
            target = target.parentNode;
        }

        const index = target.dataset.index;
        answers.splice(index, 1);
        update();
    }
}