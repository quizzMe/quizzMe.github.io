import {html, render, topics} from "../../libraries.js";
import {createList} from './list.js';
import {createQuiz, updateQuiz, getQuizById, getQuestionsByQuizId} from '../../api/data.js';

const template = (quiz, quizEditor, updateCount) => html`
 <section id="editor" class="glass common">

    <header class="edit-create-title">
        <h1>${quiz ? 'Edit Quiz' : 'New Quiz'}</h1>
    </header>

    ${quizEditor}


    ${quiz ? html`<header class="quiestions-banner">
        <h2>Questions</h2>
    </header>` : ''}

    ${quiz ? createList(quiz.objectId, quiz.questions, updateCount) : ''}

</section>
`;


const quizEditorTemplate = (quiz, onSave, inProgress) => html`
    <form @submit=${onSave}>
        <label>
            <span>Title:</span>
            <input class="input" type="text" name="title" .value=${quiz ? quiz.title : ''} ?disabled=${inProgress} >
        </label>
        <label>
            <span>Topic:</span>
            <select class="input" name="topic" .value = ${quiz ? quiz.topic : '0'}  ?disabled=${inProgress} >
                <option value="0">-- Select Category</option>
                ${Object.entries(topics).map(([k,v]) => html`<option value=${k} ?selected=${quiz? quiz.topic == k : 0} >${v}</option>`)}
            </select>
        </label>
        <label>
            <span>Description:</span>
            <textarea name="description" .value=${quiz ? quiz.description : ''} ?disabled=${inProgress} ></textarea>
        </label>
        <input class="save-btn choose common" type="submit" value="Save" ?disabled=${inProgress} >
    </form>

        ${inProgress ? html`<div class="loading-overlay working"></div>` : ''}
`;


function createQuizEditor(quiz, onSave){
    const editor = document.createElement('div');
    editor.className = 'setup-new-quiz glass';
    update();
    
    return {editor, updateEditor: update};
    
    function update(inProgress){
        render(quizEditorTemplate(quiz, onSave, inProgress), editor);
    }
}


export async function editorPage(ctx){
    const quizId = ctx.params.id;
    let quiz = null;
    let questions = [];

    if(quizId){
        [quiz, questions] = await Promise.all([
            getQuizById(quizId),
            getQuestionsByQuizId(quizId, sessionStorage.getItem('userId'))
        ]);

        quiz.questions = questions;
    }

    const { editor, updateEditor } = createQuizEditor(quiz, onSave);
    ctx.render(template(quiz, editor, updateCount));

    async function updateCount(change = 0){
        const count = questions.length + change;
        await updateQuiz(quizId, {questionCount: count});
    }

    async function onSave(ev){
        ev.preventDefault();
        const formData = new FormData(ev.target);

        const title = formData.get('title');
        const topic = formData.get('topic');
        const description = formData.get('description');
    
        const data = {
            title,
            topic,
            description,
            questionCount: questions.length
        }

        try{
            updateEditor(true);

            if(quizId){
                await updateQuiz(quizId, data)
            } else {
                const result = await createQuiz(data);
                ctx.page.redirect('/edit/' + result.objectId);
            }
        } catch (err){
            console.error(err);
        } finally {
            updateEditor(false);
        }

    }
}