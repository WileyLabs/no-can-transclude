# Publishing Carol

A web publication which uses no JavaScript, but still affords:
 - reading state management / bookmarking (via hash fragments)
 - built from constituent resources (via iframes)
 - all references (i.e. URLs) present context as part of the publication

### Issues
 - referencing "within" a child resource is currently not possible
   - `:target-within` only works on "flat tree" content (not iframe'd content)
