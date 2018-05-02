if ('serviceWorker' in navigator) {
  // path is relative to where book.js is loaded...
  navigator.serviceWorker.register('../sw.js', {
    // strip any file name, so we're scoping for this spot in the hierarchy
    scope: './'
  }).then(function(reg) {

    // TODO: understand these states better, so fauxFrame runs correctly
    if(reg.installing) {
      console.log('Service worker installing');
    } else if(reg.waiting) {
      console.log('Service worker installed');
    } else if(reg.active) {
      console.log('Service worker active');
    }
  }).catch(function(error) {
    // registration failed
    console.error('Registration failed with ' + error);
  });
}

let publication_path = location.pathname;
let pathname_array = location.pathname.split('/');
if (pathname_array[pathname_array.length-1] !== "") {
  // there's something on the end of the path...probably a "filename"
  // first, remove the filename
  pathname_array.pop();
  // then, put things back together and add the trailing slash
  publication_path = pathname_array.join('/') + '/';
}

function collectSpine() {
  return document.querySelectorAll("nav[role='doc-toc'] a");
}

function checkCachedStatus(cache) {
  let toolbar = document.getElementById('keep');
  let spine = collectSpine();
  for (let resource of spine) {
    cache.match(resource.href).then((response) => {
      if (undefined !== response && response.status === 200) {
        // let's just make sure anything's in here for now...
        // TODO: output a % of contents cached? that'd be nice...
        console.log(resource.href, response.status);
        toolbar.classList.add('offline');
        return;
      }
    });
  }
}

function keep() {
  console.log('faux framing');
  let spine = collectSpine();

  // start by caching the Table of Contents
  // TODO: install a separate ServiceWorker to handle these requests?
  caches.open(publication_path).then((cache) => {
    for (var resource of spine) {
      // undeclared type, so assume it's HTML + dependencies
      if (resource.type === '') {
        // Use hidden iframes to "force" browser to request all the things...
        let iframe = document.createElement('iframe');
        iframe.src = resource.href;
        iframe.style.display = 'none';
        document.body.append(iframe);
        console.log('iframed', resource.href);
      } else {
        console.log('fetching', resource.href);
        // it's got a specific type, so let's just cache it
        cache.add(resource.href)
          .then(() => console.log('successfully cached', resource.href));
      }
    }
    // TODO: find a more efficient way to check the cache status...this checks
    // everything...again
    checkCachedStatus(cache);
  });
};

function discard() {
console.log('discard');
  caches.delete(publication_path).then((status) => {
    // TODO: actually check the status...
    let pubbar = document.getElementById('web-publication-toolbar');
    pubbar.classList.remove('offline');
  });
};



var keepMe = document.createElement('button');
keepMe.innerHTML = '&#x1f4be;';
keepMe.setAttribute('id', 'web-publication-toolbar');
keepMe.setAttribute('onclick', 'keep();');
keepMe.style.position = 'fixed';
keepMe.style.top = '60px';
keepMe.style.backgroundColor = 'rebeccapurple';
keepMe.style.color = 'white';
keepMe.style.fontWeight = 'bold';
keepMe.style.fontSize = '23px';
keepMe.style.borderStyle = 'solid';
keepMe.style.borderColor = 'rebeccapurple';
keepMe.style.paddingBottom = '0px';
keepMe.style.paddingLeft = '0px';
keepMe.style.right = '0';
keepMe.style.borderTopLeftRadius = '30px';
keepMe.style.borderBottomLeftRadius = '30px';
keepMe.style.height = '30px';
keepMe.style.width = '30px';
document.body.prepend(keepMe);

/* 

var pubbar = document.createElement('div');

pubbar.innerHTML = `
  <style>
  #web-publication-toolbar button { background-color: rebeccapurple; color: white; font-weight: bold }
  #web-publication-toolbar .keep { display: block }
  #web-publication-toolbar .message { background: #efefef; display: none }
  #web-publication-toolbar .offline.keep { display:none }
  #web-publication-toolbar .offline.message { display:block }
  </style>
  <div id="web-publication-toolbar">
    <button class="keep" onclick="keep()" title="download all ToC referenced pages">
      Cache Book
    </button>
    <div class="message">
      Book Cached
      <button class="discard" onclick="discard()">Discard Book</button>
    </div>
  </div>
`;


document.body.prepend(pubbar);

 */

caches.keys().then((keys) => {
  // TODO: we need to know more than that the cache exists...
  // ...do we have primary resources in it yet?
  let cache_exists = keys.indexOf(publication_path) > -1;
  let toolbar = document.getElementById('web-publication-toolbar');
  console.log('toolbar', toolbar);
  if (cache_exists) {
    // now check to see if that cache has any publication contents
    caches.open(publication_path).then((cache) => {
      checkCachedStatus(cache);
    });
  } else {
    toolbar.classList.remove('offline');
  }
});
