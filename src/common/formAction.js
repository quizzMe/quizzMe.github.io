let currentPass = '';
export function onArrowClick(formData) {
    if (event.target.classList.contains('fa-arrow-down') || event.key == 'Enter') {
        event.preventDefault();
        let input;
        let parent;
        let nextForm;
        let backBtn;

        if(event.key != undefined){
            input = event.target;
            parent = event.target.parentNode;
            nextForm = parent.nextElementSibling;
        } else {
            input = event.target.previousElementSibling;
            parent = event.target.parentNode;
            nextForm = parent.nextElementSibling;
        }
        
        backBtn = document.querySelector('#back-arrow-holder');
        

        //Check for validation
        if (input.name === 'username' && validateUser(input)) {
            formData['username'] = input.value;
            nextSlide(parent, nextForm);
            backBtn.style.display = 'flex'
        } else if (input.name === 'email' && validateEmail(input)) {
            formData['email'] = input.value;
            nextSlide(parent, nextForm);
        } else if (input.name === 'password' && validatePassword(input)) {
            formData['password'] = input.value;
            currentPass = input.value;
            nextSlide(parent, nextForm);
        } else if ((input.name === 'rePass') && validateSamePass(currentPass, input.value)) {
            nextSlide(parent, nextForm);
        } else {
            parent.style.animation = "shake 0.5s ease"
        }

        parent.addEventListener('animationend', () => {
            parent.style.animation = '';
        })
    }
}

function validateUser(user) {
    const pattern = /^[A-Za-z][\w]+$/g;

    if (user.value.length > 5 && pattern.test(user.value)) {
        errorBackground(false);
        return true;
    } else {
        errorBackground(true, 'Username must be at least 6 charachters long. Only word characters are allowed!');
    }
}

function validateSamePass(currentPass, inputPass){
    if(currentPass == inputPass){
        errorBackground(false);
        return true;
    } else {
        errorBackground(true, 'Passwords don\'t match!');
    }
}

function validateEmail(email) {
    const pattern= /^([a-z]+[\.\-\_]?([a-z]+|[0-9]+)+)@([a-z]+[\.\-\_]?[a-z]+[\.][a-z]+[\.]?[a-z]+)/g;

    if (email.value.length > 6 && pattern.test(email.value)) {
        errorBackground(false);
        return true;
    } else {
        errorBackground(true, 'Please sign up with a valid email!');
    }
}

function validatePassword(pass){
    const pattern = /(^[A-Za-z]+[0-9]+$)|(^[0-9]+[A-Za-z]+$)/g;

    if (pass.value.length > 5 && pattern.test(pass.value)) {
        errorBackground(false);
        return true;
    } else {
        errorBackground(true, 'Password must be at least 6 characters long, containing both numbers and letters!');
    }
}

function errorBackground(mistake, message) {
    const container = document.getElementById('register-container') || document.getElementById('login-container');
    mistake ? container.style.backgroundImage = 'linear-gradient(97deg, rgba(218,111,111,0.989233193277311) 21%, rgba(172,75,75,1) 48%, rgba(170,93,93,1) 72%)' : container.style.backgroundImage = 'linear-gradient(90deg, rgba(33,29,99,1) 0%, rgba(68,37,190,1) 38%, rgba(131,24,187,1) 100%)'
    message ? setTimeout(function(){alert(message)}, 700) : '';
}

export function nextSlide(parent, nextForm) {
    parent.classList.add('inactive');
    parent.classList.remove('active');
    parent.querySelector('input').blur();

    nextForm.classList.add('active');
    
    if(nextForm.querySelector('input') != null){
        nextForm.querySelector('input').focus();
    }
}

export function previousSlide(ev) {
    if (ev.target.classList.contains('fa-angle-double-left') || ev.target.classList.contains('use-for-check')) {
        const activeDiv = [...ev.target.parentNode.nextElementSibling.children].filter(el => el.classList.contains('active'))[0];
        const previousDiv = activeDiv.previousElementSibling;
        nextSlide(activeDiv, previousDiv);
        if (previousDiv.classList.contains('name-field')) {
            document.querySelector('#back-arrow-holder').style.display = 'none';
        }
    }
}