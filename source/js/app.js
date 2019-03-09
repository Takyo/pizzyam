$(document).ready(function() {

    // var altura = $('.imgCard:first').outerHeight();
    var altura = 285
    let pj1 = cena.o.pj1,
        pj2 = cena.o.pj2,
        pj3 = cena.o.pj3,
        pj4 = cena.o.pj4;

    c1 = $("#c1");
    c2 = $("#c2");
    c3 = $("#c3");
    c4 = $("#c4");

    var c = cena.o;
    // console.log(c);
    // console.log(c.pj1.hablar(2));
    // console.log(c.pj1.hablar(3));
    // c.pj1.seSabe.orden[1] = 'p';
    // c.pj1.seSabe.orden[2] = 'p';
    // console.log(c.pj1.orden[2]);
    // console.log(pj1.culpable);
    // console.log(pj1.pizza);
    // console.log(pj1.orden);

    /**
     * rellena el card con los datos que se saben del pj
     */
    $.fn.rellenar = function(pj) {
        // console.log(pj.seSabe);
        this.find('.card-header > h6').html(pj.nombre);
        let comio = this.find('.list-group').find('.lComio'),
            gusta = this.find('.list-group').find('.lGusta'),
            odia  = this.find('.list-group').find('.lOdia'),
            pz01  = this.find('.list-group').find('.howmany01'),
            pz02  = this.find('.list-group').find('.howmany02'),
            pz03  = this.find('.list-group').find('.howmany03'),
            pz04  = this.find('.list-group').find('.howmany04');
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
    c1.rellenar(pj1);
    c2.rellenar(pj2);
    c3.rellenar(pj3);
    c4.rellenar(pj4);

    /**
     * boton del chat
     */
    $(".btnChat").click(function() {
        let card = $(this).closest('.card');
        card.find('.chat-panel').toggleClass('chat-panel-open');
        card.find('.imgCard').toggleClass('imgCardCircle');
        card.find('.card-header').toggleClass('cardHeaderCircle');
        card.find('.hueco').css('height', altura);
    });
    

    /**
     * preguntas
     */
    $(".preg").click(function() {
        let preg = this.dataset.preg;
        let card = $(this).closest('.card');
        var pj = card[0].dataset.pj;
        // console.log(preg);
        // console.log(card);
        // console.log(c['pj1']);
        if (preg === 'like') {
            console.log(c[pj].hablar(0));
        } else if (preg === 'unlike') {
            console.log(c[pj].hablar(1));
        } else if (preg === 'first') {
            console.log(c[pj].hablar(2));
        } else if (preg === 'last') {
            console.log(c[pj].hablar(3));
        } else if (preg === 'howmany01') {
            console.log(c[pj].hablar(5,'p'));
        } else if (preg === 'howmany02') {
            console.log(c[pj].hablar(5,'v'));
        } else if (preg === 'howmany03') {
            console.log(c[pj].hablar(5,'t'));
        } else if (preg === 'howmany04') {
            console.log(c[pj].hablar(5,'s'));
        } else if (preg === 'guilty') {
            console.log(c[pj].hablar(6));
        }
        card.rellenar(c[pj]);
    });
          
    // imagenes aleatorias
    (function ()  { 

        Array.prototype.rndRemove = function() {
            let rnd = this.rnd();
            console.log("rnd= ", rnd);
            for (var i = 0; i < this.length; i++) {
                console.log(this[i],rnd );
                if (this[i] == rnd) {
                    console.log("rompes ", this[i]);
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
