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

function plazoFijo() {
    // Pedir datos y guardarlos al Array
    let ingreso = prompt('Ingresar los datos solicitados separados por un(-): PJ 20000-35\nA)-Monto:$ (Solo números y mayor a $1000).' + '\n' +
        'B)-Días (Mínimo 30 días - Máximo 365 días).\nIngresa x para volver al menú principal.');

    if (ingreso.toUpperCase() != 'X') {

        let datos = ingreso.split('-');
        const plazo = new PlazoFijo(datos[0], datos[1]);

        let tna = 75 / 100;

        if (plazo.deposito >= 1000 && plazo.duracion >= '30') {

            let costoFinal = plazo.deposito * (1 + tna * (plazo.duracion / 365));
            let interes = costoFinal - plazo.deposito;

            alert('El plazo elegido es: ' + plazo.duracion + ' Días\nSu capital:$ ' + plazo.deposito +
                '\nIntereses:$ ' + interes.toFixed(2) +
                '\nMonto Total:$ ' + costoFinal.toFixed(2) +
                '\nTNA: ' + tna.toFixed(2) + '%');

            plazosFijos.push(plazo);
            plazo.idPlazo(plazosFijos);

            let reIngreso = prompt('Desea realizar otro Plazo?\n1)-Si\n2)-No');
            if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
                plazoFijo();
            }else{
                verificarMovimientosPlazo();
            }
        } else {
            alert('Uno de los valores es erroneo, por favor vuelva a ingresarlos.');
            plazoFijo();
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

function verificarMovimientosPlazo() {
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
        opcion = prompt('Desea ver sus movimientos?(Solo Número)\n1)_Si \n2)_No');
    }
    alert('Gracias por su visita, vuelva pronto!');
}

//Elementos que usaré del DOM
const btnPlazoFijo = document.getElementById('plazoFijo');

btnPlazoFijo.addEventListener('click', plazoFijo);