// maximo incluido
function rnd(min,max) { return Math.floor(Math.random() * (max - min+1) + min ); }

Array.prototype.rnd = function() {
    return this[Math.floor((Math.random()*this.length))];
}

Array.prototype.getRnd = function(nRnd){
    let list = this.sort(function(){ return Math.round(Math.random()) - 0.5; });
    return list.splice(0,nRnd);
};




/*
mejorar la cena de tal forma que vaya cogiendo un trozo disponible cada vez 
en vez de elegir pizza y coger trozos disponibles
asi se hacerca más a la realidad
otra forma más pro es que sea como la realidad, rnd(persona disponible) y rnd(trozo disponible)
 */
var cena = (function () {
    
    class Persona {

        // como parametro el objeto de trozos de pizza que se ha comido
        constructor(trPizzas) {
            this.genero   = rnd(0,1) ? 'h' : 'm';
            this.nombre   = this.generateName(this.genero);
            this.edad     = rnd(17,50);
            this.culpable = false;
            this.pizza    = trPizzas;
            let ordenAux  = [] ;

            // saca lo que mas le gusta , odia y prepara para el orden de comida
            this.encanta = [];
            this.odia    = [];
            for (let pz in this.pizza) {
                if (this.pizza[pz] == 0) {
                    this.odia.push(pz);
                } else {
                    for (let i = 0; i < this.pizza[pz] ; i++) {
                        ordenAux.push(pz);
                    }
                    if (this.pizza[pz] > 1) {
                        this.encanta.push(pz);
                    }
                }
            }
            // array donde está el orden que se va comiendo las pizzas
            this.orden = ordenAux.sort( () => {return Math.random() - 0.5});
            this.amigo = "";
            this.enemigo = "";
            this.nPreg = 4;
            this.howLimit = 1;
            this.preg = preguntas.map(a => Object.assign({}, a));
            this.preg[4] = preguntas[4].map(a => Object.assign({}, a));
            this.preg[5] = preguntas[5].map(a => Object.assign({}, a));
            this.seSabe = {
                pizza: {},
                pizzaDuda: {},
                orden: new Array(this.orden.length).fill(0),
                amigo: "",
                enemigo: "",
                encanta: [],
                odia: []
            }
            // this.hola();
        }

        capFirst(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }

        generateName(genero) {
            let hombre = ["Antonio","Jose","Manuel","Francisco","David","Juan","Jose","Javier","Daniel","Francisco","Jesus","Carlos","Alejandro","Miguel","Jose","Rafael","Pedro","Angel","Pablo","Fernando","Sergio","Luis","Jorge","Alberto","Alvaro","Diego","Adrian","Raul","Ivan","Enrique","Ruben","Ramon","Vicente","Oscar","Andres","Joaquin","Santiago","Eduardo","Victor","Mario","Roberto","Jaime","Ignacio","Marcos","Alfonso","Jordi","Salvador","Ricardo","Emilio","Hugo","Guillermo","Gabriel","Julian","Julio","Marc","Tomas","Gonzalo","Agustin","Mohamed","Felix","Nicolas","Joan","Martin","Ismael","Cristian","Samuel","Aitor","Josep","Hector","Mariano","Domingo","Alfredo","Sebastian","Iker","Cesar","Felipe","Alex","Lucas","Rodrigo","Gregorio","Xavier","Albert"];
            let mujer = ["Maria","Carmen","Josefa","Isabel","Laura","Teresa","Ana","Cristina","Marta","Antonia","Dolores","Lucia","Sara","Paula","Elena","Pilar","Concepcion","Raquel","Rosa","Manuela","Mercedes",,"Rosario","Beatriz","Juana","Teresa","Julia","Nuria","Silvia","Irene","Alba","Patricia","Montserrat","Andrea","Rosa","Rocio","Monica","Alicia","Angela","Sonia","Sandra","Marina","Susana","Yolanda","Natalia","Margarita","Eva","Inmaculada","Claudia",,"Ana Isabel","Esther","Noelia","Carla","Veronica","Sofia","Angeles","Carolina","Nerea","Eva","Amparo","Miriam","Lorena","Ines","Daniela","Catalina","Consuelo","Lidia","Celia","Alejandra","Olga","Emilia","Gloria","Luisa","Ainhoa","Aurora","Martina","Fatima"];
            let apellidos = ["Garcia","Gonzalez","Rodriguez","Fernandez","Lopez","Martinez","Sanchez","Perez","Gomez","Martin","Jimenez","Ruiz","Hernandez","Diaz","Moreno","Muñoz","Alvarez","Romero","Alonso","Gutierrez","Navarro","Torres","Dominguez","Vazquez","Ramos","Gil","Ramirez","Serrano","Blanco","Molina","Morales","Suarez","Ortega","Delgado","Castro","Ortiz","Rubio","Marin","Sanz","Nuñez","Iglesias","Medina","Garrido","Cortes","Castillo","Santos","Lozano","Guerrero","Cano","Prieto","Mendez","Cruz","Calvo","Gallego","Herrera","Marquez","Leon","Vidal","Peña","Flores","Cabrera","Campos","Vega","Fuentes","Carrasco","Diez","Reyes","Caballero","Nieto","Aguilar","Pascual","Santana","Herrero","Montero","Lorenzo","Hidalgo","Gimenez","Ibañez","Ferrer","Duran","Santiago","Benitez","Vargas","Mora","Vicente","Arias","Carmona","Crespo","Roman","Pastor","Soto","Saez","Velasco","Moya","Soler","Parra","Esteban","Bravo","Gallardo","Rojas"]
            let nombre;
            if (genero == 'h')
                nombre = this.capFirst(hombre[rnd(0, hombre.length -1)]);
            else if (genero == 'm')
                nombre = this.capFirst(mujer[rnd(0, mujer.length -1)]);
            else {
                if (rnd(0,2) == 1)
                    nombre = this.capFirst(hombre[rnd(0, hombre.length -1)]);
                else
                    nombre = this.capFirst(mujer[rnd(0, mujer.length -1)]);
            }
            
            nombre += ' '+this.capFirst(apellidos[rnd(0, apellidos.length -1)])+ ' ' + this.capFirst(apellidos[rnd(0, apellidos.length -1)]);    
            return nombre;
        }

        culpar() {
            return { msg: respuestas[6](this.culpable), _p:false  };
        }

        hablar(idPreg,subPreg) {
            if (this.nPreg > 0 && !this.preg[idPreg].usada && o.nPreg > 0) {
                this.nPreg--;
                o.nPreg--;
                this.preg[idPreg].usada = true;
                let p;
                switch(idPreg) {
                    case 0: // ¿Qué te gusta más? // return msg: "", _p:char
                        p = this.encanta.rnd();
                        if (this.seSabe.encanta.indexOf(p) == -1) {
                            Object.assign(this.seSabe.encanta, p);
                            this.seSabe.pizza[p] = {
                                tr  : 1,
                                duda: '>'
                            };
                        } 
                        return { msg: respuestas[0](p), _p:p }

                    case 1:  // ¿Hay algo que no te guste?" // return msg: "", _p:char
                        p = this.odia.rnd();
                        if (this.seSabe.odia.indexOf(p) == -1) {
                            Object.assign(this.seSabe.odia, p);
                            this.seSabe.pizza[p] = {
                                tr  : 0,
                                duda: false
                            };
                        } 
                        return { msg: respuestas[1](p), _p:p }

                    case 2:  // ¿Cuál fue tu primer trozo? // return msg: "", _p:char
                        p = this.orden[0];
                        this.seSabe.orden[0] = p;
                        if (typeof this.seSabe.pizza[p] === 'undefined') {
                            this.seSabe.pizza[p] = {
                                tr  : 1,
                                duda: '?'
                            };
                        } else {
                            if (this.seSabe.pizza[p].duda != '?') {
                                this.seSabe.pizza[p].duda = '?';
                            } else {
                                this.seSabe.pizza[p].tr += 1;
                            }
                        }
                        return { msg: respuestas[2](p), _p:p};

                    case 3: // Tu último trozo // return msg: "", p:char
                        p = this.orden[this.orden.length-1];
                        this.seSabe.orden[this.orden.length-1] = p;
                        if (typeof this.seSabe.pizza[p] === 'undefined') {
                            this.seSabe.pizza[p] = {
                                tr  : 1,
                                duda: '?'
                            };
                        } else {
                            if (this.seSabe.pizza[p].duda != '?') {
                                this.seSabe.pizza[p].duda = '?';
                            } else {
                                this.seSabe.pizza[p].tr += 1;
                            }
                        }
                        return { msg: respuestas[3](p), _p:p};
                    
                    case 4: // ¿Qué opinas de...? // --------> sin acabar
                        return { msg: respuestas[4]() }; 

                    case 5: // ¿Cuántos trozos te has comido de...? // return msg: "" 'tipTrozo': int
                            // USO: (5,X) X=letra de la pizza
                        if (this.howLimit != 0) {
                            this.preg[idPreg].usada = false;
                            let obj = { msg: respuestas[5](subPreg, this.pizza[subPreg]) };
                            this.seSabe.pizza[subPreg] = {
                                tr  : this.pizza[subPreg],
                                duda: false
                            };
                            obj[subPreg] = this.pizza[subPreg];
                            return obj;
                        } else {
                            return false;
                        }
                }
            } else {
                console.log("limite preguntas sobrepasado");
                return { msg: respuestas[7], _p:false  };;
            }
        }
            
        queSe() {
            return this.seSabe;
        }
    }

    let o = {};

    (function () { 
        o.nPreg = 13;
        o.m = {
            yo : { p:0, v:1, t:1, s:1 },
            pj1: { p:2, v:2, t:0, s:0 },
            pj2: { p:0, v:4, t:0, s:0 },
            pj3: { p:1, v:0, t:2, s:1 },
            pj4: { p:0, v:0, t:2, s:3 },
        }
        o.pjCulp = "pj"+rnd(1,4);

        // bucle que prueba muchas combinaciones hasta que da con una que cuadra
        for (let pasos = 0; pasos <= 1000; pasos++) {
            o.max = { p:5, v:5, t:5, s:5};
            
            for (let i = 1; i <= 4; i++) {
                o.max["pj"+i] = 4;
            }
            
            o.max[o.pjCulp] = 5;
            o.max.yo      = 3;

            for (let i = 1; i <= 5; i++) {
                let pj = (i == 5) ? "yo" : "pj"+i;
                o.m[pj].p = pizzaRnd(pj,"p");
                o.m[pj].v = pizzaRnd(pj,"v");
                o.m[pj].t = pizzaRnd(pj,"t");
                o.m[pj].s = pizzaRnd(pj,"s");
            }
            if ((o.max.p==0) && (o.max.v==0) && (o.max.t==0) && (o.max.s==0) && 
                (o.max.pj1==0) && (o.max.pj2==0) && (o.max.pj3==0) && (o.max.pj4==0) && (o.max.yo==0)) {
                break;
            }
         }
        
        // creacion de pjs
        o.yo  = new Persona(o.m.yo);
        o.pj1 = new Persona(o.m.pj1);
        o.pj2 = new Persona(o.m.pj2);
        o.pj3 = new Persona(o.m.pj3);
        o.pj4 = new Persona(o.m.pj4);

        // asiganicion de culpable
        o[o.pjCulp].culpable = true;

        // timeline
        o.tl = [];
        for (var tr = 0; tr <=4 ; tr++) {
            let trozos = [];
            for (var i = 1; i <= 5; i++) {
                let pj = (i == 5) ? "yo" : "pj"+i;
                if (typeof o[pj].orden[tr] !== 'undefined') {
                    trozos.push({
                        pj: pj,
                        tr: o[pj].orden[tr]
                    });
                }
            }
            trozos.sort( () => {return Math.random() - 0.5});
            o.tl = o.tl.concat(trozos);
        }
        //mas desordenado
        o.tl.sort( () => {return Math.random() - 0.5});

    })();

    function pizzaRnd(fila,col) { 
        let maximo = (o.max[fila] > o.max[col]) ? o.max[col] : o.max[fila];
        let dato = Math.floor(Math.random() * (maximo + 1));

        o.max[fila] = o.max[fila] - dato;
        o.max[col]  = o.max[col] - dato;

        return dato;
    }

    function stat(msg){
        console.log(msg);
    }

    return {
        stat: stat,
        m:    o.m,
        o:    o
    };
})();

var o = cena.o;
// o.pj1.orden =[ "p", "v", "v", "p" ];
// console.log(o.pj1.hablar(0));
// console.log(o.pj1.hablar(1));
// console.log(o.pj1.hablar(2));
// console.log(o.pj1.hablar(3));
// // console.log(o.pj1.hablar(3));
// // console.log(o.pj1.hablar(6));
// console.log(o.pj1.queSe());
// console.log(cena.o.pj1.orden);


