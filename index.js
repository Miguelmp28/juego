//variables
let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primerResultado = null;
let segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let tiempo = 30;
let tiempoInicial = 30;
let conteoRegresivo = null;

//apuntes html
let contarMovimientos = document.getElementById('movimientos');
let contarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//numeros aleatorios
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.5});
console.log(numeros);

// funcion
function contarTiempo(){ 
    conteoRegresivo = setInterval(()=>{
        tiempo--;
        mostrarTiempo.innerHTML = `Tiempo: ${tiempo} segundos`;
        if(tiempo == 0){
            clearInterval(conteoRegresivo);
            tarjetasBloqueadas();
        }
    },1000);
}

function tarjetasBloqueadas(){
    for (let i=0; i<=15; i++){
        let bloquearTarjeta = document.getElementById(i);
        bloquearTarjeta.innerHTML = numeros[i]
        bloquearTarjeta.disabled = true;
    }
}

//funcion principal
function destapar(id){

    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
    console.log(tarjetasDestapadas);

    if(tarjetasDestapadas ==1) {
        //mostrar 1er numero
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;

        //deshabilitar toque
        tarjeta1.disabled = true;
    } else if(tarjetasDestapadas ==2){
        //mostrar 2do numero
        tarjeta2 = document.getElementById(id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado

        //deshabilitar toque
        tarjeta2.disabled =true;

        //movimientos
        movimientos++;
        contarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //contador de tarjetas destapadas
            tarjetasDestapadas = 0;

            //aciertos
            aciertos++;
            contarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){;
                clearInterval(conteoRegresivo);
                contarAciertos.innerHTML = `Aciertos: ${aciertos}`;
                contarTiempo.innerHTML = `demoraste ${tiempoInicial - tiempo} segundos`;
                contarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
            }
        }else {
            // mostrar y tapar nuevamente
            setTimeout(()=>{
                tarjeta1.innerHTML = ' ';
                tarjeta2.innerHTML = ' ';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            },800);

        }
    }
}