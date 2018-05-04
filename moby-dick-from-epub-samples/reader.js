// TODO: handle existing <base> tags or add target="" to ToC links
let head = `
<base target="content-frame" />
<style>
  :-moz-full-screen  { background: red; }
  :-webkit-full-screen-ancestor { background: white; }
  :-webkit-full-screen-ancestor body { width: 100% }
  :-ms-fullscreen { background: red; }
  :fullscreen { background: red; }

  dialog {
    width: 90vw;
    height: 90vh;
    padding: 0;
  }
  dialog iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
  dialog::backdrop {
    background: rgba(255,0,0,.25);
  }

  #reader {
    text-align: center;
  }
  #reader .nav {
    position: absolute;
    left: 25%;
    width: 50%;
    height: 1.5em;
    text-align: center;
    border: 1px solid black;
    border-radius: 0 0 25px 25px;
    border-top: none;
  }
  #reader .nav a:first-child {
    float: left;
    margin-left: 1em;
  }
  #reader .nav a:last-child {
    float: right;
    margin-right: 1em;
  }
</style>
`;

let dialog = `
  <dialog id="reader">
    <div class="nav">
      <a rel="previous" href="">previous</a>
      <a class="fullscreen" href="">fullscreen</a>
      <a rel="next" href="">next</a>
    </div>
    <iframe name="content-frame"></iframe>
  </dialog>
`;

// add HTML
document.head.insertAdjacentHTML('beforeend', head);
document.body.insertAdjacentHTML('afterbegin', dialog);

// TODO: web components...maybe?
let reader = document.getElementById('reader');

// immersive reading ftw!
let fullscreen = reader.querySelector('a.fullscreen');
fullscreen.addEventListener('click', (ev) => {
  ev.preventDefault();
  ev.stopPropagation();

  let enabled = document.fullscreenEnabled || document.mozFullScreen
    || document.webkitIsFullScreen;
  let element = parent.document.body;

  if (!enabled) {
    if (element.requestFullscreen) { // W3C API
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Mozilla current API
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) { // Webkit current API
      element.webkitRequestFullScreen();
    } // Maybe other prefixed APIs?
  } else {
    if (document.exitFullscreen) { // W3C API
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Mozilla current API
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) { // Webkit current API
      document.webkitCancelFullScreen();
    } // Maybe other prefixed APIs?
  }
});

// reader nav
let prev = reader.querySelector('a[rel=previous]');
let next = reader.querySelector('a[rel=next]');

function setPrevNext(target) {
  prev.href = target.parentElement.previousElementSibling.querySelector('a').href;
  next.href = target.parentElement.nextElementSibling.querySelector('a').href;
}

let readingOrder = document.querySelectorAll('nav[role=doc-toc] a');
let current = 0; // index in readingOrder

// TODO: NodeList.forEach isn't yet supported in Edge; polyfill?
readingOrder.forEach((a, i) => {
  a.addEventListener('click', (ev) => {
    current = i;
    setPrevNext(ev.target);
    reader.showModal();
    document.body.style.overflow = 'hidden';
  })
});

function navClick(ev) {
  ;
}
prev.addEventListener('click', (ev) => {
  setPrevNext(readingOrder.item(current));
  current--;
});
next.addEventListener('click', (ev) => {
  setPrevNext(readingOrder.item(current));
  current++;
});

// click outside handler; from https://stackoverflow.com/a/40028441
reader.addEventListener('click', (e) => {
  var rect = e.target.getBoundingClientRect();
  var minX = rect.left + e.target.clientLeft;
  var minY = rect.top + e.target.clientTop;
  if ((e.clientX < minX || e.clientX >= minX + e.target.clientWidth) ||
      (e.clientY < minY || e.clientY >= minY + e.target.clientHeight)) {
    e.target.close();
  }
});
reader.addEventListener('close', () => {
  document.body.style.overflow = 'auto';
});

