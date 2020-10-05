
    document.addEventListener('scroll', function(){
        MenuFixoAnimation()
    });

    document.querySelector('#icon-mobile').addEventListener('click', function(){
        MenuMobileAnimation()
    })

    document.querySelector('#button-form').addEventListener('click',function(){
        ValidacaoEmail();
    });

    const LinkMenu = document.querySelectorAll('header a')

    LinkMenu.forEach( link => {
        link.addEventListener('click', ScrollToId)

    })

function ValidacaoEmail(){
 
    const formbar = document.querySelector('#form-bar')

    if(!ValidacaoCamposVazios()){
        return false;
    } else {
        alert('Sua Menssagem foi enviada com sucesso!');
        formbar.submit()
    }
    
}

function ValidacaoCamposVazios(){
    const email = document.querySelector('#email-campo');
    const name = document.querySelector('#name-campo');
    const msg = document.querySelector('#message-campo');
    let cont;

    cont = 0;

    if(email.value == ''){
        email.classList.add('error-border');
        cont++;
    } else{
        email.classList.remove('error-border');
    }
    
    if (name.value == ''){
        name.classList.add('error-border');
        cont++;
    } else{
        name.classList.remove('error-border');
    }
    
    if(msg.value == ''){
        msg.classList.add('error-border');
        cont++
    }else{
        msg.classList.remove('error-border');
    }

    if(cont == 0){
        return true;
    } else{
        return false;
    }
}

function MenuMobileAnimation(){
    const icon = document.querySelector('#icon-mobile');
    const menu = document.querySelectorAll('.mobile-link');
   
    menu.forEach( menu => {
        menu.classList.toggle('height-max');
        
    });


    menu.forEach(menu =>{
         if (menu.classList.contains('height-max')){
                icon.innerHTML ='<i class="fas fa-times"></i>'
            } else{
                icon.innerHTML ='<i class="fas fa-bars">'
            }
    })
   

}

function MenuFixoAnimation(){
    const windowY = window.pageYOffset;
    const menu = document.querySelector('#fixed-menu');


    if(windowY >= 100){

        menu.classList.remove('transform-animation')

    } else{
        menu.classList.add('transform-animation')
    }
}

function ScrollToId(event){


    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute('href');
    const to = document.querySelector(id).offsetTop - 80;
    smoothScrollTo(0,to, 1000);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};