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

function prestamo() {
    let porcentajeInteres = parseFloat();

    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-): PJ 20000-12\nA)-Monto a solicitar(Maximo $200.000).\nB)-Cantidad de Meses(12-24-36-48-60).' + '\n' +
        'Ingresa x para volver al menú principal');

    if (ingreso.toUpperCase() != 'X') {
        let meses = [12, 24, 36, 48, 60];
        let datos = ingreso.split('-');
        const presta = new Prestamo(datos[0], datos[1]);
        //Aclaro que lo comentado en el IF es una filtro que lo pude hacer andar asi, de haber otra manera, que de seguro lo hay y no me doy cuenta, les agradecería la recomendación.
        if (presta.monto >= 200000 || presta.meses != meses[0] && presta.meses != meses[1] && presta.meses != meses[2] && presta.meses != meses[3] && presta.meses != meses[4]) {

            alert('Uno de los valores es erroneo, por favor vuelva a ingresarlo.');
            prestamo();
        } else {
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
            }

            let interes = presta.monto * porcentajeInteres;
            let total = presta.monto + interes;
            let pagoMensual = total / presta.meses;

            alert('El monto solicitado es:$ ' + presta.monto +
                '\nSu plazo: ' + presta.meses + ' Meses\nEl Total:$ ' + total.toFixed(2) +
                '\nPago Final:$ ' + pagoMensual.toFixed(2));

            prestamos.push(presta);
            presta.idPresta(prestamos);

            let reIngreso = prompt('Desea realizar otro Préstamo?\n1)-Si\n2)-No');
            if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
                prestamo();
            }else{
                verificarMovimientosPrestamo();
            }
        }
    }
}

function mostrarPrestamos(array) {
    let info = '';

    array.forEach(elemento => {
        info += 'Monto: ' + elemento.monto + '\nMeses: ' + elemento.meses + '\n\n'
    });
    return info;
}

function verificarMovimientosPrestamo() {
    if (prestamos != 0) {
        let opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');

        while (opcion != 2) {

            switch (opcion) {

                case '1':
                    if (prestamos != 0) {
                        alert(mostrarPrestamos(prestamos));
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
const btnPtrestamos = document.getElementById('prestamos');

btnPtrestamos.addEventListener('click', prestamo);