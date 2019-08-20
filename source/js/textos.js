// nombres y apellidos
const HOMBRE    = ["Arturo", "Takyo", "Lorenzo", "Neo", "Ambrosio", "Eulogio", "Amancio", "Aniceto", "Bartolo", "Calisto", "Ceferino", "Conrado", "Custodio", "Eliseo", "Feliciano", "Inocente", "Liberto", "Licerio", "Natalio", "Nemesio", "Niceto", "Perfecto", "Proto", "Sabas", "Tranquilino", "Agapito", "link", "Ganondorf", "Ganon"];
const MUJER     = ["Aria", "Lucrecia", "Xena", "Adelfa", "Áurea", "Bonifacia", "Demetria", "Eulogia", "Evarista", "Hermila", "Loreta", "Nicasia", "Petra", "Rufa", "Úrsula", "Inocencia", "Aminta", "Débora", "Elvira", "Elma", "Zelda", "Navi", "Zoila", "Yola", "Paca", "Rufina", "Tecla", "Kepa"];
const APELLIDOS = ["Penas", "Audaz", "Culpable", "Lázaro", "Vital", "Inocente", "Difícil", "Flores", "Campo", "Culasso", "Delano", "de Loyo", "Fuertes", "Día Rea", "Saludo", "Roto", "Bueno", "Siempre", "Deltodo", "Luz", "Luna", "Delgado", "Deotro", "Lelo", "Cuesta", "Caro", "Pinto", "Flores", "Flor", "Valle", "Coronado", "Gomia", "Ábaro", "Gracia"];

// sabores de las pizzas
const PIZZAS = { p: "piña", v: "verdura", t: "ternera", s: "salmón" };

// preguntas y respuestas
const FAQ = {
    like: {
        preg: ["¿Qué te gusta más?",
            "¿Qué pizza prefieres?"
        ],
        resp: (p) => {
            if (p) {
                return ["Me gusta mucho la pizza de " + PIZZAS[p],
                "Me chiflan las pizzas de " + PIZZAS[p],
                "Tengo pasión por la pizza de " + PIZZAS[p]];
            } else {
                return ["Me gustan todas por igual.",
                    "No sabria decirte"];
            }
        }
    },
    unlike: {
        preg: ["¿Hay algo que no te guste?",
            "¿Qué pizzas le tienes grima?",
            "¿Qué pizza no te gusta?",
            "¿Qué pizza odias?"
        ],
        resp: (p) => {
            if (p) {
                return ["Siempre he odiado la pizza de " + PIZZAS[p],
                "Odio las pizzas de " + PIZZAS[p],
                "Las pizzas de " + PIZZAS[p] + " son asquerosas"];
            } else {
                return ["Me gustan todas por igual.",
                    "No sabria decirte"];
            }
        }
    },
    first: {
        preg: ["¿Cuál fue tu primer trozo?",
            "¿Por cual empezaste?",
            "¿Te acuerdas de tu primer trozo?",
        ],
        resp: (p) => {
            return ["Empezé comiendome un trozo de " + PIZZAS[p],
            "Mi cena empezó con un trozo de " + PIZZAS[p],]
        }
    },
    last: {
        preg: ["¿Cuál fue tu último trozo?",
            "Echame el aliento",
        ],
        resp: (p) => {
            return ["Mi último trozo fue de " + PIZZAS[p],
            "Mi último trozo fue de " + PIZZAS[p] + ", ¡Estaba muy rico!"];
        }
    },
    howmany: {
        preg: ["¿Cuántos trozos te has comido de "],
        resp: function (p, trozos) {
            if (trozos == 0) {
                return ["No me he comido ningún trozo de " + PIZZAS[p]];
            } else if (trozos == 1) {
                return ["Me he comido 1 trozo de " + PIZZAS[p]];
            } else {
                return ["Me he comido " + trozos + " trozos de " + PIZZAS[p]];
            }
        }
    },
    guilty: {
        preg: ["¿Has sido tú?",
            "Te pillé!",
            "Te cazé gomia",
            "Mi instinto no falla y sé que fuiste tú"
        ],
        resp: (guilty) => {
            if (guilty)
                return ["Me hás pillado, tenía mucha hambre."];
            else
                return ["No he sido yo."];
        },
    },
    exceed: {
        preg: "",
        resp: ["Estoy cansado de responderte.", // cambiar segun genero
            "Paso de contarte más",
            "Me estás rallando, dejame en paz!"]
    },
    repite: {
        preg: "",
        resp: ["Te repites",
            "Eso ya me lo has preguntado",
            "Me acojo a la 5ª enmienda"]
    }
}

