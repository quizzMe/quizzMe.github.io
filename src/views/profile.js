import { html } from '../libraries.js';

const profileTemplate = () => html`
    <h1> This is profile</h1>
`;

export async function profilePage(ctx){
    ctx.render(profileTemplate());
}