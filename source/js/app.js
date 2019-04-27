let pj = cena.o.pj1.seSabe;
let orden = cena.o.pj1.orden
console.log(cena.o.pj1.pizza);
console.log(cena.o.pj1.orden);


$(document).ready(function() {

    var altura = false;
    let ocupao = false,
        yo  = cena.o.yo, 
        pj1 = cena.o.pj1,
        pj2 = cena.o.pj2,
        pj3 = cena.o.pj3,
        pj4 = cena.o.pj4,
    
        yoPanel = $("#yoComi"),
        c1 = $("#c1"),
        c2 = $("#c2"),
        c3 = $("#c3"),
        c4 = $("#c4");

    const C = cena.o;
    // console.log(pj1.seSabe);


    /**
     * rellena el card con los datos que se saben del pj
     * @param  pj       Personaje
     * @param  seSabe   true/false si queremos que se muestre la solucion 
     *                  o lo que sabemos
     * TAREAS: mejorar para que sea un rellenado más dinamico y codigo más elegante
     */
    $.fn.rellenar = function(pj,seSabe) {
        $("#totalPreg").html("<b>"+C.nPreg+"</b>");
        this.find('.nPreg').html("<b>"+pj.nPreg+"</b>")
        this.find('.card-header > h6:first').html(pj.nombre);
        let comio = this.find('.lComio'),
            gusta = this.find('.lGusta'),
            odia  = this.find('.lOdia'),
            pz01  = this.find('.howmany01'),
            pz02  = this.find('.howmany02'),
            pz03  = this.find('.howmany03'),
            pz04  = this.find('.howmany04');
        comio.html('');

        let pjSeSabe = (seSabe) ? pj : pj.seSabe;

        if (pjSeSabe.orden.every((tr) => {return tr==0})) {
            comio.html($('<span>',{
                class: 'tr',
                html : '?'
            }));
        } else {
            let escribio = true;

            pjSeSabe.orden.forEach( function(tr, i, array) {
                let html;

                if (tr != 0) {
                    escribio = true;
                    comio.append($('<span>',{
                        class: 'tr',
                        html : fnCapital(PIZZAS[tr])
                    }));
                    if (i != array.length-1) {
                        comio.append($('<i>',{
                            class: 'fas fa-angle-double-right'
                        }));
                    }
                } else if(escribio) {
                    escribio = false;
                    html = '?';
                    comio.append($('<span>',{
                        class: 'tr',
                        html : '?'
                    }));
                    if (i != array.length-1) {
                        comio.append($('<i>',{
                            class: 'fas fa-angle-double-right'
                        }));
                    }
                } 
                
            });

            let last = comio.find(':last-child');
            if (last.is('i')) {
                last.remove();
            }
        }

        if (gusta.children().length == 0){
            pjSeSabe.encanta.forEach( function(tr, i, array) {
                gusta.append($('<span>',{
                    class: 'tr animated tada slow',
                    html : (tr != 0) ? fnCapital(PIZZAS[tr]) : '?'
                }));
            });
        }
        if (odia.children().length == 0){
            pjSeSabe.odia.forEach( function(tr, i, array) {
                odia.append($('<span>',{
                    class: 'tr animated tada slow',
                    html : (tr != 0) ? fnCapital(PIZZAS[tr]) : '?'
                }));
            });
        }


        let pz = pjSeSabe.pizza,
            p  = pz['p'], 
            v  = pz['v'], 
            t  = pz['t'], 
            s  = pz['s'];

        if (pz.hasOwnProperty('p')) {
            if (p.hasOwnProperty('duda')) {
                if (p.duda === true)
                    pz01.html('<div class="animated fadeIn">'+p.tr+'<div>');
                else if (p.duda === '?')
                    pz01.html('<div class="animated fadeIn">'+p.tr+'?'+'<div>');
                else
                    pz01.html('<div class="animated fadeIn">'+p.duda+' '+pz['p'].tr+'<div>');
            } else {
                pz01.html('<div class="animated fadeIn">'+p+'<div>');
            }
        }
        if (pz.hasOwnProperty('v')) {
            if (v.hasOwnProperty('duda')) {
                if (v.duda === true)
                    pz02.html('<div class="animated fadeIn">'+v.tr+'<div>');
                else if (v.duda === '?')
                    pz02.html('<div class="animated fadeIn">'+v.tr+'?'+'<div>');
                else
                    pz02.html('<div class="animated fadeIn">'+v.duda+' '+v.tr+'<div>');
             } else {
                pz02.html('<div class="animated fadeIn">'+v+'<div>');
            }
        }
        if (pz.hasOwnProperty('t')) {
            if (t.hasOwnProperty('duda')) {
                if (t.duda === true)
                    pz03.html('<div class="animated fadeIn">'+t.tr+'<div>');
                else if (t.duda === '?')
                        pz03.html('<div class="animated fadeIn">'+t.tr+'?'+'<div>');
                else
                    pz03.html('<div class="animated fadeIn">'+t.duda+' '+t.tr+'<div>');
             } else {
                pz03.html('<div class="animated fadeIn">'+t+'<div>');
            }
        }
        if (pz.hasOwnProperty('s')) {
            if (s.hasOwnProperty('duda')) {
                if (s.duda === true)
                    pz04.html('<div class="animated fadeIn">'+s.tr+'<div>');
                else if (s.duda === '?')
                    pz04.html('<div class="animated fadeIn">'+s.tr+'?'+'<div>');
                else
                    pz04.html('<div class="animated fadeIn">'+s.duda+' '+s.tr+'<div>');
            } else {
                pz04.html('<div class="animated fadeIn">'+s+'<div>');
            }
        }

        return this;
    }

    // abre o cierra el chat
    $.fn.toggleChat = function() {
        
        // cierra todos los chats abiertos
        let xaparAll = function() {
            let card = $('.card');
            card.find('.chat-panel').removeClass('chat-panel-open');
            card.find('.imgCard').removeClass('imgCardCircle');
            card.find('.card-header').removeClass('cardHeaderCircle');
            card.find('.preg').removeClass('text-white');
            card.find('i.rotar315').removeClass('rotar315');
        }

        let chatPanel  = this.find('.chat-panel'),
            imgCard    = this.find('.imgCard'),
            cardHeader = this.find('.card-header');

        // close | open
        if (chatPanel.hasClass('chat-panel-open')) {
            xaparAll();
            chatPanel.removeClass('chat-panel-open');
            imgCard.removeClass('imgCardCircle');
            cardHeader.removeClass('cardHeaderCircle');
        } else {
            xaparAll();
            chatPanel.addClass('chat-panel-open');
            imgCard.addClass('imgCardCircle');
            cardHeader.addClass('cardHeaderCircle');
        }

        if (altura === false) {
            altura = $('.imgCard:first').outerHeight();
        }

        this.find('.hueco,.chat-container').css('height', altura);
        $(".collapse").collapse('hide');
    }

    // rellenado de datos
    for (let pz in yo.pizza) {
        if (yo.pizza[pz] != 0) {
            yoPanel.append($('<li>',{
                class: 'list-group-item',
                html : fnCapital(PIZZAS[pz]) +
                       ' <span class="tr animated fadeIn slow">'+yo.pizza[pz]+'</span>',
            }));
        }
    }

    c1.rellenar(pj1,false);
    c2.rellenar(pj2,false);
    c3.rellenar(pj3,false);
    c4.rellenar(pj4,false);

    // boton del chat
    $(".btnChat").click(function () {
        if (ocupao) {
            this.parentNode.classList.add('animated','wobble');
            setTimeout( ()=> { this.parentNode.classList.remove('animated','wobble'); }, 800);
            return;
        }
        let card = $(this).closest('.card');
        card.toggleChat();
    });

    // muestra la solucion de todos los pjs
    function solucionar(pj) {
        let card = $(".card"),
            nombre = C[pj].nombre,
            header,
            msg;

        if (pj == C.pjCulp) {
            header = "Acertaste";
            msg = "<b>"+nombre+"</b> es el culpable";
        } else {
            header = "Error 418";
            msg = "<b>"+nombre+"</b> es inocente, el culpable es <b>"+C[C.pjCulp].nombre+"</b>"
            // $("#dialogoMsg").text('Fallaste ' + nombre + " es inocente \nfue "+C[C.pjCulp].nombre);
        }

        $("#dialogoHeader").html(header);
        $("#dialogoMsg").html(msg);
        $('#dialogo').modal('show').delay(1000).modal('hide');

        card.addClass('bg-success');
        $('[data-pj="'+C.pjCulp+'"]').removeClass('bg-success')
                                     .addClass('bg-danger');

        c1.rellenar(pj1,true);
        c2.rellenar(pj2,true);
        c3.rellenar(pj3,true);
        c4.rellenar(pj4,true);

        bloquearChat(true);
    }

    // bloquea todos las preguntas de los cards por completo o dejando solo el resolver
    function bloquearChat(fin) {
        let card = $(".card");

        card.find('.menuChat').addClass('limite');

        if (fin) {
            card.find('a[data-preg="guilty"]').addClass('limite disabled');
        }
    }

    // imagenes aleatorias
    (function () { 

        Array.prototype.rndRemove = function() {
            let rnd = this.rnd();
            for (var i = 0; i < this.length; i++) {
                if (this[i] == rnd) {
                    this.splice(i,1);
                    break;
                }
            }
            return rnd;
        }
        var fnRedmim = function() {
            let hueco = $(this).parent();

            hueco.parent().collapse('show');
            altura = this.height;
            hueco.css('height', altura);
            setTimeout(function(t) {
                altura = t.height;
                hueco.css('height', altura);

            }(this), 10);
        }; 

        let g = {
            h:[ "h01.png", "h02.png", "h03.png",
                "h04.png", "h05.png", "h06.png",
                "h07.png", "h08.png", "h09.png",
                "h10.png",
            ],
            m:[ "m01.png", "m02.png", "m03.png",
                "m04.png", "m05.png", "m06.png",
                "m07.png", "m08.png", "m09.png",
                "m10.png",
            ]
        };

        let imgs = 'source/img/';

        c1.find('img').attr('src', imgs+g[pj1.genero].rndRemove())
                      .on('load', fnRedmim);
        c2.find('img').attr('src', imgs+g[pj2.genero].rndRemove())
                      .on('load', fnRedmim);
        c3.find('img').attr('src', imgs+g[pj3.genero].rndRemove())
                      .on('load', fnRedmim);
        c4.find('img').attr('src', imgs+g[pj4.genero].rndRemove())
                      .on('load', fnRedmim);
    })();

    // carga de preguntas
    (function ()  { 
        
        // hace scroll al final del chatlog
        $.fn.endChat = function() {
            let chatCont = $(this).parent();
            chatCont.prop('scrollTop',chatCont.prop('scrollHeight'));
        }

        $.fn.createMenu = function(pj) {
            let faq = pj.faq,
                fa = '<i class="faIc far fa-circle"></i> ',
                faAdd = '<i class="faIc fas fa-plus-circle"></i> ',
                faGuilty = '<i class="faIc far fa-star"></i> ',
                html,_class,
                menu = this.find('.menuChat');

            for (let f in pj.faq) {
                if (f == 'howmany') {
                    let pj = $(this).closest('.card')[0].dataset.pj;
                    
                    html = '<a href="#sub_'+pj+'" data-preg="howmany" data-toggle="collapse" aria-expanded="false"'+
                               'class="preg nav-link">'+faAdd+faq[f].preg+'</a>'+
                           '<ul class="collapse list-unstyled" id="sub_'+pj+'">'; 

                    for (let pz in faq[f].subPreg) {
                        html += '<li><a class="preg nav-link py-1 pl-4" href="#" data-preg="_'+pz+'">'+
                        fa + fnCapital(PIZZAS[pz])+'?</a></li>';
                    }
                            
                    html += '</ul>';

                } else {
                    html = '<a data-preg="'+f+'" class="preg nav-link" href="#">'+fa+faq[f].preg+'</a>';
                }
            
                if (f != 'guilty' && f != 'exceed' && f != 'repite') {
                    menu.append(html);
                }
            }

            menu.append('<a data-preg="guilty" class="preg nav-link" href="#">'+
                        faGuilty+faq['guilty'].preg+'</a>');


            menu.on('click', '.preg', clickPreg);
        }

        // click preguntas
        let clickPreg = function() {

            let tPreg   = this.dataset.preg,
                card    = $(this).closest('.card'),
                chatLog = card.find('.chat-log'),
                pj      = card[0].dataset.pj,
                a       = this;
                fa      = a.childNodes[0];

            if (tPreg === 'howmany') {

                a.classList.toggle('text-white');
                fa.classList.toggle('rotar315');

            } else {

                let preg,
                    resp = C[pj].hablar(tPreg),
                    subPreg = (tPreg.charAt(0) == '_') ? true : false;

                if (subPreg) {
                    let p = this.textContent;
                    preg = a.parentNode.parentNode.previousSibling.textContent+' '+p;
                }
                else {
                    preg = this.textContent
                }

                let thinker = '<span class="thinker animated fadeIn"><div class="bounce1"></div><div class="bounce2"></div><div class="bounce3"></div></span>';

                chatLog.append('<li class="msg-yo"><span class="msg-txt animated bounceInLeft">'+preg+'</span></li>')
                .endChat();

                // animacion de "escribiendo" para que se retrase despues de "msg-yo"
                setTimeout(function() {
                    chatLog.append('<li class="msg-el">'+thinker+'<span class="msg-txt c-hidden">'+resp.msg+'</span></li>')
                    .endChat();
                },1000);

                ocupao = true;

                // let delay = rnd(2500,5000);
                let delay = 1200;

                // animacion de espera para escribir
                setTimeout(function() {
                    let el = card.find('.msg-el:last')[0],
                    thinker = el.childNodes[0],
                    msg = el.childNodes[1];

                    thinker.classList.add('c-hidden');
                    msg.classList.remove('c-hidden')
                    msg.classList.add('animated', 'bounceInRight');

                    if (tPreg === 'guilty') {
                        solucionar(pj);
                    } else if (resp._p !== false) {
                        card.rellenar(C[pj]);
                    }

                    chatLog.endChat();

                    ocupao = false;
                }, delay );

                
                card.toggleChat();

                setTimeout( function() {
                    let nav = a.parentNode;
                    
                    a.classList.add("disabled");
                    fa.classList.add("fas","fa-check-circle");
                    fa.classList.remove("far","fa-circle");
                    if (C.nPreg == 0) {
                        bloquearChat(false);
                    }
                    if (C[pj].nPreg == 0 ) {
                        nav = $(a).closest('.menuChat');
                        nav.addClass('limite');
                    } else if (subPreg && C[pj].howLimit == 0) {
                        let ul = a.parentNode.parentNode;
                        ul.classList.add('limite');
                        ul.previousSibling.classList.add('limite');
                    }

                }, 400);
            } 
        }
        c1.createMenu(pj1);
        c2.createMenu(pj2);
        c3.createMenu(pj3);
        c4.createMenu(pj4);

    })();


    /*function initCard(element,animation) {
        // const element =  document.getElementById(e);
        element.classList.add('bounceInLeft');
        // console.log("okokok");
    }*/
    // const element = document.querySelector('.my-element')
    // const element =  document.getElementClassName('card');
    // element.classList.add('bounceInLeft');

    
    // let c1 = document.getElementById('c1').
    // let ccc = document.querySelector('.card')
    /*let ccc = document.getElementsByClassName('card')


    for(let i=0; i < ccc.length; i++) { 
        // console.log("entra");

         hola('bounceInLeft', ccc[i], 1000)
            .then(function (aaa) {
              // console.log('funciona bien', aaa);
            })
        
    }
    async function hola(efect, element, delay) {
        // console.log('hola');
        // element.classList.add(efect);
        const promise =  new Promise(function (resolve, reject) {
                // setTimeout(function() {
                  // array.push(data)
                  resolve(element,delay)
                // }, 1000);
              });
        
        setTimeout(function() { console.log("aki"); 
        }, 0);

        // delay(delay)
        return  promise;
        // setTimeout(function() {}, 1000);
    }*/
    /*for(let i=0; i < ccc.length; i++) { 
        // hola()
    }*/
/*    let ccc1 = document.getElementsById('card').
            addEventListener('animationend', function() { 
                console.log("ccc1"); }
            )*/


            // console.log(ccc);

            /*const array = [1, 2, 3]
            hola('bounceInLeft', array).then(function () {
              console.log(array)
            })*/


});

