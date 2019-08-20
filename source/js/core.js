// maximo incluido
function rnd(min,max) { return Math.floor(Math.random() * (max - min+1) + min ); }

Array.prototype.rnd = function() {
    return this[Math.floor((Math.random()*this.length))];
}

Array.prototype.getRnd = function(nRnd){
    let list = this.sort(function(){ return Math.round(Math.random()) - 0.5; });
    return list.splice(0,nRnd);
};

function fnCapital(str) {
    return str[0].toUpperCase() + str.slice(1);
}

class Faq {
    constructor(faq) {
        this.faq = {};
        for (let v in faq) {

            this.faq[v] = {
                usado: false,
                preg : faq[v].preg[Math.floor(Math.random()*faq[v].preg.length)],
                resp : (t,n) => {
                    const  r = faq[v].resp(t,n);
                    return r[Math.floor(Math.random()*r.length)];
                }
            }

            if (v == 'howmany') {
               this.faq[v].subPreg = PIZZAS;
            }
        }
        return this.faq;
    }
}

/*
TODO: mejorar la cena de tal forma que vaya cogiendo un trozo disponible cada vez
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
            this.nPreg = 4;
            this.howLimit = 2;
            this.faq = new Faq(FAQ);
            this.seSabe = {
                pizza: {},
                orden: new Array(this.orden.length).fill(0),
                encanta: [],
                odia: []
            }
        }

        generateName(genero) {

            let nombre;

            if (genero == 'h')
                nombre = fnCapital(HOMBRE[rnd(0, HOMBRE.length -1)]);
            else if (genero == 'm')
                nombre = fnCapital(MUJER[rnd(0, MUJER.length -1)]);
            else {
                if (rnd(0,2) == 1)
                    nombre = fnCapital(HOMBRE[rnd(0, HOMBRE.length -1)]);
                else
                    nombre = fnCapital(MUJER[rnd(0, MUJER.length -1)]);
            }

            if (nombre == 'Takyo')
                nombre = 'Takyo Best Developer';
            else
                nombre += ' '+fnCapital(APELLIDOS[rnd(0, APELLIDOS.length -1)])+ ' ' + fnCapital(APELLIDOS[rnd(0, APELLIDOS.length -1)]);

            return nombre;
        }

        culpar() {
            return { msg: this.faq['guilty'].resp(this.culpable), _p:false  };
        }

        hablar(idPreg,subPreg) {

            if (idPreg.charAt(0) == '_') {
                subPreg = idPreg.slice(1);
                idPreg = 'howmany';
            }

            let f = this.faq[idPreg],
                sabor;

            if (this.nPreg > 0 && !f.usado && o.nPreg > 0) {

                f.usado = true;
                this.nPreg--;
                o.nPreg--;

                switch(idPreg) {

                    case 'like': // return msg: "", _p:char

                        sabor = this.encanta.rnd();

                        if (this.seSabe.encanta.indexOf(sabor) == -1) {
                            Object.assign(this.seSabe.encanta, sabor);

                            if (!this.seSabe.pizza.hasOwnProperty(sabor) ||
                                (this.seSabe.pizza.hasOwnProperty(sabor) && !this.seSabe.pizza[sabor].duda)) {

                                this.seSabe.pizza[sabor] = {
                                    tr  : 1,
                                    duda: '>'
                                };
                            }
                        }

                        return { msg: f.resp(sabor), _p:sabor }

                    case 'unlike':  // return msg: "", _p:char

                        sabor = this.odia.rnd();

                        if (this.seSabe.odia.indexOf(sabor) == -1) {

                            Object.assign(this.seSabe.odia, sabor);
                            this.seSabe.pizza[sabor] = {
                                tr  : 0,
                                duda: true
                            };
                        }

                        return { msg: f.resp(sabor), _p:sabor }

                    case 'first':  // return msg: "", _p:char
                        sabor = this.orden[0];
                        this.seSabe.orden[0] = sabor;

                        if (!this.seSabe.pizza.hasOwnProperty(sabor)) {
                            this.seSabe.pizza[sabor] = {
                                tr  : 1,
                                duda: '?'
                            };
                        } else if (this.seSabe.pizza[sabor].duda !== true) {
                            if (this.seSabe.pizza[sabor].duda != '?') {
                                this.seSabe.pizza[sabor].duda = '?';
                            } else {
                                this.seSabe.pizza[sabor].tr += 1;
                            }
                        }

                        return { msg: f.resp(sabor), _p:sabor};

                    case 'last': // return msg: "", _p:char
                        sabor = this.orden[this.orden.length-1];
                        this.seSabe.orden[this.orden.length-1] = sabor;

                        if (!this.seSabe.pizza.hasOwnProperty(sabor)) {
                            this.seSabe.pizza[sabor] = {
                                tr  : 1,
                                duda: '?'
                            };
                        } else if (this.seSabe.pizza[sabor].duda !== true) {
                            if (this.seSabe.pizza[sabor].duda != '?') {
                                this.seSabe.pizza[sabor].duda = '?';
                            } else {
                                this.seSabe.pizza[sabor].tr += 1;
                            }
                        }

                        return { msg: f.resp(sabor), _p:sabor};

                    case 'howmany': // USO1: ('howmany',X) X=letra de la pizza
                                    // USO2: ('_X')
                                    // return msg: "" 'tipTrozo': int
                        if (this.howLimit > 0) {
                            this.howLimit--;
                            f.usado = false;
                            let obj = { msg: f.resp(subPreg, this.pizza[subPreg]) };
                            this.seSabe.pizza[subPreg] = {
                                tr  : this.pizza[subPreg],
                                duda: true
                            };
                            obj[subPreg] = this.pizza[subPreg];
                            return obj;
                        } else {
                            return false;
                        }
                    case 'guilty':{
                        this.nPreg++;
                        o.nPreg++;
                        return this.culpar();
                    }
                }
            } else {
                return { msg: f.resp(), _p:false  };;
            }
        }

        queSe() {
            return this.seSabe;
        }
    }

    let o = {};

    (function () {
        o.nPreg = 13; // numero de preguntas totales
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

setTimeout(function() {
    $('.hhh').addClass('hidden');
    setTimeout(function() {
        // $('.hhh').addClass('none');
    }, 1000);
}, 2000);