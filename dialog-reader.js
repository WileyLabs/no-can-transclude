(function() {
  // detect <dialog> feature
  if (typeof HTMLDialogElement === 'function') {

    // TODO: handle existing <base> tags or add target="" to ToC links
    let head = `
    <base target="content-frame" />
    <style>
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
        background: rgba(185,207,255,0.5);
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
        background: white;
        border: 1px solid black;
        border-radius: 0 0 25px 25px;
        border-top: none;
      }
      #reader .nav a {
        cursor: pointer;
        text-decoration: underline;
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
          <a accesskey="p">previous</a>
          <a accesskey="t" class="toc" title="Table of Contents">close</a>
          <a accesskey="n">next</a>
        </div>
        <iframe name="content-frame"></iframe>
      </dialog>
    `;

    // add HTML
    document.head.insertAdjacentHTML('beforeend', head);
    document.body.insertAdjacentHTML('afterbegin', dialog);

    // TODO: web components...maybe?
    let reader = document.getElementById('reader');

    // reader nav
    let toc = reader.querySelector('a.toc');
    toc.addEventListener('click', (ev) => {
      ev.stopPropagation();
      reader.close();
    });

    let prev = reader.querySelector('a:first-child');
    let next = reader.querySelector('a:last-child');

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
  }
})();
