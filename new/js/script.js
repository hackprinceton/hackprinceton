$(".signup").click(function () {
    $('html, body').animate({
        scrollTop: $('#signup').offset().top
    }, 'slow');
});

$(".schedule").click(function () {
    $('html, body').animate({
        scrollTop: $('#schedule').offset().top
    }, 'slow');
});

$(".hire").click(function () {
    $('html, body').animate({
        scrollTop: $('#hire').offset().top
    }, 'slow');
});

$(".faq").click(function () {
    $('html, body').animate({
        scrollTop: $('#faq').offset().top
    }, 'slow');
});

$(".sponsor").click(function () {
    $('html, body').animate({
        scrollTop: $('#sponsor').offset().top
    }, 'slow');
});

$(document).ready(function () {
    $('.header').css({
        'position': 'relative',
        'background': 'url(img/bg' + Math.floor(Math.random() * 8) + '.jpg) no-repeat center center fixed',
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
});