// Comenzando las Clase
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
// Fin Clase

// Inicio Constructor
const cambios = [

]
// Fin Constructor

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
function mostrarCambios(array) {
    let arrayOrdenado = array.slice(0);
    let info = '';

    arrayOrdenado.forEach(elemento => {
        info += 'Moneda Inicial: ' + elemento.monedaInicial + '\nMonto: ' + elemento.monto + '\nMoneda Final: ' + elemento.monedaFinal + '\n\n'
    });
    return info;
}
function verificarMovimientosCambios() {
    if (cambios != 0) {
        let opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');

        while (opcion != 2) {

            switch (opcion) {

                case '1':
                    if (cambios != 0) {
                        alert(mostrarCambios(cambios));
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
        opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');
    }
    alert('Gracias por su visita, vuelva pronto!');
}

//Elementos que usaré del DOM
const btnCambioDivisas = document.getElementById('cambioDivisas');

btnCambioDivisas.addEventListener('click', cambioDivisas);