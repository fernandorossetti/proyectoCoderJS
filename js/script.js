// Comenzando las Clases
class PlazoFijo {
    constructor(deposito, duracion, id) {
        this.deposito = parseFloat(deposito);
        this.duracion = parseInt(duracion);
        this.id = id;
    }

    asignarId(array) {
        this.id = array.length;
    }
}
class Prestamo {
    constructor(monto, id) {
        this.monto = parseInt(monto);
        this.id = id;
    }

    asignarId(array) {
        this.id = array.length;
    }
}
// Fin Clase

// Inicio Constructores
const plazosFijos = [

]
const prestamos = [

]
// Fin Constructor

//Función para ejecutar el plazo fijo.
function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-):\n1)_Monto (Solo números y mayor a $1000) - Días (Mínimo 30 días - Máximo 365 días). \n2)_Ingresa x para volver al menú principal.');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const plazo = new PlazoFijo(datos[0], datos[1]);
        plazosFijos.push(plazo);
        plazo.asignarId(plazosFijos);

        let tna = 75 / 100;

        if (plazo.deposito >= 1000) {
            if (plazo.duracion >= '30') {

                let costoFinal = plazo.deposito * (1 + tna * (plazo.duracion / 365));
                let interes = costoFinal - plazo.deposito;

                console.log(plazosFijos);

                alert('El plazo elegido es: ' + plazo.duracion + ' Días\nSu capital:$ ' + plazo.deposito +
                    '\nIntereses:$ ' + interes.toFixed(2) +
                    '\nMonto Total:$ ' + costoFinal.toFixed(2) +
                    '\nTNA: ' + tna.toFixed(2) + '%');
            } else {
                alert('Ingrese un valor de días mayor a 30');
            }
        } else {
            alert('Ingrese valor mayor a $1000.');
        }
    }

}
// Finaliza Función Plazo Fijo.

//Función para ejecutar el prestamo.
function prestamo() {
    let porcentajeInteres = parseFloat();
    let meses = parseInt();
    let monto = prompt('Ingrese el monto(Maximo $200.000):$ ');

    const presta = new Prestamo(monto[0]);
    prestamos.push(presta);
    presta.asignarId(prestamos);

    if (presta.monto <= 200000) {

        let plazo = prompt('Por favor elije una plazo: \n1- 12 Meses. \n2- 24 Meses. \n3- 36 Meses \n4- 48 Meses \n5- 60 Meses.');

        switch (plazo) {
            case '1':
                porcentajeInteres = 0.25;
                meses = 12;
                break;

            case '2':
                porcentajeInteres = 0.40;
                meses = 24;
                break;

            case '3':
                porcentajeInteres = 0.55;
                meses = 36;
                break;

            case '4':
                porcentajeInteres = 0.70;
                meses = 48;
                break;

            case '5':
                porcentajeInteres = 0.80;
                meses = 60;
                break;

            default:
                alert('Elegiste una opción inválida');
                break;
        }

        let interes = presta.monto * porcentajeInteres;
        let total = presta.monto + interes;
        let pagoMensual = total / meses;

        alert('El monto solicitado es:$ ' + presta.monto +
            '\nSu plazo: ' + meses + ' Meses\nEl Total:$ ' + total.toFixed(2) +
            '\nPago Final:$ ' + pagoMensual.toFixed(2));
    } else {
        alert('Supero el monto máximo, vuelva a ingresar!');
    }
}
// Finaliza Función Prestamo.

// Función Cambio de Divisas.
function cambioDivisas() {
    // Tipos de Operaciónes.
    let montoFinal = parseInt();
    let dolarCompra = 278;
    let dolarVenta = 282;
    let euroCompra = 283;
    let euroVenta = 287;
    let realCompra = 65;
    let realVenta = 71;

    let monedas = prompt('Por favor ingrese el tipo de Moneda con la que desea operar: \n1_ Pesos. \n2_ Dolar. \n3_ Euro. \n4_ Real. ');
    let monto = parseInt(prompt('Ingrese el monto $:'));
    let tipoConversion = prompt('Que moneda desea?. \n1_ Pesos. \n2_ Dolar. \n3_ Euro. \n4_ Real. ');

    switch (monedas) {
        case '1':
            switch (tipoConversion) {
                case '1':
                    montoFinal = monto;
                    break;
                case '2':
                    montoFinal = monto / dolarVenta;
                    break;
                case '3':
                    montoFinal = monto / euroVenta;
                    break;
                case '4':
                    montoFinal = monto / realVenta;
                    break;
            }
            break;

        case '2':
            switch (tipoConversion) {
                case '1':
                    montoFinal = monto * dolarCompra;
                    break;
                case '2':
                    montoFinal = monto;
                    break;
                case '3':
                    montoFinal = monto * (euroCompra / dolarCompra);
                    break;
                case '4':
                    montoFinal = monto * (realCompra / dolarCompra);
                    break;
            }
            break;

        case '3':
            switch (tipoConversion) {
                case '1':
                    montoFinal = monto * euroCompra;
                    break;
                case '2':
                    montoFinal = monto * (euroCompra / dolarVenta);
                    break;
                case '3':
                    montoFinal = monto;
                    break;
                case '4':
                    montoFinal = monto * (euroCompra / realVenta);
                    break;
            }
            break;

        case '4':
            switch (tipoConversion) {
                case '1':
                    montoFinal = monto * realCompra;
                    break;
                case '2':
                    montoFinal = monto * (realCompra / dolarVenta);
                    break;
                case '3':
                    montoFinal = monto * (realCompra / euroVenta);
                    break;
                case '4':
                    montoFinal = monto;
                    break;
            }
            break;

        default:
            alert('Elegiste una opción inválida');
            break;
    }

    switch (tipoConversion) {
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