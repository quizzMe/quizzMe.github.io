export function animatedForm(){
    const arrows = document.querySelectorAll('.fa-arrow-down');

    arrows.forEach(arrow=>{
        arrow.addEventListener('click', ()=>{
            const input = arrow.previousElementSibling;
            const parent = arrow.parentNode;
            const nextForm = parent.nextElementSibling;
      
      
            //Check for validation
            if(input.name === 'username' && validateUser(input)){
                nextSlide(parent, nextForm)
            }
        })

    })

    function validateUser(user){
        if(user.value.length < 5){
            errorBackground(true);
        } else {
            errorBackground(false);
            return true;
        }
    }
    
    function errorBackground(mistake){
        const container = document.getElementById('register-container');
    
        container.style.backgroundColor = mistake ?  'red' : 'linear-gradient(90deg, rgba(33,29,99,1) 0%, rgba(68,37,190,1) 38%, rgba(131,24,187,1) 100%);'
    }

    function nextSlide(parent, nextForm){
        parent.classList.add('inactive');
        parent.classList.remove('active');

        nextForm.classList.add('active');
    }
}
