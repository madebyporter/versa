//= require_tree .

var js = js || {},
  body = $('body'),
  doc = $(document),
  win = $(window);

js.main = {
  init: function () {
    this.linksExternal();
    // this.fbPixel();
    // this.waypointsMasthead();
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
  waypointsMasthead: function (){
    var waypoint = new Waypoint({
      element: document.getElementById('about'),
      handler: function(direction) {
        var masthead = document.getElementById("masthead");
        if (direction==='down'){
          masthead.classList.add('scrolled');
        }
        else if (direction==='up'){
          masthead.classList.remove('scrolled');
        }
      }
    });
  }
};

doc.ready(function () {
  js.main.init();
});

//= require_tree .
