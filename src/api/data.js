import * as api from './api.js';

const host = 'https://parseapi.back4app.com';
api.settings.host = host;

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

//Implement application spesific requests
export async function createQuiz(quiz){
    return await api.post(host + '/classes/Quiz', quiz)
}