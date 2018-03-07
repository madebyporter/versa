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
    $.fn.hScroll = function( options ){
       function scroll( obj, e )
       {
         var evt = e.originalEvent;
         var direction = evt.detail ? evt.detail * (-80) : evt.wheelDelta;

         if( direction > 0)
         {
            direction =  $(obj).scrollLeft() - 80;
         }
         else
         {
            direction = $(obj).scrollLeft() + 80;
         }

         $(obj).scrollLeft( direction );

         e.preventDefault();
       }

       $(this).width( $(this).find('div').width() );

       $(this).bind('DOMMouseScroll mousewheel', function( e )
       {
        scroll( this, e );
       });
    };
    $(document).ready(function(){
         $('.twig-links').hScroll();
    });
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
