// Clase Principal
class Prestamo {
    constructor(monto, meses, id) {
        this.monto = parseInt(monto);
        this.meses = parseInt(meses);
        this.id = id;
    }

    idPresta(array) {
        this.id = array.length;
    }
}

// Constuctor donde se alojan los datos
const prestamos = [

]

//Elementos que usaré del DOM
const btnCalcular = document.getElementById('calcular'),
    contenedorAlerta = document.getElementById('alertas'),
    btnOk = document.getElementById('btnOk'),
    btnNot = document.getElementById('btnNot'),
    select = document.getElementById('plazo'),
    alertPlaceholder = document.getElementById('liveAlertPlaceholder');

// Comienzo de Funciones
// Funcion Principal
function prestamo() {
    const meses = select.selectedIndex;
    if (meses === -1) return; // Esto es cuando no hay elementos
    const opcionSeleccionada = select.options[meses];
    // Pedir datos y guardarlos al Array
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    let plazoCapital = opcionSeleccionada.value;
    if (ingresoCapital == '' || plazoCapital == '') {
        alertaDanger('No puede haber un campo vacio', 'danger');
    } //Aclaro que lo comentado en el IF es una filtro que lo pude hacer andar asi, de haber otra manera, que de seguro lo hay y no me doy cuenta, les agradecería la recomendación.
    else if (ingresoCapital >= 200000) {
        alertaDanger('El monto supero el máximo, por favor corríjelo', 'danger');
        //limpiarCampos();
    } else {
        let datos = [
            ingresoCapital,
            plazoCapital
        ];
        const presta = new Prestamo(datos[0], datos[1]);
        prestamos.push(presta);
        presta.idPresta(prestamos);
        ocultarMenu();
        alerta(prestamos, contenedorAlerta);
    }
}

// Limpiar elemenos del HTML
function limpiarCampos() {
    let elementos = document.getElementsByTagName('input');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].value = '';
    }
    select.value = "";
}

function ocultarMenu() {
    const formulario = document.getElementById('contenidoInternaLayout');
    formulario.style.display = 'none';
}

function mostrarMenu() {
    const formulario = document.getElementById('contenidoInternaLayout');
    formulario.style.display = 'inline';
}

// Muestras el resultado en forma de alerta
function alerta(array, contenedor) {
    contenedor.innerHTML = '';
    for (const item of array) {
        let porcentajeInteres = parseFloat();
        if (item.meses <= 12) {
            porcentajeInteres = 0.25;
        } else if (item.meses <= 24) {
            porcentajeInteres = 0.40;
        } else if (item.meses <= 36) {
            porcentajeInteres = 0.60;
        } else if (item.meses <= 48) {
            porcentajeInteres = 0.80;
        } else {
            porcentajeInteres = 0.95;
        }
        let interes = item.monto * porcentajeInteres;
        let total = item.monto + interes;
        let pagoMensual = total / item.meses;
        let tarjeta = document.createElement('div');
        tarjeta.className = 'alert alert-success text-aling-center';
        tarjeta.role = 'alert',
            tarjeta.innerHTML = `
        <div>
            <h4 class="text-aling-center alert-heading">Detalle de la Operación</h4>
            <p>El monto solicitado es: ${item.monto}</p>
            <p>El plazo elegido es: ${item.meses} meses</p>
            <p>El total a devolver:$ ${total.toFixed(2)}</p>
            <p>El capital mensual a entregar:$ ${pagoMensual.toFixed(2)}</p>
            <a class="btn btn-primary" href="prestamos.html" role="button">Volver Menú</a>
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
// Finalizan las funciones

// Botontes

// Boton Principal
btnCalcular.addEventListener('click', () => {
    prestamo();
});