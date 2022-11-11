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
const btnCalcular = document.getElementById('calcular'),
    contenedorAlerta = document.getElementById('alertas'),
    btnOk = document.getElementById('btnOk'),
    btnNot = document.getElementById('btnNot'),
    modalEl = document.getElementById('exampleModal'),
    modal = new bootstrap.Modal(modalEl),
    btnMovimientos = document.getElementById('movimientos'),
    alertPlaceholder = document.getElementById('liveAlertPlaceholder');

function guardarDatos(storage, deposito, duracion) {

    const plazo = {
        "ingresoCapital": deposito,
        "plazoCapital": duracion
    }

    storage.setItem('plazosFijos', JSON.stringify(plazo))
}

function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    let plazoCapital = document.getElementById('txtPlazoEnDias').value;

    if (ingresoCapital == '' || plazoCapital == '') {
        alertaDanger('No puede haber un campo vacio', 'danger');
    } else if (ingresoCapital >= 1000 && plazoCapital >= 30 && plazoCapital <= 365) {
        let datos = [
            ingresoCapital,
            plazoCapital
        ];
        const plazo = new PlazoFijo(datos[0], datos[1]);
        plazosFijos.push(plazo);
        plazo.idPlazo(plazosFijos);
        ocultarMenu();
        alerta(plazosFijos);
        guardarDatos(sessionStorage, ingresoCapital, plazoCapital);
    } else {
        alertaDanger('Uno de los valores es erroneo, por favor vuelva a ingresarlos.', 'danger');
    }

}

function limpiarCampos() {
    let elementos = document.getElementsByTagName('input');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].value = '';
    }
}

function ocultarMenu() {
    const formulario = document.getElementById('contenidoInternaLayout');
    formulario.style.display = 'none';
}

function mostrarMenu() {
    const formulario = document.getElementById('contenidoInternaLayout');
    formulario.style.display = 'inline';
}

async function alerta(array) {
    for (const item of array) {
        let tna = 75 / 100;
        let costoFinal = item.deposito * (1 + tna * (item.duracion / 365));
        let interes = costoFinal - item.deposito;
        await swal.fire({
            title: "Operación Exitosa",
            showConfirmButton: false,
            html: `
        <div>  
            <p>El plazo elegido es: ${item.duracion} días</p>
            <p>Su capital:$ ${item.deposito}</p>
            <p>Su interes:$ ${interes.toFixed(2)}</p>
            <p>Monto Total:$ ${costoFinal.toFixed(2)}</p>
            <p>TNA: ${tna.toFixed(2)}</p>
            <a class="swal2-confirm swal2-styled" href="plazoFijo.html" role="button">Volver Menú</a>  
        </div>
            <hr>
        `,
        });
    }
}

function alertaDanger(message, type) {
    var wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' alert-dismissible" role="alert">' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>'

    alertPlaceholder.append(wrapper)
}

btnMovimientos.addEventListener('click', () => {
    ocultarMenu();
    let plazosEnStorage = JSON.parse(sessionStorage.getItem('plazosFijos'));
    let tna = 75 / 100;
    let costoFinal = plazosEnStorage.ingresoCapital * (1 + tna * (plazosEnStorage.plazoCapital / 365));
    let interes = costoFinal - plazosEnStorage.ingresoCapital;
    swal.fire({
        title: "Movimiento Anterior",
        showConfirmButton: false,
        html: `
<div>  
    <p>El plazo elegido es: ${plazosEnStorage.plazoCapital} días</p>
    <p>Su capital:$ ${plazosEnStorage.ingresoCapital}</p>
    <p>Su interes:$ ${interes.toFixed(2)}</p>
    <p>Monto Total:$ ${costoFinal.toFixed(2)}</p>
    <p>TNA: ${tna.toFixed(2)}</p>
    <a class="swal2-confirm swal2-styled" href="plazoFijo.html" role="button">Volver Menú</a>  
</div>
    <hr>
`,
    });
});

window.onload = () => {
    let plazosEnStorage = JSON.parse(sessionStorage.getItem('plazosFijos'));
    if (plazosEnStorage) {
        btnMovimientos.style.display = 'inline';
    }
}

btnCalcular.addEventListener('click', () => {
    plazoFijo();
});