#jQuery StickyScroll

Make elements stick to the top of your page as you scroll


##Usage:
Generic usage - element is contained inside the 'body' element
$(element).stickScroll(options)

If the element is to be contained inside one of its parents, (you want to keep it inside the main content area, and out of the header and footer) then provide a selector for that parent element.

Ex:
$(element).stickScroll({ container: '#my-wrapper' })

If you don't have a particular element you want the sticky element contained to, but still need control of it's boundaries, use the manual mode to provide upper and lower bounds

Ex:
$(element).stickyScroll({ mode: 'manual', 'topBoundary': 50, 'bottomBoundary': 100 })
where topBoundary is relative to the top of the document 
and bottomBoundary is relative to the bottom of the document


##Notes:
- Requires jQuery 1.4+ or include the offset.js file from newer jQuery source (http://github.com/jquery/jquery/blob/master/src/offset.js)
- Disclaimer: Requires position: fixed support, so no IE6
- Possible enhancements to com: 
	- Demo page
	- Support for callbacks when a boundary is reached
