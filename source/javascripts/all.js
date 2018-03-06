//= require_tree .

var js = js || {},
  body = $('body'),
  doc = $(document),
  win = $(window);

js.main = {
  init: function () {
    this.linksExternal();
    this.horiVertScroll();
    // this.fbPixel();
    // this.waypointsTwigs();
  },

  // Keep this shit in ABC Order

  fbPixel: function () {
    $( '.newsletter-submit' ).click(function() {
      fbq('track', 'Lead', {
        value: 10.00,
        currency: 'USD'
      });
    });
  },
  horiVertScroll: function () {
    var scroller = {};
    scroller.e = document.getElementById("twig");

    if (scroller.e.addEventListener) {
        scroller.e.addEventListener("mousewheel", MouseWheelHandler, false);
        scroller.e.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    } else scroller.e.attachEvent("onmousewheel", MouseWheelHandler);

    function MouseWheelHandler(e) {

        // cross-browser wheel delta
        var e = window.event || e;
        var delta = - 50 * (Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail))));

        var pst = $('#twig').scrollLeft() + delta;

        if (pst < 0) {
            pst = 0;
        } else if (pst > $('.img_holder').width()) {
            pst = $('.img_holder').width();
        }

        $('#twig').scrollLeft(pst);

        return false;
    }
  },
  linksExternal: function () {
    $.expr[':'].external = function (a) {
        var PATTERN_FOR_EXTERNAL_URLS = /^(\w+:)?\/\//;
        var href = $(a).attr('href');
        return href !== undefined && href.search(PATTERN_FOR_EXTERNAL_URLS) !== -1;
    };

    $.expr[':'].internal = function (a) {
        return $(a).attr('href') !== undefined && !$.expr[':'].external(a);
    };

    $('a:external').each(function() {
       var a = new RegExp('/' + window.location.host + '/');
       if(!a.test(this.href)) {
           $(this).click(function(event) {
               event.preventDefault();
               event.stopPropagation();
               window.open(this.href, '_blank');
           });
       }
    });
    $('.newWindow').click(function(){
      window.open($(this).attr('href')); return false;
    });
  },
  waypointsTwigs: function (){
    var waypoint = new Waypoint({
      element: document.getElementById('twig'),
      handler: function(direction) {
        var abs = document.getElementById("twig_abstract");
        if (direction==='left'){
          abs.classList.add('scrolled');
        }
        else if (direction==='right'){
          abs.classList.remove('scrolled');
        }
      }
    });
  }
};

doc.ready(function () {
  js.main.init();
});

//= require_tree .
