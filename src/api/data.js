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

export async function getUserById(id) {
    const response = await api.get(host + '/users/' + id)

    return response.username;
}

// Quiz Collection
export async function getQuizzes() {
    const quizzes = (await api.get(host + '/classes/Quiz')).results;
    const taken = await getSolutionCount(quizzes.map(q => q.objectId));
    quizzes.forEach(q => q.taken = taken[q.objectId]);

    return quizzes;
}

export async function getQuizById(id) {
    return await api.get(host + '/classes/Quiz/' + id + '?include=owner');
}

export async function getMostRecentQuizzes(){
    const quiz = (await api.get(host + '/classes/Quiz?order=-createdAt&limit=3')).results;

    if(quiz.length > 0){
        const taken = await getSolutionCount(quiz.map(q => q.objectId));
        quiz.forEach(q => q.taken = taken[q.objectId]);
    }
    return quiz;
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
export async function getQuestionsByQuizId(quizId, ownerId){
    const query = JSON.stringify({
        quiz: createPointer('Quiz', quizId),
        owner: createPointer('_User', ownerId)
    });
    const response = await api.get(host + '/classes/Question?where=' + encodeURIComponent(query));
    return response.results;
}


export async function createQuestion(quizId, question){
    const body = addOwner(question);
    body.quiz = createPointer('Quiz', quizId);
    return await api.post(host + '/classes/Question', body);
}

export async function updateQuestion(id, question){
    return await api.put(host + '/classes/Question/' + id, question);
}

export async function deleteQuestion(id){
    return await api.del(host + '/classes/Question/' + id);
}

//Solution requests//

export async function getSolutionsByUserId(userId){
    const query = JSON.stringify({ owner : createPointer('_User', userId)});
    const response = await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query))

    return response.results;
}

export async function getSolutionsByQuizId(quizId){
    const query = JSON.stringify({ owner : createPointer('Quiz', quizId)});
    const response = await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query))

    return response.results;
}

export async function submitSolution(quizId, solution){
    const body = addOwner(solution);
    body.quiz = createPointer('Quiz', quizId);

    return await api.post(host + '/classes/Solution', body);
}

export async function getSolutionCount(quizIds) {
    const query = JSON.stringify({ $or: quizIds.map(id => ({ quiz: createPointer('Quiz', id) })) });
    const solutions = (await api.get(host + '/classes/Solution?where=' + encodeURIComponent(query))).results;
    const result = solutions.reduce((a, c) => {
        const id = c.quiz.objectId;
        if (!a[id]) { a[id] = 0; }
        a[id]++;
        return a;
    }, {});

    return result;
}