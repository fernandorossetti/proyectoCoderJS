// Clase
class CambioDivisas {
    constructor(monedaInicial, monto, monedaFinal, id) {
        this.monedaInicial = monedaInicial;
        this.monto = parseInt(monto);
        this.monedaFinal = monedaFinal;
        this.id = id;
    }

    idCambio(array) {
        this.id = array.length;
    }
}

//Constructor
const cambios = [

]

//Elementos que usaré del DOM
const btnCalcular = document.getElementById('calcular'),
    contenedorAlerta = document.getElementById('alertas'),
    btnOk = document.getElementById('btnOk'),
    btnNot = document.getElementById('btnNot'),
    pesos = document.getElementById('radio1'),
    dolares = document.getElementById('radio2'),
    reales = document.getElementById('radio3'),
    euros = document.getElementById('radio4'),
    modalEl = document.getElementById('exampleModal'),
    modal = new bootstrap.Modal(modalEl),
    btnAbrirModal = document.getElementById('abrirModal'),
    btnMovimientos = document.getElementById('movimientos'),
    alertPlaceholder = document.getElementById('liveAlertPlaceholder');


//Inicio de Funcion
function cambioDivisas() {
    // Tipos de Operaciónes.
    let montoFinal = parseInt();
    let monedas = [
        dolarCompra = 278,
        dolarVenta = 282,
        euroCompra = 283,
        euroVenta = 287,
        realCompra = 65,
        realVenta = 71
    ]

    let ingreso = prompt('Ingresar los datos solicitados separados por un(-):PJ 1-50000-2\nA)-Moneda con la que desea operar(Ingrese Número):' + '\n' +
        '1_Pesos.\n2_Dolar.\n3_Euro.\n4_Real.\n\nB)-Ingrese el monto.\n\nC)-Que moneda desea?(Ingrese Número).\n1_Pesos.\n2_Dolar.\n3_Euro.\n4_Real.' + '\n\n' +
        'Ingresa x para volver al menú principal.');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const cambio = new CambioDivisas(datos[0], datos[1], datos[2]);

        if (cambio.monedaInicial <= '4') {

            switch (cambio.monedaInicial) {
                case '1':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto;
                            break;
                        case '2':
                            montoFinal = cambio.monto / monedas[1];
                            break;
                        case '3':
                            montoFinal = cambio.monto / monedas[3];
                            break;
                        case '4':
                            montoFinal = cambio.monto / monedas[5];
                            break;
                    }
                    break;

                case '2':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[0];
                            break;
                        case '2':
                            montoFinal = cambio.monto;
                            break;
                        case '3':
                            montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                            break;
                        case '4':
                            montoFinal = cambio.monto * (monedas[4] / monedas[0]);
                            break;
                    }
                    break;

                case '3':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[2];
                            break;
                        case '2':
                            montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                            break;
                        case '3':
                            montoFinal = cambio.monto;
                            break;
                        case '4':
                            montoFinal = cambio.monto * (monedas[2] / monedas[5]);
                            break;
                    }
                    break;

                case '4':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[4];
                            break;
                        case '2':
                            montoFinal = cambio.monto * (monedas[4] / monedas[1]);
                            break;
                        case '3':
                            montoFinal = cambio.monto * (monedas[4] / monedas[3]);
                            break;
                        case '4':
                            montoFinal = cambio.monto;
                            break;
                    }
                    break;
            }
            if (cambio.monedaFinal <= '4') {

                switch (cambio.monedaFinal) {
                    case '1':
                        alert('El resultado de la operación es:$ ARS' + montoFinal.toFixed(2));
                        break;

                    case '2':
                        alert('El resultado de la operación es:$ U$d ' + montoFinal.toFixed(2));
                        break;

                    case '3':
                        alert('El resultado de la operación es:€ ' + montoFinal.toFixed(2));
                        break;

                    case '4':
                        alert('El resultado de la operación es:R$ ' + montoFinal.toFixed(2));
                        break;
                }
            } else {
                alert('La moneda a la que desea cambiar es erronea, por favor vuelva a ingresarla.');
                cambioDivisas();
            }

            // Switch para que al momento de mostrar el movimiento no cargue el número sino el valor que le corresponde en base a lo que elija.
            switch (cambio.monedaInicial) {
                case '1':
                    cambio.monedaInicial = 'Pesos';
                    break;

                case '2':
                    cambio.monedaInicial = 'Dolares';
                    break;

                case '3':
                    cambio.monedaInicial = 'Euros';
                    break;

                case '4':
                    cambio.monedaInicial = 'Reales';
                    break;
            }

            // Switch para que al momento de mostrar el movimiento no cargue el número sino el resultado total de la moneda que le corresponde en base a lo que eligio.
            switch (cambio.monedaFinal) {
                case '1':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Pesos';
                    break;

                case '2':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Dolares';
                    break;

                case '3':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Euros';
                    break;

                case '4':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Reales';
                    break;
            }

            cambios.push(cambio);
            cambio.idCambio(cambios);

            let reIngreso = prompt('Desea realizar otro Cambio?\n1)-Si\n2)-No');
            if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
                cambioDivisas();
            }else{
                verificarMovimientosCambios();
            }
        } else {
            alert('La moneda ingresada es erronea, por favor vuelva a ingresarla.');
            cambioDivisas();
        }
    }
}

