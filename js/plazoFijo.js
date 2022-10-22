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
    let ingresoCapital = document.getElementById('capitalAInvertir').value;
    let plazoCapital = document.getElementById('txtPlazoEnDias').value;

    if (ingresoCapital >= 1000 && plazoCapital >= '30' && plazoCapital <= '365') {
        let datos = [
            ingresoCapital,
            plazoCapital
        ];
        const plazo = new PlazoFijo(datos[0], datos[1]);

        plazosFijos.push(plazo);
        plazo.idPlazo(plazosFijos);

        let reIngreso = prompt('Desea realizar otro Plazo?\n1)-Si\n2)-No');
        if (reIngreso == 1 || reIngreso.toUpperCase() == 'SI') {
            limpiarCampos();
            plazoFijo();
        } else {
            alerta(plazosFijos, contenedorAlerta);
            //mostrarMovimientos();
            //verificarMovimientosPlazo();
        }
     } else {
         alert('Uno de los valores es erroneo, por favor vuelva a ingresarlos.');
         limpiarCampos();
     }

}

function limpiarCampos(){
    let elementos = document.getElementsByTagName('input');
    for (let i = 0; i < elementos.length; i++) {
        elementos[i].value='';          
      }
}

function mostrarPlazoFijo(array) {
    let info = '';

    array.forEach(elemento => {
        info += 'Depósito: ' + elemento.deposito + '\nDuración: ' + elemento.duracion + '\n\n'
    });

    return info;
}

function mostrarMovimientos(){
    var formulario = document.getElementById('resultadosCalculo');
    formulario.style.display = 'block';
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
    }
    alert('Gracias por su visita, vuelva pronto!');
}

function alerta(array, contenedor) {
    contenedor.innerHTML = '';
    for (const item of array) {
        let tna = 75 / 100;
        let costoFinal = item.deposito * (1 + tna * (item.duracion / 365));
        let interes = costoFinal - item.deposito;
        let tarjeta = document.createElement('div');
        tarjeta.className = 'alert alert-success';
        tarjeta.role = 'alert',
        tarjeta.innerHTML = `
        <h4 class="alert-heading">Tus Movimeintos</h4>
            <p>El plazo elegido es:$ ${item.duracion} días</p>
            <p>Su capital: ${item.deposito}</p>
            <p>Su capital:$ ${interes.toFixed(2)}</p>
            <p>Monto Total:$ ${costoFinal.toFixed(2)}</p>
            <p>TNA: ${tna.toFixed(2)}</p>
            <hr>`;
        contenedor.append(tarjeta)
    }

}
//Elementos que usaré del DOM
const btnPlazoFijo = document.getElementById('calcular');
btnPlazoFijo.addEventListener('click', plazoFijo);
let contenedorAlerta = document.querySelector('.alertas');