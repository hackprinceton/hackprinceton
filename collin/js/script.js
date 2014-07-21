var body = $('body');
$('#box1').click(function() {
  body.css({ 'left': '-110%' });
});
$('#box2').click(function() {
  body.css({ 'left': '-220%' });
});
$('#box3').click(function() {
  body.css({ 'left': '0%' });
});
$('#box4').click(function() {
  body.css({ 'left': '0%' });
});

$('#menu li').click(function() {
  var index = $(this).index();
  var offset = -(index * 110) + '%';
  body.css({ 'left': offset });
});