function prestamo() {
    let montoFinal = parseInt();
    let monedas = [
        dolarCompra = 278,
        dolarVenta = 282,
        euroCompra = 283,
        euroVenta = 287,
        realCompra = 65,
        realVenta = 71
    ]
    let checkOperar = [
        pesos,
        dolares,
        reales,
        euros
    ]
    // Pedir datos y guardarlos al Array
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    if (ingresoCapital == '' && !checkOperar.checked) {
        alertaDanger('No puede haber un campo vacio', 'danger');
    } else {
        let datos = [
            checkOperar.getElementById,
            ingresoCapital
        ]
            
        const cambio = new CambioDivisas(datos[0], datos[1], datos[2]);

        switch (cambio.monedaInicial) {
            case '1':
                switch (cambio.monedaFinal) {
                    case '1':
                        montoFinal = cambio.monto;
                        break;
                    case '2':
                        montoFinal = cambio.monto / monedas[1];
                        break;
                    case '3':
                        montoFinal = cambio.monto / monedas[3];
                        break;
                    case '4':
                        montoFinal = cambio.monto / monedas[5];
                        break;
                }
                break;

            case '2':
                switch (cambio.monedaFinal) {
                    case '1':
                        montoFinal = cambio.monto * monedas[0];
                        break;
                    case '2':
                        montoFinal = cambio.monto;
                        break;
                    case '3':
                        montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                        break;
                    case '4':
                        montoFinal = cambio.monto * (monedas[4] / monedas[0]);
                        break;
                }
                break;

            case '3':
                switch (cambio.monedaFinal) {
                    case '1':
                        montoFinal = cambio.monto * monedas[2];
                        break;
                    case '2':
                        montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                        break;
                    case '3':
                        montoFinal = cambio.monto;
                        break;
                    case '4':
                        montoFinal = cambio.monto * (monedas[2] / monedas[5]);
                        break;
                }
                break;

            case '4':
                switch (cambio.monedaFinal) {
                    case '1':
                        montoFinal = cambio.monto * monedas[4];
                        break;
                    case '2':
                        montoFinal = cambio.monto * (monedas[4] / monedas[1]);
                        break;
                    case '3':
                        montoFinal = cambio.monto * (monedas[4] / monedas[3]);
                        break;
                    case '4':
                        montoFinal = cambio.monto;
                        break;
                }
                break;
        }
        if (cambio.monedaFinal <= '4') {

            switch (cambio.monedaFinal) {
                case '1':
                    alert('El resultado de la operación es:$ ARS' + montoFinal.toFixed(2));
                    break;

                case '2':
                    alert('El resultado de la operación es:$ U$d ' + montoFinal.toFixed(2));
                    break;

                case '3':
                    alert('El resultado de la operación es:€ ' + montoFinal.toFixed(2));
                    break;

                case '4':
                    alert('El resultado de la operación es:R$ ' + montoFinal.toFixed(2));
                    break;
            }
        } else {
            alert('La moneda a la que desea cambiar es erronea, por favor vuelva a ingresarla.');
            cambioDivisas();
        }

        // Switch para que al momento de mostrar el movimiento no cargue el número sino el valor que le corresponde en base a lo que elija.
        switch (cambio.monedaInicial) {
            case '1':
                cambio.monedaInicial = 'Pesos';
                break;

            case '2':
                cambio.monedaInicial = 'Dolares';
                break;

            case '3':
                cambio.monedaInicial = 'Euros';
                break;

            case '4':
                cambio.monedaInicial = 'Reales';
                break;
        }

        // Switch para que al momento de mostrar el movimiento no cargue el número sino el resultado total de la moneda que le corresponde en base a lo que eligio.
        switch (cambio.monedaFinal) {
            case '1':
                cambio.monedaFinal = +montoFinal.toFixed(2) + ' Pesos';
                break;

            case '2':
                cambio.monedaFinal = +montoFinal.toFixed(2) + ' Dolares';
                break;

            case '3':
                cambio.monedaFinal = +montoFinal.toFixed(2) + ' Euros';
                break;

            case '4':
                cambio.monedaFinal = +montoFinal.toFixed(2) + ' Reales';
                break;
        }

        cambios.push(cambio);
        cambio.idCambio(cambios);
        ocultarMenu();
        alerta(cambios, contenedorAlerta);
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
        let montoFinal = parseInt();
        let monedas = [
            dolarCompra = 278,
            dolarVenta = 282,
            euroCompra = 283,
            euroVenta = 287,
            realCompra = 65,
            realVenta = 71
        ]
        if (cambio.monedaInicial <= '4') {

            switch (cambio.monedaInicial) {
                case '1':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto;
                            break;
                        case '2':
                            montoFinal = cambio.monto / monedas[1];
                            break;
                        case '3':
                            montoFinal = cambio.monto / monedas[3];
                            break;
                        case '4':
                            montoFinal = cambio.monto / monedas[5];
                            break;
                    }
                    break;

                case '2':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[0];
                            break;
                        case '2':
                            montoFinal = cambio.monto;
                            break;
                        case '3':
                            montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                            break;
                        case '4':
                            montoFinal = cambio.monto * (monedas[4] / monedas[0]);
                            break;
                    }
                    break;

                case '3':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[2];
                            break;
                        case '2':
                            montoFinal = cambio.monto * (monedas[2] / monedas[0]);
                            break;
                        case '3':
                            montoFinal = cambio.monto;
                            break;
                        case '4':
                            montoFinal = cambio.monto * (monedas[2] / monedas[5]);
                            break;
                    }
                    break;

                case '4':
                    switch (cambio.monedaFinal) {
                        case '1':
                            montoFinal = cambio.monto * monedas[4];
                            break;
                        case '2':
                            montoFinal = cambio.monto * (monedas[4] / monedas[1]);
                            break;
                        case '3':
                            montoFinal = cambio.monto * (monedas[4] / monedas[3]);
                            break;
                        case '4':
                            montoFinal = cambio.monto;
                            break;
                    }
                    break;
            }
            if (cambio.monedaFinal <= '4') {

                switch (cambio.monedaFinal) {
                    case '1':
                        alert('El resultado de la operación es:$ ARS' + montoFinal.toFixed(2));
                        break;

                    case '2':
                        alert('El resultado de la operación es:$ U$d ' + montoFinal.toFixed(2));
                        break;

                    case '3':
                        alert('El resultado de la operación es:€ ' + montoFinal.toFixed(2));
                        break;

                    case '4':
                        alert('El resultado de la operación es:R$ ' + montoFinal.toFixed(2));
                        break;
                }
            } else {
                alert('La moneda a la que desea cambiar es erronea, por favor vuelva a ingresarla.');
                cambioDivisas();
            }

            // Switch para que al momento de mostrar el movimiento no cargue el número sino el valor que le corresponde en base a lo que elija.
            switch (cambio.monedaInicial) {
                case '1':
                    cambio.monedaInicial = 'Pesos';
                    break;

                case '2':
                    cambio.monedaInicial = 'Dolares';
                    break;

                case '3':
                    cambio.monedaInicial = 'Euros';
                    break;

                case '4':
                    cambio.monedaInicial = 'Reales';
                    break;
            }

            // Switch para que al momento de mostrar el movimiento no cargue el número sino el resultado total de la moneda que le corresponde en base a lo que eligio.
            switch (cambio.monedaFinal) {
                case '1':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Pesos';
                    break;

                case '2':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Dolares';
                    break;

                case '3':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Euros';
                    break;

                case '4':
                    cambio.monedaFinal = +montoFinal.toFixed(2) + ' Reales';
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
}}

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


function mostrarCambios(array) {
    let arrayOrdenado = array.slice(0);
    let info = '';

    arrayOrdenado.forEach(elemento => {
        info += 'Moneda Inicial: ' + elemento.monedaInicial + '\nMonto: ' + elemento.monto + '\nMoneda Final: ' + elemento.monedaFinal + '\n\n'
    });
    return info;
}