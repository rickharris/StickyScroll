/**
 * StickyScroll
 * written by Rick Harris - @iamrickharris
 * 
 * Requires jQuery 1.4+
 * Disclaimer: Requires position: fixed support, so no IE6
 * 
 * Make elements stick to the top of your page as you scroll
 *
 * Usage: $(element).stickyScroll(options)
 * 
 * If the element is to be contained inside one of its parents, 
 * (you want to keep it inside the main content area, and out of the header and footer)
 * then provide a selector for that parent element
 * Ex:
 * $(element).stickyScroll({ container: '#my-wrapper' })
 * 
 * If you don't have a particular element you want the sticky element contained to,
 * but still need control of its bottom boundary, use the manual mode
 * Ex:
 * $(element).stickyScroll({ mode: 'manual', 'bottomBoundary': 100 })
 * and bottomBoundary is relative to the bottom of the document
 * 
*/

(function($) {
	$.fn.stickyScroll = function(options) {
	
		var settings = $.extend({
				mode: 'auto', // 'auto' or 'manual', but anything other than auto will be treated as manual
				container: $('body'),
				bottomBoundary: null
			}, options);

		$.fn.stickyScrollEnable = function() {

			// make sure user input is a jQuery object
			settings.container = $(settings.container);
			if(!settings.container.length) {
				if(console) {
					console.log('StickyScroll: the element ' + options.container + ' does not exist, we\'re throwing in the towel');
				}
				return;
			}

			// calculate automatic bottomBoundary
			if(settings.mode === 'auto') {
				settings.bottomBoundary = $(document).height() - settings.container.offset().top - settings.container.attr('offsetHeight');
			}

			return this.each(function() {

				var $this = $(this),
					height = $this.attr('offsetHeight'),
					topOffset = $this.offset().top;

				function onScroll() {
					var top = $(document).scrollTop(),
						bottom = $(document).height() - top - height;

					if(bottom <= settings.bottomBoundary) {
						$this.offset({ top: $(document).height() - settings.bottomBoundary - height });
						settings.container.addClass('sticky-processed');
					}
					else if(top > topOffset) {
						$this.offset({ top: $(window).scrollTop() });
						settings.container.addClass('sticky-processed');
					}
					else if(top < topOffset) {
						$this.css({
							position: '',
							top: '',
							bottom: ''
						});
						settings.container.removeClass('sticky-processed');
					}
				};

				$(window).bind('scroll.stickyscroll', onScroll).scroll();

			});

		}

		$.fn.stickyScrollReset = function() {
			this.each(function() {
				$(this).css({
					position: '',
					top: '',
					bottom: ''
				});
				settings.container.removeClass('sticky-processed');
			});
			$(window).unbind('.stickyscroll');
		}
	
		if (options === 'reset') {
			return $(this).stickyScrollReset();
		}
		else {
			return $(this).stickyScrollEnable();
		}
	
	};
})(jQuery);