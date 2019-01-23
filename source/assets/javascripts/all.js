//= require_tree .

var js = js || {},
  body = $('body'),
  doc = $(document),
  win = $(window);

js.main = {
  init: function () {
    this.linksExternal();
    this.newTopic();
    this.tagTitle();
    this.mixpanel();
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
  linksExternal: function () {
    function externalLinks() {
      var anchors = document.querySelectorAll( 'a' );
      for( var i = 0; i < anchors.length; i++ ) {
        if ( anchors[i].hostname !== window.location.hostname ) {
            anchors[i].setAttribute( 'target', '_blank' );
        }
      }
    }
    externalLinks();
  },
  mixpanel: function () {
    mixpanel.track_links(".card-cta", "click card cta", {
        "referrer": document.referrer
    });
  },
  newTopic: function () {
    $("#topicSelect").change(function(){
      var id = $(this).find("option:selected").attr("id");

      switch (id){
        case "newTopic":
          $("#newTopicField").show();
          break;
        default:
          $("#newTopicField").hide();
      }
    });
  },
  tagTitle: function () {
    var h1 = $('h1').text();
    if(!$('body').hasClass('index')){
      document.title = "Versa - " + h1;
    }
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
