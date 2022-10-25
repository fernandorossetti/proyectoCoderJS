class PlazoFijo {
    constructor(deposito, duracion, id) {
        this.deposito = parseFloat(deposito);
        this.duracion = parseInt(duracion);
        this.id = id;
    }

    idPlazo(array) {
        this.id = array.length;
    }
}

const plazosFijos = [

]

//Elementos que usaré del DOM
const btnPlazoFijo = document.getElementById('calcular'),
    contenedorAlerta = document.getElementById('alertas'),
    btnOk = document.getElementById('btnOk'),
    btnNot = document.getElementById('btnNot'),
    modalEl = document.getElementById('exampleModal'),
    modal = new bootstrap.Modal(modalEl),
    alertPlaceholder = document.getElementById('liveAlertPlaceholder');

btnPlazoFijo.addEventListener('click', plazoFijo);

function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    let plazoCapital = document.getElementById('txtPlazoEnDias').value;

    if (ingresoCapital >= 1000 && plazoCapital >= 30 && plazoCapital <= 365) {
        let datos = [
            ingresoCapital,
            plazoCapital
        ];
        const plazo = new PlazoFijo(datos[0], datos[1]);

        plazosFijos.push(plazo);
        plazo.idPlazo(plazosFijos);

        ocultarMenu();
        alerta(plazosFijos, contenedorAlerta);

    } else {
        alertaDanger('Uno de los valores es erroneo, por favor vuelva a ingresarlos.', 'danger');
        limpiarCampos();
    }
}

function limpiarCampos() {
    let elementos = document.getElementsByTagName('input');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].value = '';
    }
}

// No lo veo necesario ya que lo hago mostrar.
/*function mostrarPlazoFijo(array) {
    let info = '';

    array.forEach(elemento => {
        info += 'Depósito: ' + elemento.deposito + '\nDuración: ' + elemento.duracion + '\n\n'
    });

    return info;
} 

function verificarMovimientos() {
    if (plazosFijos != 0) {
        let opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');

        while (opcion != 2) {

            switch (opcion) {

                case '1':
                    if (plazosFijos != 0) {
                        alert(mostrarPlazoFijo(plazosFijos));
                        break;
                    } else {
                        alert('No posee movimientos');
                    }
                    break;

                default:
                    alert('Elegiste una opción inválida, vuelva a porbar!');
                    break;
            }
            break;

        }
     }
     alert('Gracias por su visita, vuelva pronto!');

}*/

function ocultarMenu() {
    const formulario = document.getElementById('contenidoInternaLayout');
    formulario.style.display = 'none';
}


    btnOk.addEventListener('click', (e) => {
        e.preventDefault();
        modal.hide();
        alertaPlazos(plazosFijos, contenedorAlerta)
    });


function alerta(array, contenedor) {
    contenedor.innerHTML = ''
    for (const item of array) {
        let tna = 75 / 100;
        let costoFinal = item.deposito * (1 + tna * (item.duracion / 365));
        let interes = costoFinal - item.deposito;
        let tarjeta = document.createElement('div');
        tarjeta.className = 'alert alert-success text-aling-center';
        tarjeta.role = 'alert',
            tarjeta.innerHTML = `
        <div>
            <h4 class="alert-heading">Tus Movimeintos</h4>
            <p>El plazo elegido es: ${item.duracion} días</p>
            <p>Su capital:$ ${item.deposito}</p>
            <p>Su capital:$ ${interes.toFixed(2)}</p>
            <p>Monto Total:$ ${costoFinal.toFixed(2)}</p>
            <p>TNA: ${tna.toFixed(2)}</p>
            <a class="btn btn-primary" href="plazoFijo.html" role="button">Volver Menú</a> 
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Ver Movimientos
            </button>       
        </div>
            <hr>`;
        contenedor.append(tarjeta)
    }
}

function alertaDanger(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}

function alertaPlazos(array, contenedor) {
    contenedor.innerHTML = ''
    array.forEach(item => {
        let tarjeta = document.createElement('div');
        tarjeta.className = 'alert alert-success';
        tarjeta.role = 'alert',
            tarjeta.innerHTML += `
        <div>
            <h4 class="alert-heading text-align-center">Tus Movimeintos</h4>
            <p>El plazo elegido es: ${item.duracion} días</p>
            <p>Su capital:$ ${item.deposito}</p>
            <hr>
            <a class="btn btn-primary" href="plazoFijo.html" role="button">Volver Menú</a>`;
        contenedor.append(tarjeta)
    });
}
