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

var prevButton = document.createElement('button');
prevButton.innerHTML = '&lt;';
prevButton.setAttribute('id', 'prev');
prevButton.setAttribute('onclick', 'prevPage();');
prevButton.style.position = 'fixed';
prevButton.style.top = '50%';
prevButton.style.backgroundColor = 'rebeccapurple';
prevButton.style.color = 'white';
prevButton.style.fontWeight = 'bold';
prevButton.style.fontSize = '33px';
prevButton.style.borderStyle = 'solid';
prevButton.style.borderColor = 'rebeccapurple';
prevButton.style.paddingBottom = '50px';
prevButton.style.left = '-15px';
prevButton.style.borderTopRightRadius = '30px';
prevButton.style.borderBottomRightRadius = '30px';
prevButton.style.height = '50px';
prevButton.style.width = '50px';
document.body.prepend(prevButton);


var nextButton = document.createElement('button');
nextButton.innerHTML = '&gt;';
nextButton.setAttribute('id', 'next');
nextButton.setAttribute('onclick', 'nextPage();');
nextButton.style.position = 'fixed';
nextButton.style.top = '50%';
nextButton.style.backgroundColor = 'rebeccapurple';
nextButton.style.color = 'white';
nextButton.style.fontWeight = 'bold';
nextButton.style.fontSize = '33px';
nextButton.style.borderStyle = 'solid';
nextButton.style.borderColor = 'rebeccapurple';
nextButton.style.paddingBottom = '50px';
nextButton.style.right = '-15px';
nextButton.style.borderTopLeftRadius = '30px';
nextButton.style.borderBottomLeftRadius = '30px';
nextButton.style.height = '50px';
nextButton.style.width = '50px';
document.body.prepend(nextButton);



