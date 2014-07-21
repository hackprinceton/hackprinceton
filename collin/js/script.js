var body = $('body');

var index = 0;

$('#menu li').click(function() {
  index = $(this).index();
  var offset = -(index * 110) + '%';
  body.css({ 'left': offset });
});

var lastPos = 0;
var triggered = false;
$(window).scroll(function() {
  if (!triggered) {
    triggered = true;
    
    var currPos = $(document).scrollLeft();
    
    if (lastPos < currPos && index < 3) {
      index++;
      var offset = -(index * 110) + '%';
      body.css({ 'left': offset });
      setTimeout(function() {
        triggered = false;
      }, 1000);
    } 
    else if (lastPos > currPos && index > 0) 
    {
      index--;
      var offset = -(index * 110) + '%';
      body.css({ 'left': offset });
      setTimeout(function() {
        triggered = false;
      }, 1000);
    }
    else {
      triggered = false;
    }
  }
});