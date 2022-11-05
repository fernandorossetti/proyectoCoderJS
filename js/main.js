const btnLogin = document.getElementById('btnLogin'),
    btnLogout = document.getElementById('btnLogout'),
    btnOperadores = document.getElementById('botones'),
    div = document.getElementById('logOut'),
    parrafo = document.getElementById('pLogin');


baseDeDatosLogin = JSON.parse(localStorage.getItem("sistema-de-login"));

let usuarioLogueado


if (!baseDeDatosLogin) {
    cargarDatosInicialesDeLaBaseDeDatosLogin();
}

function guardarDatosDeLaBaseDeDatosLogin() {
    localStorage.setItem("sistema-de-login", JSON.stringify(baseDeDatosLogin));
}

function cargarDatosInicialesDeLaBaseDeDatosLogin() {
    baseDeDatosLogin = {
        "admin": {
            contraseña: "abc"
        },
    }
}

function saludar(usuario) {
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario}</span>`
}

//Limpiar los storages
function borrarDatos() {
    localStorage.clear();
    sessionStorage.clear();
}

function recuperarUsuario(baseDeDatosLogin) {
    let usuarioEnStorage = JSON.parse(baseDeDatosLogin.getItem(''));
    return usuarioEnStorage;
}

function estaLogueado(usuario) {
    if (usuario) {
        btnLogout.className = 'justify-content-md-end d-block';
        nombreUsuario.className = 'text-end fw-bold d-block';
        saludar(usuario);
        btnOperadores.className = 'banco d-grid gap-2 d-md-block';
        parrafo.className = "d-none";
    }
}

async function menúBásico() {
    opción_menúBásico = -1;
    await swal.fire({
        title: "Menú",
        showConfirmButton: false,
        html: `
        <button class="swal2-confirm swal2-styled" onclick='opción_menúBásico=0;Swal.close()'>
            Registrar nuevo usuario
        </button>
        <br>
        <button class="swal2-confirm swal2-styled" onclick='opción_menúBásico=1;Swal.close()'>
            Login
        </button>
        `,
    });
    switch (opción_menúBásico) {
        case 0:
            registrarNuevoUsuario();
            break;
        case 1:
            login();
            break;
        default:
            await menúBásico();
            break;
    }
}

async function mostrarUsuariosPorTabla(...propiedades) {
    if (!usuarioLogueado) {
        return
    }
    let html = `
  <table class="table table-light table-striped">
    <theader>
    <th>
      Usuario
    </th>
  `;
    if (propiedades[0] == "*") {
        for (const usuario in baseDeDatosLogin) {
            for (const propiedad in baseDeDatosLogin[usuario]) {
                html += "<th>";
                html += propiedad;
                html += "</th>";
            }
            break;
        }
    } else {
        for (const propiedad of propiedades) {
            html += "<th>";
            html += propiedad;
            html += "</th>";
        }
    }
    html += "</theader><tbody>";
    for (const usuario in baseDeDatosLogin) {
        html += "<tr>";
        html += "<td>";
        html += usuario;
        html += "</td>";
        if (propiedades[0] == "*") {
            for (const propiedad in baseDeDatosLogin[usuario]) {
                html += "<td>";
                html += baseDeDatosLogin[usuario][propiedad];
                html += "</td>";
            }
        } else {
            for (const propiedad of propiedades) {
                html += "<td>";
                html += baseDeDatosLogin[usuario][propiedad];
                html += "</td>";
            }
        }

        html += "</tr>";
    }
    await swal.fire({
        text: "Usuarios",
        confirmButtonText: "Cerrar",
        html,
    });
}

async function registrarNuevoUsuario() {
    opción_registrarNuevoUsuario = -1;
    await swal.fire({
        title: "Registrar",
        showConfirmButton: false,
        html: `
        <input class="swal2-input" placeholder="Usuario" id="usuario">
        <input type="password" class="swal2-input" placeholder="Contraseña" id="contraseña">
        <br>
        <button class="swal2-confirm swal2-styled" onclick='opción_registrarNuevoUsuario=0;Swal.clickConfirm()'>
            Crear
        </button>
        <button class="swal2-confirm swal2-styled" onclick='opción_registrarNuevoUsuario=1;Swal.close()'>
            Cancelar
        </button>
        `,
        preConfirm: () => {
            let usuario = document.getElementById("usuario").value;
            let contraseña = document.getElementById("contraseña").value;
            if (!usuario) {
                Swal.showValidationMessage("No hay usuario");
                return false;
            } else if (!contraseña) {
                Swal.showValidationMessage("No hay contraseña");
                return false;
            } else if (usuario == baseDeDatosLogin.usuario && contraseña == baseDeDatosLogin.contraseña) {
                Swal.showValidationMessage("Usuario ya registrado");
                return false
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Usuario registrado con éxito',
                    showConfirmButton: false,
                    timer: 2000
                });
                baseDeDatosLogin[usuario] = {};
                baseDeDatosLogin[usuario].contraseña = contraseña;
                guardarDatosDeLaBaseDeDatosLogin();
                // return true;
            }
        },
    });
    switch (opción_registrarNuevoUsuario) {
        case 0:
            Swal.fire({
                icon: 'success',
                title: 'Usuario registrado con éxito',
                showConfirmButton: false,
                timer: 2000
            });
            menúBásico();
            break;
        case 1:
            menúBásico();
            break;
        default:
            menúBásico();
            break;
    }
}

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
            let datos = baseDeDatosLogin[usuario];
            if (!datos) {
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
                timer: 3000
            });
            btnLogout.className = 'justify-content-md-end d-block';
            nombreUsuario.className = 'text-end fw-bold d-block';
            saludar(usuario);
            btnOperadores.className = 'banco d-grid gap-2 d-md-block';
            parrafo.className = "d-none";
        },
    });
}

window.onload = () => estaLogueado(recuperarUsuario(localStorage));

btnLogin.addEventListener('click', () => {
    menúBásico();
});

btnLogout.addEventListener('click', (e) => {
    e.preventDefault();
    Swal.fire({
        title: 'Estas seguro?',
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
})