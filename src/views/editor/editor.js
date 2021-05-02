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

    <svg class="bottom-waves" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 319"><path fill="#e2d2d2" fill-opacity="0.7" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
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
            <span>Time:</span>
            <input class="input" name="time" type="number" placeholder="minutes" .value=${quiz ? quiz.time : ''} >
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

    [...document.getElementById('navigation').querySelectorAll('a')].forEach(btn => {
        if(btn.textContent == 'Create New Quiz'){
            btn.classList.add('clicked')
        } else {
            btn.classList.remove('clicked')
        }
    })


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
        const time = formData.get('time');
        
        if(time <= 0){
            return alert('Set an appropriate value to time. Time cannot be 0 or negative number!')
        }

    
        const data = {
            title,
            topic,
            description,
            questionCount: questions.length,
            time: Number(time)
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