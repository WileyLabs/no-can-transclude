// Sigh. Links between iframes have to be rewritten. 

// basic idea: figure out which iframe the link targets, 
var iframes = document.getElementsByTagName("iframe");

function getFileName(str) {
  return str.split('\\').pop().split('/').pop();
}

for (i=1; i < iframes.length; i++) {
  iframes[i].contentWindow.document.addEventListener("click", interceptClickEvent, false);
}

function interceptClickEvent(e) {
  var href;
  var target = e.target || e.srcElement;
  if (target.tagName === 'A') {
    href = target.getAttribute('href');
    // first, figure out which iframe the link is coming from
    var path = e.target.ownerDocument.URL;
    var fileName = getFileName(path);
    // <iframe name="c021-iframe" id="c021-iframe" src="c021.html"></iframe>
    var iframeArraySrc = [];
    for (i=1; i < iframes.length; i++) {
      iframeArraySrc.push(iframes[i].getAttribute('src'))
    };

    var iframeIDPosition = iframeArraySrc.indexOf(fileName); //23

    var iframeArrayID = [];
    for (i=1; i < iframes.length; i++) {
      iframeArrayID.push(iframes[i].getAttribute('id'))
    };

    var iframeID = iframeArrayID[iframeIDPosition]; //c021-iframe

    // figure out which iframe the link is going to

    var linkTargetIframe = href.split('#')[0];
    var linkTargetIframeIDPosition = iframeArraySrc.indexOf(linkTargetIframe);
    var linkTargetIframeID = iframeArrayID[linkTargetIframeIDPosition];

    window.location.hash = linkTargetIframeID;

    // need to know which iframe...
    console.log(iframes[linkTargetIframeIDPosition +1]);

    iframes[linkTargetIframeIDPosition + 1].contentWindow.document.getElementById(href.split('#')[1]).scrollIntoView();

    //put your logic here...
    if (true) {
       //tell the browser not to respond to the link click
       e.preventDefault();
    }
  }
}
