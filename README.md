#jQuery StickyScroll

Make elements stick to the top of your page as you scroll


##Usage:
Generic usage - element is contained inside the 'body' element
$(element).stickyScroll()

If the element is to be contained inside one of its parents, (for instance, if you want to keep it inside the main content area, but keep it out of the header and footer) then provide a selector for that parent element.

Ex:
$(element).stickyScroll({ container: '#my-wrapper' })

If you don't have a particular element you want the sticky element contained to, but still need control of its bottom boundary, use the manual mode

Ex:
$(element).stickyScroll({ mode: 'manual', 'bottomBoundary': 100 })
where bottomBoundary is relative to the bottom of the document


##Notes:
- Requires jQuery 1.4+ or include the offset.js file from newer jQuery source (http://github.com/jquery/jquery/blob/master/src/offset.js)
- <del>Disclaimer: Requires position: fixed support, so no IE6</del> No longer uses fixed positioning, only mimics it. Much better support now for mobile/tablet.
- Possible enhancements to come: 
	- Fluid/elastic layout support
	- Support for callbacks when a boundary is reached