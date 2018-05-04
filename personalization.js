// night mode, make font larger, make font smaller

var allIframes = document.getElementsByTagName('iframe');


var largerFontButton = document.createElement('button');
largerFontButton.innerHTML = '+';
largerFontButton.setAttribute('id', 'larger-font-button');
largerFontButton.style.position = 'fixed';
largerFontButton.style.bottom = '0';
largerFontButton.style.backgroundColor = 'rebeccapurple';
largerFontButton.style.color = 'white';
largerFontButton.style.fontWeight = 'bold';
largerFontButton.style.fontSize = '15px';
largerFontButton.style.borderStyle = 'solid';
largerFontButton.style.borderColor = 'rebeccapurple';
largerFontButton.style.paddingBottom = '0px';
largerFontButton.style.paddingRight = '15px';
largerFontButton.style.left = '0px';
largerFontButton.style.borderTopRightRadius = '30px';
largerFontButton.style.borderBottomRightRadius = '0px';
largerFontButton.style.height = '30px';
largerFontButton.style.width = '30px';
//want to increase/decrease font size inside iframes
largerFontButton.addEventListener('click', function() {
  console.log('clicked larger-font-button');
  for (var i = 0; i < allIframes.length; i++) {
    var cur = window.getComputedStyle(allIframes[i].contentWindow.document.getElementsByTagName('body')[0]).fontSize;
    allIframes[i].contentWindow.document.getElementsByTagName('body')[0].style.fontSize = parseInt(cur) + 2 + "px"
  }
  },
false);
// add to the ToC's DOM
document.body.prepend(largerFontButton);


var smallButton = document.createElement('button');
smallButton.innerHTML = '-';
smallButton.setAttribute('id', 'smaller-font-button');
smallButton.style.position = 'fixed';
smallButton.style.bottom = '0';
smallButton.style.backgroundColor = 'rebeccapurple';
smallButton.style.color = 'white';
smallButton.style.fontWeight = 'bold';
smallButton.style.fontSize = '15px';
smallButton.style.borderStyle = 'solid';
smallButton.style.borderColor = 'rebeccapurple';
smallButton.style.paddingBottom = '0px';
smallButton.style.paddingRight = '0px';
smallButton.style.right = '0px';
smallButton.style.borderTopLeftRadius = '30px';
smallButton.style.borderBottomLeftRadius = '0px';
smallButton.style.height = '30px';
smallButton.style.width = '30px';
smallButton.addEventListener('click', function() {
  console.log('clicked smaller-font-button');
  var allIframes = document.getElementsByTagName('iframe');
  for (var i = 0; i < allIframes.length; i++) {
    var cur = window.getComputedStyle(allIframes[i].contentWindow.document.getElementsByTagName('body')[0]).fontSize;
    allIframes[i].contentWindow.document.getElementsByTagName('body')[0].style.fontSize = parseInt(cur) - 2 + "px"
  }
}, false);
document.body.prepend(smallButton);


var nightButton = document.createElement('button');
nightButton.innerHTML = '&#x2600';
nightButton.value = 'Night';
nightButton.setAttribute('id', 'night-button');
nightButton.style.position = 'fixed';
nightButton.style.top = '0';
nightButton.style.backgroundColor = 'rebeccapurple';
nightButton.style.color = 'white';
nightButton.style.fontWeight = 'bold';
nightButton.style.fontSize = '24px';
nightButton.style.borderStyle = 'solid';
nightButton.style.borderColor = 'rebeccapurple';
nightButton.style.paddingBottom = '6px';
nightButton.style.paddingLeft = '9px';
nightButton.style.paddingRight = '0px';
nightButton.style.right = '0%';
nightButton.style.borderBottomLeftRadius = '45px';
nightButton.style.borderTopLeftRadius = '0px';
nightButton.style.height = '45px';
nightButton.style.width = '45px';
nightButton.addEventListener('click', function() {
if (nightLink.value === "Night") {
  for (var i = 0; i < allIframes.length; i++) {
    allIframes[i].contentWindow.document.getElementsByTagName('html')[0].style.filter = 'invert(1) hue-rotate(180deg)';
    allIframes[i].contentWindow.document.getElementsByTagName('html')[0].style.background = 'black';
    document.getElementsByTagName('body')[0].style.background = 'black';
  }

    // need to check for img elements before altering styles
    // code TK... if there's no IMG then getElementsByTagName returns an empty array
    //inside.getElementsByTagName('img').style.filter = 'invert(1) hue-rotate(180deg)';

    nightLink.value = 'Day';
  } else {
    for (var i = 0; i < allIframes.length; i++) {
      allIframes[i].contentWindow.document.getElementsByTagName('html')[0].style.filter = 'invert(0) hue-rotate(0deg)';
      allIframes[i].contentWindow.document.getElementsByTagName('html')[0].style.background = 'white';
      document.getElementsByTagName('body')[0].style.background = 'white';
    }
    nightLink.value = 'Night';
  }
}, false);
document.body.prepend(nightButton);
