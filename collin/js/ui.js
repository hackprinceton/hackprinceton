/* Add CSS transitions to DOM element */
function addTransition(e) {
  var rule = "all 0.5s ease-out";
  e.style['transition'] = rule;
  e.style['-moz-transition'] = rule;
  e.style['-ms-transition'] = rule;
  e.style['-o-transition'] = rule;
  e.style['-webkit-transition'] = rule;
}

var swiped_in = false;
var locked = false;

/* Add or remove class to DOM element */
function toggleClass(element, className, body, lightbox) {
  var classes = element.className.split(/\s+/),
      length = classes.length;

  for(i = 0; i < length; i++) {
    if (classes[i] === className) {
      classes.splice(i, 1);
      break;
    }
  }
  // The className is not found
  if (length === classes.length) {
    classes.push(className);
    body.style.overflow = 'hidden';
    lightbox.style.display = 'block';
    swiped_in = true;
    setTimeout(function () {
      lightbox.style.opacity = '0.15';
    }, 50);
  }
  else {
    swiped_in = false;
    lightbox.style.opacity = '0';
    setTimeout(function () {
      body.style.overflow = 'visible';
      lightbox.style.display = 'none';
    }, 500);
  }

  element.className = classes.join(' ');
}

(function (window, document) {

    var layout   = document.getElementById('layout'),
        menu     = document.getElementById('menu'),
        menuLink = document.getElementById('menu-link'),
        lightbox = document.getElementById('lightbox'),
        body     = document.body;

    var menuCutoff = 767;
    var active = 'active';

    /* Add transitions for menu to push in and out, but wait for page to draw */
    document.addEventListener('DOMContentLoaded', function(e) {
      setTimeout(function() {
        addTransition(layout);
        addTransition(menu);
        addTransition(menuLink);
        addTransition(lightbox);
      }, 200);
    });

    menuLink.onclick = function () {
      if (body.clientWidth <= menuCutoff) {
        if (!locked) {
          locked = true;
          toggleClass(layout, active, body, lightbox);
          setTimeout(function () {
            locked = false;
          }, 500);
        }
      }
    };

    /* Function to simulate menu link button click */
    function swipe_in(intent) {
      if (swiped_in !== intent) {
        menuLink.onclick();
      }
    }

    var layout_swipe = new Hammer(layout);
    layout_swipe.on('swipe', function (e) {
      if (e.direction === Hammer.DIRECTION_LEFT) {
        swipe_in(false);
      }
      else if (e.direction === Hammer.DIRECTION_RIGHT) {
        swipe_in(true);
      }
    });

    window.onresize = function () {
      if (body.clientWidth > menuCutoff) {
        var classes = layout.className.split(/\s+/),
            length = classes.length;

        for(i = 0; i < length; i++) {
          if (classes[i] === active) {
            classes.splice(i, 1);
            break;
          }
        }
        layout.className = classes.join(' ');
        swiped_in = false;
        lightbox.style.opacity = '0';
        setTimeout(function() {
          lightbox.style.display = 'none';
          body.style.overflow = 'visible';
        }, 500);
      }
    };

    lightbox.onclick = menuLink.onclick;
}(this, this.document));
