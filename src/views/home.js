import { html, render, until } from '../libraries.js';

export const loadingHomeTemplate = () => html`
    <div id="load-container">
        <h1 class="common" id="welcome-header">Welcome</h1>
         <p class="common" id="wait-msg">We shall start any minute now</p>
            
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
            
        <p class="common" id="loading">Loading ...</p>
    </div>
`;


const homeTemplate = () => html `
                <header id="header-nav">
                    <div data-text="QuizzMe" id="logo" class="common">
                        <a class="common" href="/"><span><i class="far fa-question-circle"></i> QuizzMe <i
                                    class="far fa-question-circle"></i></span></a>
                    </div>

                    <nav id="navigation">
                        <!-- <div class="user">
                            <ul>
                                <li><a href="#" class="common choose" data-micron="fade"
                                        data-micron-duration=".8">Hello, Doychin</a></li>
                                <li><a href="#" class="common choose" data-micron="fade"
                                        data-micron-duration=".8">Profile</a></li>
                                <li><a href="#" class="common choose" data-micron="fade"
                                        data-micron-duration=".8">Create New Quiz</a></li>
                                <li><a href="javascript.void(0)" class="common choose" data-micron="fade"
                                        data-micron-duration=".8">Logout</a></li>
                            </ul>
                        </div> -->

                        <div class="guest">
                            <ul>
                                <li><a href="/login" class="common choose"data-micron="fade" data-micron-duration=".8">Login</a></li>
                                <li><a href="/register" class="common choose" data-micron="fade" data-micron-duration=".8">Register</a></li>
                                <li><a href="/about" class="common choose" data-micron="fade" data-micron-duration=".8">About</a></li>
                                <li><a href="#" class="common choose" data-micron="fade" data-micron-duration=".8">Contacts</a></li>
                            </ul>
                        </div>
                    </nav>
                </header>

<div class="glass" id="home-container">
                <div id="info-div">
                    <div id="greating" class="common">
                        <h1>Welcome to QuizzMe!</h1>
                        <p>
                            QuizzMe is a free web application, where you can choose quizzes from variaty of categories.
                            You can compete with your friends and create your own quizzes as well. Start now!
                        </p>
                        <a href="/register" class="common choose blink" data-micron="fade" data-micron-duration=".8">Sign up to
                            create a quiz</a>
                    </div>
                    <div id="list-icon">
                        <i class="fas fa-clipboard-list common"></i>
                    </div>
                </div>

            </div>

            <div id="show-more">
                <a href="#" class="common">
                    Show More
                    <p>
                        <i class="fas fa-angle-double-down"></i>
                    </p>
                </a>
            </div>
`;

export function homePage(ctx){
    ctx.render(loadingHomeTemplate());
    setTimeout(renderHome, 2000);

    function renderHome(){
        ctx.render(homeTemplate())
    }
}