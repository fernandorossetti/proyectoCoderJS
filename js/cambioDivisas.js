//Elementos que usaré del DOM
const monedaPrincipal = document.getElementById('moneda-uno');//monedaEl_one
const monedaSecundaria = document.getElementById('moneda-dos');//monedaEl_two
const cantidadUno = document.getElementById('cantidad-uno');//cantidadEl_one
const cantidadDos = document.getElementById('cantidad-dos');//cantidadEl_two
const cambio = document.getElementById('cambio');
const taza = document.getElementById('taza');


// Fetch Exchange Rate and Update the DOM
function calculate(){
    const moneda_one = monedaPrincipal.value;
    const moneda_two = monedaSecundaria.value;

   fetch(`https://api.exchangerate-api.com/v4/latest/${moneda_one}`)
   .then(res => res.json() )
   .then(data => {
       const taza = data.rates[moneda_two];
       
       cambio.innerText = `1 ${moneda_one} = ${taza} ${moneda_two}`;

       cantidadDos.value = (cantidadUno.value * taza).toFixed(2);

    } );
    
}

//Event listeners
monedaPrincipal.addEventListener('change', calculate);
cantidadUno.addEventListener('input', calculate);
monedaSecundaria.addEventListener('change', calculate);
cantidadDos.addEventListener('input', calculate);

taza.addEventListener('click', () =>{
    const temp = monedaPrincipal.value;
    monedaPrincipal.value = monedaSecundaria.value;
    monedaSecundaria.value = temp;
    calculate();
} );


calculate();