var getCookiebyName = function(name){
  var pair = document.cookie.match(new RegExp(name + '=([^;]+)'));
  return !!pair ? pair[1] : null;
};

window.addEventListener('scroll', function(e) {
  var last_known_scroll_position = 0;
  var ticking = false;
  var currentTarget = window.location.hash.substring(1);
  var currentIframe = document.getElementById(currentTarget);

  last_known_scroll_position = currentIframe.contentWindow.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(function() {
      document.cookie = "hash" + "=" + currentTarget;
      document.cookie = "scrolly"  + "=" +  last_known_scroll_position;
      console.log(last_known_scroll_position);
      ticking = false;
    });
    ticking = true;
  }
});

window.addEventListener("load", function(event) {
  restoreReadingPosition();
  console.log("All resources finished loading!");
});

function restoreReadingPosition() {
  var hrefValue = '#' + getCookiebyName('hash');
  var hrefValueSelector = 'a[href="' + hrefValue + '"]';
  document.querySelectorAll(hrefValueSelector)[0].click();
  var scrollYValue = getCookiebyName('scrolly');
  var currentIframe = document.getElementById(getCookiebyName('hash'));
  console.log(currentIframe.contentWindow);
  currentIframe.contentWindow.scrollTo(0, scrollYValue);
};
