# No Can Transclude!

Want to [transclude](https://en.wikipedia.org/wiki/Transclusion)
something on the Web? You can't...really.

Well...not without JavaScript...and often lots of it.

## What's wanted

Transclusion of content from one resource into the render tree of another.

## Usage

Run an HTTP server in this local directory and request `http://localhost:8080`
(or whatever port your server uses).

If you've got npm, use:

```
$ npm i -g http-server
$ http-server .
```

You'll see a boring/ugly set of HTML and CSS to see what's (im)possible.

# So many options...so little success...


## <object> or <embed>

Less boarder than an iframe, but still no CSS inheritance.

## <link rel="import">

Requires JS.

## iframe seamless

The all-to-short-lived [`<iframe seamless>` attribute](https://www.w3.org/TR/2016/WD-html51-20160310/semantics-embedded-content.html#in-seamless-mode)
would have (maybe) come close.

As originally defined (though not widely implemented) it allowed:

 - cascading of parent's styles
 - styles are override-able by child's styles
 - width and height based on the iframe's contents

Mainly, it seems to have failed due to trying to be too many things at once,
and not any one thing successfully:
https://labs.ft.com/2013/01/seamless-iframes-not-quite-seamless/

[UC Browser for Android](http://www.ucweb.com/ucbrowser/) seems to be
[the only implementor](https://caniuse.com/#search=seamless).

### seamless polyfills

Most of these focus on width/height calculation, but some explore CSS cascading
from parent to child.

- https://github.com/ornj/seamless-polyfill
- https://github.com/travist/seamless.js

# Non-standard, JS trickery

- http://juicy.github.io/juicy-html/ - focused on loading "partials"
- http://juicy.github.io/imported-template/examples/index.html - same, but for
templates

# License

MIT (for what little of this is actually license-able/usable)
