# Repository Moved

This used to be the primary home of the `no-can-transclude` experiments. It
now lives at [WileyLabs/no-can-transclude](https://github.com/WileyLabs/no-can-transclude)
since it's increasingly expanding to include (transclude?) more topics/exploration.

The files here are now attempts to "redirect" readers (UAs or humans) to the
correct publication addresses--given that by moving the repo all the old
publication addresses are now broken (or at least out of date).

Given this is also a core complication for publishing on/for/to the Web, this
repository now serves to explore that situation as well.

## Usage

Currently, the [original transclusion attempts](index.html) and
[carol](carol/) now have "Publication moved" style text with URLs pointing to
their `latest-version` as defined in [RFC 5929](https://tools.ietf.org/html/rfc5829#section-3.2).

There is certainly room for proper HTTP headers to be used
([404](http://http.cat/404), [410](http://http.cat/410), [301](http://http.cat/301), etc),
but GitHub pages (like most static hosting sites) do not currently provide a
means to modify the HTTP headers sent back for a GET request (though something
like [wptserve's File Handler .headers files would be fabulous](http://wptserve.readthedocs.io/en/latest/handlers.html#file-handlers)).

So, instead of *only* relying on HTTP headers (as these will still all be
[200 OK](http://http.cat/200) responses), these files include
`<a rel="latest-version">...</a>` links--which could,
of course, be sent back in any payload (or
[`Link` header](https://tools.ietf.org/html/rfc5988#section-4.2)
regardless of the status code.

This *could* allow User Agents to find any version URLs related to their any
cached/offlined/kept publications and point the user toward the new publication
--giving the user the option to keep the new (version of the) publication,
update theirs, etc.

It's an idea, anyway.

See https://github.com/w3c/wpub/issues/180#issuecomment-383951779 for more ideas.

# License

MIT (for what little of this is actually license-able/usable)
