import { html } from '../libraries.js';

export const overlay = () => html`
<div class="loading-overlay working"></div>
`;

export function createOverlay() {
    const element = document.createElement('div');
    element.className = 'loading-overlay working';

    return element;
}

export const spinner = () => html`
        <div id="spinner-container">
            <div class="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
`;