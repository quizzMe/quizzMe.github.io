export function animateRegister() {
    const arrows = document.querySelectorAll('.fa-arrow-down');
    let currentPass = '';
    const formData = {};


    arrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            const input = arrow.previousElementSibling;
            const parent = arrow.parentNode;
            const nextForm = parent.nextElementSibling;


            //Check for validation
            if (input.name === 'username' && validateUser(input)) {
                formData['username'] = input.value;
                nextSlide(parent, nextForm);
            } else if (input.name === 'email' && validateEmail(input)){
                formData['email'] = input.value;
                nextSlide(parent, nextForm);
            } else if (input.name === 'password' && validateUser(input)){
                formData['password'] = input.value;
                currentPass = input.value
                nextSlide(parent, nextForm);
            } else if((input.name === 'rePass') && (input.value == currentPass)){
                nextSlide(parent, nextForm);
            } else {
                parent.style.animation = "shake 0.5s ease"
            }

            parent.addEventListener('animationend', ()=>{
                parent.style.animation = '';
            })
        })

    })

    document.querySelector('#register-form').addEventListener('submit', (ev)=>{
        ev.preventDefault();
        let parent = ev.target.parentNode.querySelector('.submit-holder');
        const nextForm = parent.nextElementSibling;     
        nextSlide(parent, nextForm);
    })
}

function validateUser(user) {
    if (user.value.length < 5) {
        errorBackground(true);
    } else {
        errorBackground(false);
        return true;
    }
}

function validateEmail(email){
    //add regexp
    if(email.value.length < 6){
        errorBackground(true);
    } else {
        errorBackground(false);
        return true;
    }
}

function errorBackground(mistake) {
    const container = document.getElementById('register-container');
    mistake ? container.style.backgroundImage = 'linear-gradient(97deg, rgba(218,111,111,0.989233193277311) 21%, rgba(172,75,75,1) 48%, rgba(170,93,93,1) 72%)' : container.style.backgroundImage = 'linear-gradient(90deg, rgba(33,29,99,1) 0%, rgba(68,37,190,1) 38%, rgba(131,24,187,1) 100%)'
}

function nextSlide(parent, nextForm) {
    parent.classList.add('inactive');
    parent.classList.remove('active');

    nextForm.classList.add('active');
}
