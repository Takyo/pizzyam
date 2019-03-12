/**
 * pizzas y textos de las preguntas y respuestas
 */


const pizzas = { p:"piña", v:"verdura", t:"ternera", s:"salmón" };

function Pgt(txt) {
    this.text = txt;
    this.usada = false;
}

var preguntas = [
    new Pgt("¿Qué te gusta más?"),         // 0
    new Pgt("¿Hay algo que no te guste?"), // 1
    new Pgt("¿Cuál fue tu primer trozo?"), // 2
    new Pgt("Echame el aliento"),          // 3
    [   "¿Qué opinas de...?",              // 4
        new Pgt("PJ1"),                    // 4.0
        new Pgt("PJ2"),                    // 4.1
        new Pgt("PJ3"),                    // 4.2
        new Pgt("PJ4")                     // 4.3
    ],
    [   "¿Cuántos trozos te has comido de...?", // 5
        new Pgt("Piña"),                        // 5.0
        new Pgt("Verdura"),                     // 5.1
        new Pgt("Ternera"),                     // 5.2
        new Pgt("Salmón")                       // 5.3
    ],
    new Pgt("¿Has sido tú?"),              // 6
];

var respuestas = [
    (p) => { // 0
        if (p) {
            return "Me gusta mucho la pizza de " + pizzas[p];
            // Me chiflan las pizzas de 
        } else
            return "Me gustan todas por igual.";
    },
    (p) => { // 1 
        if (p) {
            return "Siempre he odiado la pizza de " + pizzas[p];
        } else {
            return "Todo me gusta.";
        }
    },
    (p) => { // 2 
        return "Empezé comiendome un trozo de " + pizzas[p];
    },
    (p) => { // 3 
        return "Mi último trozo fue de " + pizzas[p] + ", ¡Estaba muy rico!";
    },
    (p) => { // 4 
        return "";
    },
    (p, trozos) => { // 5 
        if (trozos == 0) {
            return "No me he comido ningún trozo de " + pizzas[p];
        } else if (trozos == 1) {
            return "Me he comido 1 trozo de " + pizzas[p];
        } else {
            return "Me he comido " + trozos + " trozos de " + pizzas[p];
        }            
    },
    (guilty) => { // 6 
        if (guilty)
            return "Me hás pillado, tenia mucha hambre.";
        else
            return "No he sido yo.";
    },
    // 7
    "Estoy cansado de responderte."

    
];


