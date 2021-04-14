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
    object.owner = createPointer('_User', userId);
}


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
    addOwner(quiz);

    return await api.post(host + '/classes/Quiz', quiz);
}