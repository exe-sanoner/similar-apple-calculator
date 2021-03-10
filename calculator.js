// VARIABLES

// La sumatoria TOTAL
let runningTotal = 0;
// Esperando lo que tipea el usuario y guardandolo
// Es un STRING porque lo que tipea el usuario es un STRING (luego lo convierto)
let buffer = "0";
// Lo que el usuario regristro PREVIAMENTE antes de presionar algun operador
// Ej: Tipeo 15 + 17 (necesito registrar el numero 15 antes)
let previousOperator = null;    // Nada es asignado aun
// Para que el buffer se agregue al tipear 
const screen = document.querySelector('.screen');

// EVENT LISTENERS

document.querySelector('.calc-buttons').addEventListener("click", function(event) {
    // console.log("lalala");       --->   USAR PARA PROBAR SI FUNCIONA!!! 
    // console.log(event.target.value);  ----->   NO ME ARROJA VALOR!!!
    // console.log(event.target); ---->   ME TRAE LA CLASE DONDE SE ORIGINO
    // console.log(event.target.innerText);   ----> ESTE ES EL QUE VA!!!
    buttonClick(event.target.innerText);
});

// FUNCIONES

// buttonClick toma algun tipo de valor VALUE
// Si tomo un numero ó un simbolo, voy por otra ruta distinta
// Es el valor un NUMERO o no ???  -- FUNCION is NaN (IS NO A NUMBER??)
// Si no es un numero -> Entonces es un simbolo
// handle (encargarse de)

function buttonClick(value) {
    if (isNaN(parseInt(value))) {
        handleSymbol(value);        // "manipular Simbolo"
    } else {
        handleNumber(value);        // "manipular Numero"
    }
    rerender();  // para que aparezca el BUFFER tipeado en pantalla
}

function handleNumber(value) {
    if (buffer === "0") {
        buffer = value;
    } else {
        buffer += value;     // el =+ es porque si toca el 5 se guarda en BUFFER, si despues toca el 7 se le suma a lo ultimo y queda 57
    }
}

// SWITCH STATEMENT
// Se usa en vez de poner if esto, then esto, if esto, else else else
// Lo uso para cambiar diferentes bloques de codigo segun VALUE
// Se lee:  Si es igual a 'C' entonces haz esto.. Si es igual a '=', haz esto otro
function handleSymbol(value) {
    switch(value) {
        case 'C':
            buffer = "0";
            runningTotal = 0;
            previousOperator = null;
            break;             //  Es el ultimo del caso, se pone siempre
        case "=":
            if (previousOperator === null) {
                return;                         // Aun no tengo valor, sigue de largo
            } else {
            flushOperation(parseInt(buffer));  // De lo contrario, haras esta funcion lo que significará que tengo algún tipo de operador anterior, quiero que lo hagas ahora. Convierto el buffer en un numero con el parseInt y lo paso al flushOepration
            previousOperator = null;
            buffer = "" + runningTotal;  // seguimos ofreciendo un STRING todo el tiempo
            runningTotal = 0;
            }
            break;
        case "←":
            if (buffer.length === 1) {
                buffer = "0";            // entonces si esta el 5, al tocar flecha vuelvo a 0 (0 es el length 1)
            } else {
                buffer = buffer.substring(0, buffer.length-1);  // le quito 1
            }
            break;
            // vamos a DEFAULT, que es lo que quiere que haga por defecto si ninguno de estos otros casos coincide, lo que significa que es algún tipo de operador
        default:
            handleMath(value);       // funcion para los OPERADORES
            break;
    }
}

function handleMath(value) {
    const intBuffer = parseInt(buffer);  // Represento lo que esta en la pantalla ahora
    if (runningTotal === 0) {
        runningTotal = intBuffer;
    } else {
        flushOperation(intBuffer);   // si alguien hace una operación matemática y escribe el 25 y luego el +, debería estar almacenando 25. Por eso lo guardo dentro de RUNNINGTOTAL
    }

    previousOperator = value;    // almaceno el nuevo valor aqui

    buffer = "0";  // Esta listo para el numero que viene, se pone en 0
}

function flushOperation(intBuffer) {
    // Puede hacerse con SWITCH STATEMENT tambien
    if(previousOperator === "+") {
        runningTotal += intBuffer;
    } else if(previousOperator === "-") {
        runningTotal -= intBuffer;
    } else if(previousOperator === "×") {
        runningTotal *= intBuffer;
    } else {
        runningTotal /= intBuffer;       // Si no es ninguno de los otros, es division
    }
}

// Necesito que BUFFER este escrito afuera en la calculadora: uso funcion RERENDER
function rerender() {
    screen.innerText = buffer;
}