/* Script for fading and loading sponsor logos
 *
 * Overview:
 * Load image names / tiers (time segments/just order?)
 * Setup (resizable then reload?)
 *
 * Loop: Load images with correct dimensions, set timer
 */


function $(element) {
  if (arguments.length > 1) {
    for (var i = 0, elements = [], length = arguments.length; i < length; i++) elements.push($(arguments[i]));
    return elements;
  }
  if (Object.isString(element)) element = document.getElementById(element);
  return Element.extend(element);
}


/*
 * Load image names from /img folder
 */

var dirs = ['img/seriesb', 'img/seriesa', 'img/angel', 'img/seed']
var logos = []


for (var i = 0; i < dirs.length; i++) {
  // client-side JS can't do file stuff directly (needs backend)
  // maybe img name scheme: 'logo1.png', 'logo2.png' etc
}


/*
 * Setup:
 */

var imgMaxWidth = 200; // max img width in pixels
var imgPercent = 0.25; // 1/4 of footer width
var imgWidth = $('footer').width * imgPercent

if (imgWidth > imgMaxWidth) {
  imgWidth = imgMaxWidth;
}

var numImg = Math.floor($('footer').width / width)

/*
 * Load Images:
 */
var index = 0

for (var i = 0; i < numImg; i++, index++) {
  // create div + image, float vs math for positions
}



