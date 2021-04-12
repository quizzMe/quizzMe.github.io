let currentPass = '';
export function onArrowClick(formData) {
    if (event.target.classList.contains('fa-arrow-down')) {
        const input = event.target.previousElementSibling;
        const parent = event.target.parentNode;
        const nextForm = parent.nextElementSibling;
        const backBtn = document.querySelector('#back-arrow-holder');

        //Check for validation
        if (input.name === 'username' && validateUser(input)) {
            formData['username'] = input.value;
            nextSlide(parent, nextForm);
            backBtn.style.display = 'flex'
        } else if (input.name === 'email' && validateEmail(input)) {
            formData['email'] = input.value;
            nextSlide(parent, nextForm);
        } else if (input.name === 'password' && validateUser(input)) {
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
    if (user.value.length < 5) {
        errorBackground(true);
    } else {
        errorBackground(false);
        return true;
    }
}

function validateSamePass(currentPass, inputPass){
    if(currentPass == inputPass){
        errorBackground(false);
        return true;
    } else {
        errorBackground(true);
    }
}

function validateEmail(email) {
    const pattern= /^([a-z]+[\.\-\_]?([a-z]+|[0-9]+)+)@([a-z]+[\.\-\_]?[a-z]+[\.][a-z]+[\.]?[a-z]+)/g;

    if (email.value.length > 6 && pattern.test(email.value)) {
        errorBackground(false);
        return true;
    } else {
        errorBackground(true);
    }
}

function errorBackground(mistake) {
    const container = document.getElementById('register-container') || document.getElementById('login-container');
    mistake ? container.style.backgroundImage = 'linear-gradient(97deg, rgba(218,111,111,0.989233193277311) 21%, rgba(172,75,75,1) 48%, rgba(170,93,93,1) 72%)' : container.style.backgroundImage = 'linear-gradient(90deg, rgba(33,29,99,1) 0%, rgba(68,37,190,1) 38%, rgba(131,24,187,1) 100%)'
}

export function nextSlide(parent, nextForm) {
    parent.classList.add('inactive');
    parent.classList.remove('active');

    nextForm.classList.add('active');
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