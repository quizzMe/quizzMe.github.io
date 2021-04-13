import {html} from "../../libraries.js";

const template = () => html`
 <section id="editor" class="glass common">

<header class="edit-create-title">
    <h1>New quiz</h1>
</header>

<div class="setup-new-quiz glass">
    <form>
        <label>
            <span>Title:</span>
            <input class="input" type="text" name="title"></label>
        <label>
            <span>Topic:</span>
            <select class="input" name="topic">
                <option value="all">All Categories</option>
                <option value="it">Languages</option>
                <option value="hardware">Hardware</option>
                <option value="software">Tools and Software</option>
            </select>
        </label>
        <input class="save-btn choose common" type="submit" value="Save">
    </form>
</div>

<header class="quiestions-banner">
    <h2>Questions</h2>
</header>

<div class="question-holder">

    <article class="editor-question glass">
        <div class="question-head">
            <h3>Question 1</h3>
            <div class="question-control">
                <button class="save-btn choose common" ><i class="fas fa-check-double"></i>
                    Save</button>
                <button class="save-btn choose common" ><i class="fas fa-times"></i> Cancel</button>
            </div>
        </div>
        <form>
            <textarea class="inputd" name="text"
                placeholder="Enter question"></textarea>
            <div class="editor-input">

                <label class="radio">
                    <input type="radio" name="question-1" value="0" />
                </label>

                <input class=" input question-input" type="text" name="answer-0" />
                <button class="delete-answer"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input type="radio" name="question-1" value="1" />
                </label>

                <input class="input question-input" type="text" name="answer-1" />
                <button class="delete-answer"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input type="radio" name="question-1" value="2" />
                </label>

                <input class="input question-input" type="text" name="answer-2" />
                <button class="delete-answer"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">
                <button class="add-answer-btn common choose">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>
        </form>
    </article>

    <!-- <article class="editor-question"> 
        <div class="layout">
            <div class="question-control">
                <button disabled class="input submit action"><i class="fas fa-check-double"></i>
                    Save</button>
                <button disabled class="input submit action"><i class="fas fa-times"></i>
                    Cancel</button>
            </div>
            <h3>Question 1</h3>
        </div>
        <form>
            <textarea disabled class="input editor-input editor-text" name="text"
                placeholder="Enter question"></textarea>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="0" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-0" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="1" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-1" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">

                <label class="radio">
                    <input disabled class="input" type="radio" name="question-1" value="2" />
                    <i class="fas fa-check-circle"></i>
                </label>

                <input disabled class="input" type="text" name="answer-2" />
                <button disabled class="input submit action"><i class="fas fa-trash-alt"></i></button>
            </div>
            <div class="editor-input">
                <button disabled class="input submit action">
                    <i class="fas fa-plus-circle"></i>
                    Add answer
                </button>
            </div>
        </form>
        <div class="loading-overlay working"></div>
    </article> -->

    <!-- <article class="editor-question">
        <div class="layout">
            <div class="question-control">
                <button class="input submit action"><i class="fas fa-edit"></i> Edit</button>
                <button class="input submit action"><i class="fas fa-trash-alt"></i> Delete</button>
            </div>
            <h3>Question 2</h3>
        </div>
        <form>
            <p class="editor-input">This is the second question.</p>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="0" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 0</span>
            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="1" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 1</span>
            </div>
            <div class="editor-input">
                <label class="radio">
                    <input class="input" type="radio" name="question-2" value="2" disabled />
                    <i class="fas fa-check-circle"></i>
                </label>
                <span>Answer 2</span>
            </div>
        </form>
    </article>  -->

    <!-- <article class="editor-question">
        <div class="editor-input">
            <button class="input submit action">
                <i class="fas fa-plus-circle"></i>
                Add question
            </button>
        </div>
    </article> -->

</div>

</section>
`;

export function editorPage(ctx){
    ctx.render(template())
}