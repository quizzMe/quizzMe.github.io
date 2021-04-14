import * as api from './api.js';

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application spesific requests
function createPointer(name, id) {
    return {
        __type: 'Pointer',
        className: name,
        objectId: id
    }
}

function addOwner(object){
    const userId = sessionStorage.getItem('userId');
    const result = Object.assign({}, object);
    result.owner = createPointer('_User', userId);
    return result
}

// Quiz Collection
export async function getQuizzes() {
    return await api.get(host + '/classes/Quiz');
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/Quiz/' + id + '?include=owner');
}

export async function updateQuiz(id, quiz) {
    return await api.put(host + '/classes/Quiz/' + id, quiz);
}

export async function deleteQuiz(id) {
    return await api.del(host + '/classes/Quiz/' + id);
}

export async function createQuiz(quiz) {
    const body = addOwner(quiz);

    return await api.post(host + '/classes/Quiz', body);
}


//Question Collection
export async function getQuestionsByQuizId(quizId){
    const query = JSON.stringify(createPointer('Quiz', quizId));
    return await api.get(host + '/classes/Question?where=' + encodeURIComponent(query));
}


export async function createQuestion(quizId, question){
    const body = addOwner(question);
    question.quiz = createPointer('Quiz', quizId);
    return await api.post(host + '/classes/Question', body)
}

export async function updateQuestion(id, question){
    return await api.put(host + '/classes/Question/' + id, question);
}

export async function deleteQuestion(id){
    return await api.del(host + '/classes/Question/' + id);
}