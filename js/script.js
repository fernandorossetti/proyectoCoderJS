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

//Función para ejecutar el plazo fijo.
function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-):\nMonto (Solo números y mayor a $1000) - Días (Mínimo 30 días - Máximo 365 días). \nIngresa x para volver al menú principal.');

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
            if (reIngreso == 1) {
                plazoFijo();
            }
        } else {
            alert('Uno de los valores es erroneo, por favor vuelva a ingresarlos.');
            plazoFijo();
        }
    }

}
// Finaliza Función Plazo Fijo.

//Función para ejecutar el prestamo.
function prestamo() {
    let porcentajeInteres = parseFloat();
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-):\nMonto a solicitar(Maximo $200.000) y Cantidad de Meses(12-24-36-48-60):$ \nIngresa x para volver al menú principal');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const presta = new Prestamo(datos[0], datos[1]);
        prestamos.push(presta);
        presta.idPresta(prestamos);

        if (presta.monto <= 200000 && presta.meses == 12 ) {

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
            if (reIngreso == 1) {
                prestamo();
            }
        } else {
            alert('Uno de los valores es erroneo, por favor vuelva a ingresarlos.');
            prestamo();
        }
    }
}
// Finaliza Función Prestamo.

// Función Cambio de Divisas.
function cambioDivisas() {
    // Tipos de Operaciónes.
    let montoFinal = parseInt();
    // let dolarCompra = 278;
    // let dolarVenta = 282;
    // let euroCompra = 283;
    // let euroVenta = 287;
    // let realCompra = 65;
    // let realVenta = 71;
    let monedas = [
        dolarCompra = 278,
        dolarVenta = 282,
        euroCompra = 283,
        euroVenta = 287,
        realCompra = 65,
        realVenta = 71
    ]

    let ingreso = prompt('Ingresar los datos solicitados separados por un(-):\nMoneda con la que desea operar:\n1_ Pesos. \n2_ Dolar. \n3_ Euro. \n4_ Real.\nIngrese el monto.\nQue moneda desea?. \n1_ Pesos. \n2_ Dolar. \n3_ Euro. \n4_ Real.\nIngresa x para volver al menú principal.');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const cambio = new CambioDivisas(datos[0], datos[1], datos[2]);
        cambios.push(cambio);
        cambio.idCambio(cambios);
    
    switch (cambio.monedaInicial) {
        case '1':
            switch (cambio.monedaFinal) {
                case '1':
                    montoFinal = cambio.monto;
                    break;
                case '2':
                    montoFinal = cambio.monto / monedas.dolarVenta;
                    break;
                case '3':
                    montoFinal = cambio.monto / monedas.euroVenta;
                    break;
                case '4':
                    montoFinal = cambio.monto / monedas.realVenta;
                    break;
            }
            break;

        case '2':
            switch (cambio.monedaFinal) {
                case '1':
                    montoFinal = cambio.monto * dolarCompra;
                    break;
                case '2':
                    montoFinal = cambio.monto;
                    break;
                case '3':
                    montoFinal = cambio.monto * (euroCompra / dolarCompra);
                    break;
                case '4':
                    montoFinal = cambio.monto * (realCompra / dolarCompra);
                    break;
            }
            break;

        case '3':
            switch (cambio.monedaFinal) {
                case '1':
                    montoFinal = cambio.monto * euroCompra;
                    break;
                case '2':
                    montoFinal = cambio.monto * (euroCompra / dolarVenta);
                    break;
                case '3':
                    montoFinal = cambio.monto;
                    break;
                case '4':
                    montoFinal = cambio.monto * (euroCompra / realVenta);
                    break;
            }
            break;

        case '4':
            switch (cambio.monedaFinal) {
                case '1':
                    montoFinal = cambio.monto * realCompra;
                    break;
                case '2':
                    montoFinal = cambio.monto * (realCompra / dolarVenta);
                    break;
                case '3':
                    montoFinal = cambio.monto * (realCompra / euroVenta);
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
}
}


let opcion = prompt('BIENVENIDO A BANCO JS \nPor favor elije una opción: \n1_ Plazo Fijo. \n2_ Prestamos. \n3_ Cambio de Divisas. \nPresioná x para finalizar.');

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
            alert('Elegiste una opción inválida');
            break;
    }
    opcion = prompt('Elegí una opción: \n1_ Plazo Fijo. \n2_ Prestamos. \n3_ Cambio de Divisas. \nPresioná x para finalizar.');

}

alert('Gracias por su visita, vuelva pronto!');