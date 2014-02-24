function scrollTo(button, destination) {
  $(button).click(function() {
    $('html, body').animate({
      scrollTop: $(destination).offset().top
    }, 'slow');
  });
}

scrollTo(".signup", "#signup");
scrollTo(".sponsor", "#sponsor");
scrollTo(".schedule", "#schedule");
scrollTo(".hire", "#hire");
scrollTo(".faq", "#faq");

$(document).ready(function () {
    $('.header').css({
        'position': 'relative',
        'background': 'url(img/bg/bg' + Math.floor(Math.random() * 8) + '.jpg) no-repeat center center fixed',
        'background-position': 'center',
        'background-size': 'cover',
        '-webkit-background-size': 'cover',
        '-moz-background-size': 'cover',
        '-o-background-size': 'cover',
        'text-align': 'center',
        'height': '100vh',
        'min-height': '600px',
        'max-height': '1500px'
    });

  $('#student').change(function () {
    if ($(this).val() == "mentor") {
      $('#mentor').slideDown('fast');
      $('#prince').slideUp('fast');
      $('#other').slideUp('fast');
    } else if ($(this).val() == "princeton") {
      $('#prince').slideDown('fast');
      $('#mentor').slideUp('fast');
      $('#other').slideUp('fast');
    } else if ($(this).val() == "school") {
      $('#other').slideDown('fast');
      $('#mentor').slideUp('fast');
      $('#prince').slideUp('fast');
    }
    else {
      $('#mentor').slideUp('fast');
      $('#other').slideUp('fast');
      $('#prince').slideUp('fast');

    }
  });
});