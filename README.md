#jQuery StickyScroll

Make elements stick to browser window as you scroll


##Usage:
- `$('selector').stickyScroll({ container: $(container-element) })`

  This is "auto" mode. The sticky element will never cross the boundaries
  of the specified container.

- `$('selector').stickyScroll()`

  This is also "auto" mode, but the container will be the `body` tag.

- `$('selector').stickyScroll({ topBoundary: '100px', bottomBoundary: '200px' })`

  This is "manual" mode. The boundaries are relative to the top and bottom of
  the document, and the sticky element will never cross those boundaries. So,
  in the example given, the top of the sticky element(s) will never be above
  100 pixels from the top of the document and the bottom of the sticky
  element(s) will never be below 200 pixels from the bottom of the document.

- `$('selector').stickyScroll('reset')`

  Use this command to rid an element of any stickiness

##Notes:
- Requires jQuery 1.4+ or include the offset.js file from newer jQuery source (http://github.com/jquery/jquery/blob/master/src/offset.js)
- <del>Disclaimer: Requires position: fixed support, so no IE6</del> No longer uses fixed positioning, only mimics it. Much better support now for mobile/tablet.
- Possible enhancements to come: 
	- <del>Fluid/elastic layout support</del> Now supports fluid layouts! (best in "auto" mode)
	- Support for callbacks when a boundary is reached