/*
// const delay = ms => new Promise(res => setTimeout(res, ms))
const delay = function(ms) { new Promise(res => setTimeout(res, ms))}

const apiCall = function(url) {
    // fetch(url).then(function(res) {res.json()})
    new Promise( n => resolve('okmakey'));
}

async function infiniteApiCalls(url, ms) {
  // Request (Tiempo Aleatorio)
  const result = await apiCall(url)
  // Haz lo que sea con el resultado
  console.log(url)
  console.log(result)
  console.log(this);
  // ...
  // Esperar x segundos
  await delay(ms)
  
  // Request otra vez
  //infiniteApiCalls(url, ms)

  const fn = infiniteApiCalls.bind(null, url, ms)
  
  setTimeout(fn, 0)
}*/

// infiniteApiCalls('texto', 5000)


/*var promise = new Promise(function(resolve, reject) {
  
  function sayHello() {
    // resolve('Hello World!')
  }
  // console.log("por aqui");
  setTimeout(sayHello, 1000)

})*/

/*let testmio = new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve("¡Éxito!"); // ¡Todo salió bien!
    }, 1000);
    // reject("fracaso extrepitoso");
});

testmio.then((successMessage) => {
  // console.log("¡respuesta! " + successMessage);
});
*/
// console.log(promise.then(()=>{console.log("termino");}))
// delay(1000)

/*new Promise(function(resolve) {
  console.log('first');
  resolve();
  console.log('second');
}).then(function() {
  console.log('third');
});*/

