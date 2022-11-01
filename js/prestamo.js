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

const prestamos = [

]

//Elementos que usaré del DOM
const btnCalcular = document.getElementById('calcular'),
    contenedorAlerta = document.getElementById('alertas'),
    btnOk = document.getElementById('btnOk'),
    btnNot = document.getElementById('btnNot'),
    modalEl = document.getElementById('exampleModal'),
    modal = new bootstrap.Modal(modalEl),
    btnAbrirModal = document.getElementById('abrirModal'),
    btnMovimientos = document.getElementById('movimientos'),
    alertPlaceholder = document.getElementById('liveAlertPlaceholder');

function prestamo() {
    let meses = [12, 24, 36, 48, 60];
    // Pedir datos y guardarlos al Array
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    let plazoCapital = document.getElementById('txtPlazo').value;
    if (ingresoCapital == '' || plazoCapital == '') {
        alertaDanger('No puede haber un campo vacio', 'danger');
    } //Aclaro que lo comentado en el IF es una filtro que lo pude hacer andar asi, de haber otra manera, que de seguro lo hay y no me doy cuenta, les agradecería la recomendación.
    else if (ingresoCapital >= 200000 || plazoCapital != meses[0] && plazoCapital != meses[1] && plazoCapital != meses[2] && plazoCapital != meses[3] && plazoCapital != meses[4]) {
        alertaDanger('Uno de los valores es erroneo, por favor revisar y corregirlo.', 'danger');
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
        modal.show();
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

function alerta(array, contenedor) {
    contenedor.innerHTML = ''
    for (const item of array) {
        let porcentajeInteres = parseFloat();
        switch (item.meses) {
            case 12:
                porcentajeInteres = 0.25;
                break;

            case 24:
                porcentajeInteres = 0.40;
                break;

            case 36:
                porcentajeInteres = 0.55;
                break;

            case 48:
                porcentajeInteres = 0.70;
                break;

            case 60:
                porcentajeInteres = 0.80;
                break;
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

btnCalcular.addEventListener('click', () => {
    prestamo();
});

btnOk.addEventListener('click', () => {
    modal.hide();
   mostrarMenu();
   limpiarCampos();
   contenedorAlerta.style.display = 'none';
   if(prestamos != 0){
    btnMovimientos.style.display='inline';
   }
});

btnMovimientos.addEventListener('click', ()=> {
    contenedorAlerta.style.display='block';
});