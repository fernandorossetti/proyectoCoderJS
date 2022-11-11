// Elementos que uso en el DOM.
const btnLogin = document.getElementById('btnLogin'),
    btnLogout = document.getElementById('btnLogout'),
    btnOperadores = document.getElementById('botones'),
    div = document.getElementById('logOut'),
    parrafo = document.getElementById('pLogin');

// Variable para enlazar al momento de registrar un usuario.
let usuarioLogueado

// Creando mi base de datos.
baseDeDatosLogin = JSON.parse(localStorage.getItem("sistema-de-login"));

// Si no hay datos cargados en el localStorage usa los que esta/n declarados en dicha función. 
if (!baseDeDatosLogin) {
    cargarDatosInicialesDeLaBaseDeDatosLogin();
}

// Inicio de Funciones comunes y asíncronas.

// Guarda datos en el LocalStorage.
function guardarDatosDeLaBaseDeDatosLogin() {
    localStorage.setItem("sistema-de-login", JSON.stringify(baseDeDatosLogin));
}

// Carga datos.
function cargarDatosInicialesDeLaBaseDeDatosLogin() {
    baseDeDatosLogin = {
        usuario: 'fernando',
        contraseña: "3567"
    }
}

// Saludo al inicar sesión.
function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${baseDeDatosLogin.usuario}</span>`
}

// Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

// Recupera datos del Local en caso de hacer reload y no tengas que volver a inicar sesión.
function recuperarUsuario(storage) {
    let usuarioEnStorage = JSON.parse(storage.getItem("sistema-de-login"));
    return usuarioEnStorage;
}

// Refresca los datos habilitados en caso de estar logueado.
function estaLogueado(usuario) {
    if (usuario) {
        btnLogout.className = 'justify-content-md-end d-block';
        nombreUsuario.className = 'text-end fw-bold d-block';
        saludar(usuario);
        btnOperadores.className = 'banco d-grid gap-2 d-md-block';
        parrafo.className = "d-none";
    }
}

// Menú de registro y login.
async function menuBasico() {
    opcionMenuBasico = -1;
    await swal.fire({
        title: "Menú",
        showConfirmButton: false,
        html: `
        <button class="swal2-confirm swal2-styled" onclick='opcionMenuBasico=0;Swal.close()'>
            Registrar nuevo usuario
        </button>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='opcionMenuBasico=1;Swal.close()'>
            Login
        </button>
        `,
    });
    switch (opcionMenuBasico) {
        case 0:
            registrarNuevoUsuario();
            break;
        case 1:
            login();
            break;
        default:
            await menuBasico();
            break;
    }
}

// Registrar Usuario.
async function registrarNuevoUsuario() {
    registrarUsuario = -1;
    await swal.fire({
        title: "Registrar",
        showConfirmButton: false,
        html: `
        <input class="swal2-input" placeholder="Usuario" id="usuario">
        <input type="password" class="swal2-input" placeholder="Contraseña" id="contraseña">
        <br>
        <button class="swal2-confirm swal2-styled" onclick='registrarUsuario=0;Swal.clickConfirm()'>
            Crear
        </button>
        <button class="swal2-confirm swal2-styled" onclick='registrarUsuario=1;Swal.close()'>
            Cancelar
        </button>
        `,
        preConfirm: () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            if (!usuario) {
                Swal.showValidationMessage("No hay usuario");
                return false;
            } if (!contraseña) {
                Swal.showValidationMessage("No hay contraseña");
                return false;
            } if (usuario == baseDeDatosLogin.usuario && contraseña == baseDeDatosLogin.contraseña) {
                Swal.showValidationMessage("Usuario ya registrado");
                return false
            }
            baseDeDatosLogin.usuario = usuario;
            baseDeDatosLogin.contraseña = contraseña;
            guardarDatosDeLaBaseDeDatosLogin();
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado con éxito',
                showConfirmButton: false,
                timer: 2000
            });
        },
    });
}

// Iniciar sesión.
async function login() {
    await swal.fire({
        title: "Bienvenido",
        confirmButtonText: "Login",
        html: `
        <div style="margin:5px">
            <input class="swal2-input" placeholder="usuario" id="usuario">
            <input type="password" class="swal2-input" placeholder="contraseña" id="contraseña">
        </div>
        `,
        preConfirm: () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            if (!usuario) {
                Swal.showValidationMessage("No hay usuario");
                return false;
            }
            if (!contraseña) {
                Swal.showValidationMessage("No hay contraseña");
                return false;
            }
            let datos = baseDeDatosLogin;
            if (datos.usuario != usuario) {
                Swal.showValidationMessage("El usuario no existe");
                return false;
            }
            if (datos.contraseña != contraseña) {
                Swal.showValidationMessage("Contraseña incorrecta");
                return false;
            }
            usuarioLogueado = datos;
            Swal.fire({
                icon: 'success',
                title: 'Bienvenido ' + usuario + ' es hora de operar',
                showConfirmButton: false,
                timer: 3000,
            });
            btnLogout.className = 'justify-content-md-end d-block';
            nombreUsuario.className = 'text-end fw-bold d-block';
            saludar(usuario);
            btnOperadores.className = 'banco d-grid gap-2 d-md-block';
            parrafo.className = "d-none";
        },
    });
}

// Finalización de Funciones

// Al refrescar la página si hay un usuario en el Local deja la página como esta y no vuelve al login.
window.onload = () => estaLogueado(recuperarUsuario(localStorage));

// Botones Login y Logout
btnLogin.addEventListener('click', () => {
    menuBasico();
});

btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro/a?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si'
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                'Éxitos',
                'Espero te haya gustado Profe',
                'success'
            );
            borrarDatos();
            btnOperadores.className = 'd-none';
            parrafo.className = "banco d-grid gap-2 d-md-block";
            div.className = "d-none";
        }
    });
});
// Finalización de botones.