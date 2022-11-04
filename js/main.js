const btnLogin = document.getElementById('login'),
      header = document.getElementById('header'),
      formLogin = document.getElementById('iniciar-sesion');


btnLogin.addEventListener('click', (e) =>{
    e.preventDefault();
    header.style.display = 'none';
    formLogin.style.display = 'inline';
})