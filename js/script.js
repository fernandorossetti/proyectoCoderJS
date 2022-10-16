// Comenzando las Clases
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
// Fin Clases

// Inicio Constructores
const plazosFijos = [

]
const prestamos = [

]
const cambios = [

]
// Fin Constructores

//Inicio de Funciones
function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-): PJ 20000-35\nA)-Monto:$ (Solo números y mayor a $1000).' + '\n' +
        'B)-Días (Mínimo 30 días - Máximo 365 días).\nIngresa x para volver al menú principal.');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const plazo = new PlazoFijo(datos[0], datos[1]);
        plazosFijos.push(plazo);
        plazo.idPlazo(plazosFijos);

        let tna = 75 / 100;

        if (plazo.deposito >= 1000 && plazo.duracion >= '30') {

            let costoFinal = plazo.deposito * (1 + tna * (plazo.duracion / 365));
            let interes = costoFinal - plazo.deposito;

            console.log(plazosFijos);

            alert('El plazo elegido es: ' + plazo.duracion + ' Días\nSu capital:$ ' + plazo.deposito +
                '\nIntereses:$ ' + interes.toFixed(2) +
                '\nMonto Total:$ ' + costoFinal.toFixed(2) +
                '\nTNA: ' + tna.toFixed(2) + '%');

            let reIngreso = prompt('Desea realizar otro Plazo?\n1)-Si\n2)-No');
            if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
                plazoFijo();
            }
        } else {
            alert('Uno de los valores es erroneo, por favor vuelva a ingresarlos.');
            plazoFijo();
        }
    }

}

function prestamo() {
    let porcentajeInteres = parseFloat();
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-): PJ 20000-12\nA)-Monto a solicitar(Maximo $200.000).\nB)-Cantidad de Meses(12-24-36-48-60).' + '\n' +
        'Ingresa x para volver al menú principal');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const presta = new Prestamo(datos[0], datos[1]);
        prestamos.push(presta);
        presta.idPresta(prestamos);
        //Aclaro que lo comentado en el IF es una filtro que quise hacer pero no me sale o no me doy cuenta, si me pueden ayudar se los agradecería.
        if (presta.monto <= 200000 /*&& presta.meses != 12,24,36,48,60*/) {

            switch (presta.meses) {
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

                default:
                    alert('Cántidad de meses inválida, revisa y vuelve a ingresar');
                    break;
            }

            console.log(prestamos);

            let interes = presta.monto * porcentajeInteres;
            let total = presta.monto + interes;
            let pagoMensual = total / presta.meses;

            alert('El monto solicitado es:$ ' + presta.monto +
                '\nSu plazo: ' + presta.meses + ' Meses\nEl Total:$ ' + total.toFixed(2) +
                '\nPago Final:$ ' + pagoMensual.toFixed(2));

            let reIngreso = prompt('Desea realizar otro Préstamo?\n1)-Si\n2)-No');
            if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
                prestamo();
            }
        } else {
            alert('Monto superado, por favor vuelva a ingresarlo.');
            prestamo();
        }
    }
}

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
        cambios.push(cambio);
        cambio.idCambio(cambios);

        console.log(cambios);

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

            default:
                alert('Elegiste una opción inválida');
                break;
        }

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
        let reIngreso = prompt('Desea realizar otro Cambio?\n1)-Si\n2)-No');
        if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
            cambioDivisas();
        }
    }
}

function mostrarPlazoFijo(array) {
    let info = '';

    array.forEach(elemento => {
        info += 'Depósito: ' + elemento.deposito + '\nDuración: ' + elemento.duracion + '\n\n'
    });

    return info;
}

function mostrarPrestamos(array) {
    let info = '';

    array.forEach(elemento => {
        info += 'Monto: ' + elemento.monto + '\nMeses: ' + elemento.meses + '\n\n'
    });
    return info;
}

function mostrarCambios(array) {
    let arrayOrdenado = array.slice(0);
    let info = '';

    arrayOrdenado.forEach(elemento => {
        info += 'Moneda Inicial: ' + elemento.monedaInicial + '\nMonto: ' + elemento.monto + '\nMoneda Final: ' + elemento.monedaFinal + '\n\n'
    });
    return info;
}
//Finaliza Funciónes.

// Inicio del programa para pedir datos y unirlos al array
let opcion = prompt('BIENVENIDO A BANCO JS \nPor favor elije una opción(Solo Número):\n1_Plazo Fijo.\n2_Prestamos.\n3_Cambio de Divisas.\nPresioná x para finalizar.');

while (opcion.toUpperCase() != 'X') {

    switch (opcion) {

        case '1':
            plazoFijo();
            break;

        case '2':
            prestamo();
            break;

        case '3':
            cambioDivisas();
            break;

        default:
            alert('Elegiste una opción inválida, vuelva a porbar!');
            break;
    }
    opcion = prompt('Elegí una opción(Solo Número):\n1_Plazo Fijo.\n2_Prestamos.\n3_Cambio de Divisas.\nPresioná x para finalizar.');

}

// Validación y muestra si posee movimientos.
if (plazosFijos != 0 || prestamos != 0 || cambios != 0) {
    let opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');

    while (opcion != 2) {

        switch (opcion) {

            case '1':
                let criterio = prompt('Elegí el criterio deseado(Solo Número):\n1_Plazos Fijos \n2_Prestamos \n3_Cambios de Divisas');

                switch (criterio) {
                    case '1':
                        if (plazosFijos != 0) {
                            alert(mostrarPlazoFijo(plazosFijos));
                            break;
                        } else {
                            alert('No posee movimientos');
                        }
                        break;

                    case '2':
                        if (prestamos != 0) {
                            alert(mostrarPrestamos(prestamos));
                            break;
                        } else {
                            alert('No posee movimientos');
                        }
                        break;

                    case '3':
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

            case '2':
                break;

            default:
                alert('Elegiste una opción inválida, vuelva a porbar!');
                break;

        }
        opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');
    }
}
// Finaliza validación.

alert('Gracias por su visita, vuelva pronto!');

// Fin del programa. 