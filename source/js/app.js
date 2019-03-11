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

    var c = cena.o;
    console.log(c);

    // rellena el card con los datos que se saben del pj
    $.fn.rellenar = function(pj) {
        $("#totalPreg").html("<b>"+c.nPreg+"</b>");
        this.find('.nPreg').html("<b>"+pj.nPreg+"</b>")
        this.find('.card-header > h6').html(pj.nombre);
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

        pj.seSabe.orden.forEach( function(tr, i, array) {
            let html = '';
            if (tr != 0) {
               html = pizzas[tr];
            } else  if (array[i-1] !== 0){
                html = '?'
            }
            comio.append($('<span>',{
                class           : 'badge badge-danger',
                html            : html,
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : pizzas[tr]
            }));
        });
        pj.seSabe.encanta.forEach( function(tr, i, array) {
            gusta.append($('<span>',{
                class: 'badge badge-danger',
                html : (tr != 0) ? pizzas[tr] : '?',
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : pizzas[tr]
            }));
        });
        pj.seSabe.odia.forEach( function(tr, i, array) {
            odia.append($('<span>',{
                class: 'badge badge-danger',
                html : (tr != 0) ? pizzas[tr] : '?',
                'data-toggle'   : 'tooltip',
                'data-placement': "top",
                title           : pizzas[tr]
            }));
        });

        let pz = pj.seSabe.pizza,
            p = pz['p'], 
            v = pz['v'], 
            t = pz['t'], 
            s = pz['s'];

        if (pz.hasOwnProperty('p')) {
            if (p.duda === false)
                pz01.text(p.tr);
            else if (p.duda === '?')
                    pz01.text(p.tr+'?');
            else
                pz01.text(p.duda+' '+pz['p'].tr);
        }
        if (pz.hasOwnProperty('t')) {
            if (t.duda === false)
                pz03.text(t.tr);
            else if (t.duda === '?')
                    pz03.text(t.tr+'?');
            else
                pz03.text(t.duda+' '+t.tr);
        }
        if (pz.hasOwnProperty('v')) {
           if (v.duda === false)
                pz02.text(v.tr);
            else if (v.duda === '?')
                pz02.text(v.tr+'?');
            else
                pz02.text(v.duda+' '+v.tr);
        }
        if (pz.hasOwnProperty('s')) {
            if (s.duda === false)
                pz04.text(s.tr);
            else if (s.duda === '?')
                pz04.text(s.tr+'?');
            else
                pz04.text(s.duda+' '+s.tr);
        }

        return this;
    }

    // abre cierra chat
    $.fn.toggleChat = function() {
        this.find('.chat-panel').toggleClass('chat-panel-open');
        this.find('.imgCard').toggleClass('imgCardCircle');
        this.find('.card-header').toggleClass('cardHeaderCircle');
        if (altura === false) {
            altura = $('.imgCard:first').outerHeight();
        }
        this.find('.hueco').css('height', altura);
    }

    // rellenado de datos
    $("#totalPreg").html("<b>"+c.nPreg+"</b>");

    for (let pz in yo.pizza) {
        if (yo.pizza[pz] != 0) {
            yoPanel.append($('<li>',{
                class : 'list-group-item',
                html  : pizzas[pz].charAt(0).toUpperCase() + pizzas[pz].slice(1) +
                        ' <span class="badge badge-danger">'+yo.pizza[pz]+'</span>',
            }));
        }
    }

    c1.rellenar(pj1);
    c2.rellenar(pj2);
    c3.rellenar(pj3);
    c4.rellenar(pj4);

    // boton del chat
    $(".btnChat").click(function () {
        let card = $(this).closest('.card');
        card.toggleChat();
    });

    // preguntas
    $(".preg").click(function() {
        let preg = this.dataset.preg,
            resp = false;
            card = $(this).closest('.card')
         var pj   = card[0].dataset.pj;

        if (preg === 'like') {
            resp = c[pj].hablar(0);
        } else if (preg === 'unlike') {
            resp = c[pj].hablar(1);
        } else if (preg === 'first') {
            resp = c[pj].hablar(2);
        } else if (preg === 'last') {
            resp = c[pj].hablar(3);
        } else if (preg === 'howmany01') {
            resp = c[pj].hablar(5,'p');
        } else if (preg === 'howmany02') {
            resp = c[pj].hablar(5,'v');
        } else if (preg === 'howmany03') {
            resp = c[pj].hablar(5,'t');
        } else if (preg === 'howmany04') {
            resp = c[pj].hablar(5,'s');
        } else if (preg === 'guilty') {
            resp = c[pj].hablar(6);
        }
        if (resp !== false) {
            card.rellenar(c[pj]);
            card.toggleChat();
        }
        console.log(card);
        console.log(pj,resp);
    });
    
    // imagenes aleatorias
    (function ()  { 

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

        let h = [ 
            "h01.png", "h02.png", "h03.png",
            "h04.png", "h05.png", "h06.png",
            "h07.png", "h08.png", "h09.png",
            "h10.png",
        ];
        let m = [ 
            "m01.png", "m02.png", "m03.png",
            "m04.png", "m05.png", "m06.png",
            "m07.png", "m08.png", "m09.png",
            "m10.png",
        ];
        let imgs = 'source/img/';
        c1.find('img').attr('src', imgs+h.rndRemove());
        c2.find('img').attr('src', imgs+h.rndRemove());
        c3.find('img').attr('src', imgs+h.rndRemove());
        c4.find('img').attr('src', imgs+h.rndRemove());
    })();

});
