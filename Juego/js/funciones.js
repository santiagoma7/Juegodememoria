let tarjetasDestapadas = 0;
let tarjeta1 = null;
let tarjeta2 = null;
let primeraEleccion = null;
let segundaEleccion = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;
let timer = 50;
let timerInicial = 50;
let tiempoRegresivoId = null;
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');
let numeros = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numeros = numeros.sort(() => Math.random() - 0.5);
console.log(numeros);

function contarTiempo() {
  tiempoRegresivoId = setInterval(() => {
    timer--;
    mostrarTiempo.innerHTML = `Tiempo: ${timer} segundos`;
    if (timer === 0) {
      clearInterval(tiempoRegresivoId);
      bloquearTarjetas();
    }
  }, 1000);
}

function bloquearTarjetas() {
  for (let i = 0; i <= 15; i++) {
    let tarjetaBloqueada = document.getElementById(i);
    tarjetaBloqueada.innerHTML = numeros[i];
    tarjetaBloqueada.disabled = true;
  }
}

function destapar(id) {
  if (temporizador === false) {
    contarTiempo();
    temporizador = true;
  }

  tarjetasDestapadas++;

  if (tarjetasDestapadas === 1) {
    tarjeta1 = document.getElementById(id);
    primeraEleccion = numeros[id];
    tarjeta1.innerHTML = `<img src="./img/${primeraEleccion}.png" alt="">`;
    tarjeta1.disabled = true;
  } else if (tarjetasDestapadas === 2) {
    tarjeta2 = document.getElementById(id);
    segundaEleccion = numeros[id];
    tarjeta2.innerHTML = `<img src="./img/${segundaEleccion}.png" alt="">`;
    tarjeta2.disabled = true;

    // CONTADOR MOVIMIENTOS
    movimientos++;
    mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

    if (primeraEleccion === segundaEleccion) {
      tarjetasDestapadas = 0;
      aciertos++;
      mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

      if (aciertos === 8) {
        clearInterval(tiempoRegresivoId);
        mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;
        mostrarTiempo.innerHTML = `Te tomó ${timerInicial - timer} segundos`;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;
      }
    } else {
      setTimeout(() => {
        tarjeta1.innerHTML = '';
        tarjeta2.innerHTML = '';
        tarjeta1.disabled = false;
        tarjeta2.disabled = false;
        tarjetasDestapadas = 0;
      }, 800);
    }
  }
}