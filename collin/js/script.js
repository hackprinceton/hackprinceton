var body = $('body');

var index = 0;

$('#menu li').click(function() {
  index = $(this).index();
  var offset = -(index * 110) + '%';
  body.css({ 'left': offset });
});

$('.box').scrollLeft(1);

var lastPos = 1;
var triggered = false;
$('.box').scroll(function(e) {
  e.stopPropagation();
  if (!triggered) {
    triggered = true;

    var currPos = $(this).scrollLeft();
    console.log(currPos);
    
    if (lastPos < currPos && index < 3) {
      index++;
      var offset = -(index * 110) + '%';
      body.css({ 'left': offset });
      $('.box').scrollLeft(1);
      setTimeout(function() {
        triggered = false;
      }, 1000);
    }
    else if (lastPos > currPos && index > 0)
    {
      index--;
      var offset = -(index * 110) + '%';
      body.css({ 'left': offset });
      $('.box').scrollLeft(1);
      setTimeout(function() {
        triggered = false;
      }, 1000);
    }
    else {
      triggered = false;
    }
  }
});
