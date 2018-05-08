// Script to control navigation of a web publication.
// Creates previous/next buttons
// reads nav file, generates spine
// dauwhe, 4.24.2018
// all credit to bigbluehat
var contents = document.querySelectorAll('nav[role="doc-toc"] a');
var navList = [];
for (var i = 0; i < contents.length; i++) {
  navList.push(contents[i].getAttribute('href'));
}
function prevPage() {
  console.log('clicked previous page');
  var currentTarget = window.location.hash;
  window.location.hash = navList[navList.indexOf(currentTarget) - 1];
}

function nextPage() {
  var currentTarget = window.location.hash;
  window.location.hash = navList[navList.indexOf(currentTarget) + 1];
}

function showTOC() {
  var tableOfContents = document.querySelector('nav[role="doc-toc"]');
  if (tableOfContents.style.display === ""
    || tableOfContents.style.display === "none") {
      tableOfContents.style.display = "block";
  } else {
      tableOfContents.style.display = "none";
  }
};

var prevButton = document.createElement('button');
prevButton.innerHTML = '&lt;';
prevButton.setAttribute('id', 'prev');
prevButton.addEventListener('click', prevPage);
prevButton.style.position = 'fixed';
prevButton.style.top = '50%';
prevButton.style.backgroundColor = 'rebeccapurple';
prevButton.style.color = 'white';
prevButton.style.fontWeight = 'bold';
prevButton.style.fontSize = '30px';
prevButton.style.borderStyle = 'solid';
prevButton.style.borderColor = 'rebeccapurple';
prevButton.style.paddingBottom = '44px';
prevButton.style.paddingLeft = '0px';
prevButton.style.left = '0';
prevButton.style.borderTopRightRadius = '30px';
prevButton.style.borderBottomRightRadius = '30px';
prevButton.style.height = '30px';
prevButton.style.width = '30px';
document.body.prepend(prevButton);


var nextButton = document.createElement('button');
nextButton.innerHTML = '&gt;';
nextButton.setAttribute('id', 'next');
nextButton.addEventListener('click', nextPage);
nextButton.style.position = 'fixed';
nextButton.style.top = '50%';
nextButton.style.backgroundColor = 'rebeccapurple';
nextButton.style.color = 'white';
nextButton.style.fontWeight = 'bold';
nextButton.style.fontSize = '30px';
nextButton.style.borderStyle = 'solid';
nextButton.style.borderColor = 'rebeccapurple';
nextButton.style.paddingBottom = '44px';
nextButton.style.right = '0';
nextButton.style.borderTopLeftRadius = '30px';
nextButton.style.borderBottomLeftRadius = '30px';
nextButton.style.height = '30px';
nextButton.style.width = '30px';
document.body.prepend(nextButton);

var tocButton = document.createElement('button');
tocButton.innerHTML = 'TOC';
tocButton.setAttribute('id', 'toc-button');
tocButton.addEventListener('click', showTOC);
tocButton.style.position = 'fixed';
tocButton.style.top = '0';
tocButton.style.backgroundColor = 'rebeccapurple';
tocButton.style.color = 'white';
tocButton.style.fontWeight = 'bold';
tocButton.style.fontSize = '12px';
tocButton.style.borderStyle = 'solid';
tocButton.style.borderColor = 'rebeccapurple';
tocButton.style.paddingBottom = '12px';
tocButton.style.paddingRight = '12px';
tocButton.style.left = '0px';
tocButton.style.borderTopRightRadius = '0px';
tocButton.style.borderBottomRightRadius = '45px';
tocButton.style.height = '45px';
tocButton.style.width = '45px';
document.body.prepend(tocButton);
