/**
 * StickyScroll
 * written by Rick Harris - @iamrickharris
 * 
 * Requires jQuery 1.4+
 * Disclaimer: Requires position: fixed support, so no IE6
 * 
 * Make elements stick to the top of your page as you scroll
 *
 * Usage: $(element).stickScroll(options)
 * 
 * If the element is to be contained inside one of its parents, 
 * (you want to keep it inside the main content area, and out of the header and footer)
 * then provide a selector for that parent element
 * Ex:
 * $(element).stickScroll({ container: '#my-wrapper' })
 * 
 * If you don't have a particular element you want the sticky element contained to,
 * but still need control of it's boundaries, use the manual mode to provide
 * upper and lower bounds
 * Ex:
 * $(element).stickyScroll({ mode: 'manual', 'topBoundary': 50, 'bottomBoundary': 100 })
 * where topBoundary is relative to the top of the document 
 * and bottomBoundary is relative to the bottom of the document
 * 
*/

(function($) {
	$.fn.stickyScroll = function(options) {
		
		var settings = $.extend({
				mode: 'auto', // 'auto' or 'manual', but anything other than auto will be treated as manual
				container: $('body'),
				topBoundary: null,
				bottomBoundary: null
			}, options);
			
		// make sure user input is a jQuery object
		settings.container = $(settings.container);
		
		settings = $.extend(settings, {
			topBoundary: settings.mode === 'auto' ? settings.container.offset().top : settings.topBoundary,
			bottomBoundary: settings.mode === 'auto' ? $(document).height() - (settings.container.offset().top + settings.container.attr('offsetHeight')) : settings.bottomBoundary
		});
		
		return this.each(function() {
			
			var $this = $(this),
				height = $this.attr('offsetHeight'),
				leftOffset = $this.offset().left;
				
			function onScroll() {
				var top = $(document).scrollTop(),
					bottom = $(document).height() - top - height;
					
				if(bottom <= settings.bottomBoundary) {
					$this.offset({ top: $(document).height() - settings.bottomBoundary - height, left: leftOffset });
					settings.container.addClass('sticky-processed');
				}
				else if(top > settings.topBoundary) {
					$this.css({
						position: 'fixed',
						left: leftOffset,
						top: 0,
						bottom: ''
					});
					settings.container.addClass('sticky-processed');
				}
				else if(top < settings.topBoundary) {
					$this.css({
						position: '',
						left: '',
						top: '',
						bottom: ''
					});
					settings.container.removeClass('sticky-processed');
				}
			}
			
			onScroll();
			$(window).scroll(onScroll);

		});
	};
})(jQuery);