// Google Analytics
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');

ga('create', 'UA-44449737-1', 'hackprinceton.com');
ga('send', 'pageview');


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