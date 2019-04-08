$(document).ready(function() {

    var altura = false;
    let yo  = cena.o.yo, 
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
    // console.log(c);

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
        gusta.html('');
        odia.html('');

        let pjSeSabe = (seSabe) ? pj :  pj.seSabe;
        

         pjSeSabe.orden.forEach( function(tr, i, array) {
            let html = '';
            if (tr != 0) {
               html = PIZZAS[tr];
            } else  if (array[i-1] !== 0){
                html = '?'
            }
            comio.append($('<span>',{
                class           : 'badge badge-danger',
                html            : html,
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : PIZZAS[tr]
            }));
        });
         pjSeSabe.encanta.forEach( function(tr, i, array) {
            gusta.append($('<span>',{
                class           : 'badge badge-danger',
                html            : (tr != 0) ? PIZZAS[tr] : '?',
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : PIZZAS[tr]
            }));
        });
         pjSeSabe.odia.forEach( function(tr, i, array) {
            odia.append($('<span>',{
                class           : 'badge badge-danger',
                html            : (tr != 0) ? PIZZAS[tr] : '?',
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : PIZZAS[tr]
            }));
        });

        let pz =  pjSeSabe.pizza,
            p = pz['p'], 
            v = pz['v'], 
            t = pz['t'], 
            s = pz['s'];

        // TAREA: mejorable esta parte
        if (pz.hasOwnProperty('p')) {
            if (p.hasOwnProperty('duda')) {
                if (p.duda === false)
                    pz01.text(p.tr);
                else if (p.duda === '?')
                    pz01.text(p.tr+'?');
                else
                    pz01.text(p.duda+' '+pz['p'].tr);
            } else {
                pz01.text(p);
            }
        }
        if (pz.hasOwnProperty('v')) {
            if (v.hasOwnProperty('duda')) {
                if (v.duda === false)
                    pz02.text(v.tr);
                else if (v.duda === '?')
                    pz02.text(v.tr+'?');
                else
                    pz02.text(v.duda+' '+v.tr);
             } else {
                pz02.text(v);
            }
        }
        if (pz.hasOwnProperty('t')) {
            if (t.hasOwnProperty('duda')) {
                if (t.duda === false)
                    pz03.text(t.tr);
                else if (t.duda === '?')
                        pz03.text(t.tr+'?');
                else
                    pz03.text(t.duda+' '+t.tr);
             } else {
                pz03.text(t);
            }
        }
        if (pz.hasOwnProperty('s')) {
            if (s.hasOwnProperty('duda')) {
                if (s.duda === false)
                    pz04.text(s.tr);
                else if (s.duda === '?')
                    pz04.text(s.tr+'?');
                else
                    pz04.text(s.duda+' '+s.tr);
            } else {
                pz04.text(s);
            }
        }

        return this;
    }

    // abre cierra chat
    $.fn.toggleChat = function() {

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
        this.find('.hueco').css('height', altura);
        $(".collapse").collapse('hide');
    }

    // rellenado de datos

    for (let pz in yo.pizza) {
        if (yo.pizza[pz] != 0) {
            yoPanel.append($('<li>',{
                class: 'list-group-item',
                html : PIZZAS[pz].charAt(0).toUpperCase() + PIZZAS[pz].slice(1) +
                       ' <span class="badge badge-danger">'+yo.pizza[pz]+'</span>',
            }));
        }
    }

    c1.rellenar(pj1,false);
    c2.rellenar(pj2,false);
    c3.rellenar(pj3,false);
    c4.rellenar(pj4,false);

    // boton del chat
    $(".btnChat").click(function () {
        let card = $(this).closest('.card');
        card.toggleChat();
    });

    // muestra la solucion de todos los pjs
    function solucionar() {
        let card = $(".card");

        card.addClass('bg-success');
        $('[data-pj="'+C.pjCulp+'"]').removeClass('bg-success')
                                     .addClass('bg-danger');

        c1.rellenar(pj1,true);
        c2.rellenar(pj2,true);
        c3.rellenar(pj3,true);
        c4.rellenar(pj4,true);

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
        c1.find('img').attr('src', imgs+g[pj1.genero].rndRemove());
        c2.find('img').attr('src', imgs+g[pj2.genero].rndRemove());
        c3.find('img').attr('src', imgs+g[pj3.genero].rndRemove());
        c4.find('img').attr('src', imgs+g[pj4.genero].rndRemove());
    })();

    // carga de preguntas
    (function ()  { 
        
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
                        fa+PIZZAS[pz].charAt(0).toUpperCase()+PIZZAS[pz].slice(1)+'</a></li>';
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

            // click preguntas
            menu.on('click', '.preg', function() {

                let tPreg = this.dataset.preg,
                    card  = $(this).closest('.card'),
                    pj    = card[0].dataset.pj,
                    a     = this;
                    fa    = a.childNodes[0];
                
                if (tPreg === 'howmany') {

                    a.classList.toggle('text-white');
                    fa.classList.toggle('rotar315');

                } else {

                    let preg  = this.textContent,
                        resp  = C[pj].hablar(tPreg);

                    if (tPreg === 'guilty') {
                        solucionar();
                    } else if (resp._p !== false) {
                        card.rellenar(C[pj]);
                    }

                    card.find('.chat-log')
                        .append('<li class="msg-yo"><span class="msg-txt">'+preg+'</span></li>'+
                                '<li class="msg-el"><span class="msg-txt">'+resp.msg+'</span></li>');

                    let chatCont = card.find('.chat-container');
                    chatCont.prop('scrollTop',chatCont.prop('scrollHeight'));

                    card.toggleChat();

                    setTimeout( function() {
                        let nav = a.parentNode;
                        a.classList.add("disabled");
                        fa.classList.add("fas","fa-check-circle");
                        fa.classList.remove("far","fa-circle");

                        if (C[pj].nPreg == 0) {
                            nav = $(a).closest('.menuChat');
                                nav.addClass('limite')
                        } else if (C[pj].howLimit == 0) {
                            let ul = a.parentNode.parentNode;
                            ul.classList.add('limite');
                            ul.previousSibling.classList.add('limite');
                        }
                    }, 400);
                    
                } 
            });
            
            
        }

        c1.createMenu(pj1);
        // c2.createMenu(pj2);
        // c3.createMenu(pj3);
        // c4.createMenu(pj4);


        /*c1.find('.chat-panel nav ul').append($('<li>',{
                "data-preg": 'asd',
                class      : 'preg list-group-item list-group-item-dark',
                html       :  'ok funciona',
            }));*/
    })();
});