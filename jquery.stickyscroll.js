/**
 * StickyScroll
 * written by Rick Harris - @iamrickharris
 * 
 * Requires jQuery 1.4+
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
 * With no options specified, it treat the body element as its container
 *
*/

(function($) {
	$.fn.stickyScroll = function(options) {
	
		var methods = {
		  
		  init : function(options) {
		    
		    var settings;
		    
		    if (options.mode !== 'auto' && options.mode !== 'manual') {
		      if (options.container) {
		        options.mode = 'auto';
		      }
		      if (options.bottomBoundary) {
		        options.mode = 'manual';
		      }
		    }
		    
		    settings = $.extend({
  				mode: 'auto', // 'auto' or 'manual'
  				container: $('body'),
  				bottomBoundary: null
  			}, options);
  			
  			// make sure user input is a jQuery object
  			settings.container = $(settings.container);
  			if(!settings.container.length) {
  				if(console) {
  					console.log('StickyScroll: the element ' + options.container +
  					  ' does not exist, we\'re throwing in the towel');
  				}
  				return;
  			}

  			// calculate automatic bottomBoundary
  			if(settings.mode === 'auto') {
  				settings.bottomBoundary = $(document).height()
  				                          - settings.container.offset().top
  				                          - settings.container.attr('offsetHeight');
  			}

  			return this.each(function(index) {

  				var el = $(this),
  				  id = Date.now() + index,
  					height = el.attr('offsetHeight'),
  					topOffset = el.offset().top;

          el.data('sticky-id', id)
          
  				$(window).bind('scroll.stickyscroll-' + id, function() {
  				  var top = $(document).scrollTop(),
  						bottom = $(document).height() - top - height;

  					if(bottom <= settings.bottomBoundary) {
  						el.offset({
  						  top: $(document).height() - settings.bottomBoundary - height
  						}).addClass('sticky-stopped');
  					}
  					else if(top > topOffset) {
  						el.offset({
  						  top: $(window).scrollTop()
  						}).addClass('sticky-active');
  					}
  					else if(top < topOffset) {
  						el.css({
  							position: '',
  							top: '',
  							bottom: ''
  						}).removeClass('sticky-inactive');
  					}
  				});
  				
  				el.addClass('sticky-processed');
  				
  				// start it off
  				$(window).scroll();

  			});
  			
		  },
		  
		  disable : function() {
  			return this.each(function() {
  			  var el = $(this),
  			    id = el.data('sticky-id');
  				el.css({
  					position: '',
  					top: '',
  					bottom: ''
  				});
          $(window).unbind('.stickyscroll-' + id);
  			});
		  }
		  
		};
		
		// if options is a valid method, execute it
		if (methods[options]) {
		  return methods[options].apply(this,
		    Array.prototype.slice.call(arguments, 1));
		}
		// or, if options is a config object, or no options are passed, init
		else if (typeof options === 'object' || !options) {
		  return methods.init.apply(this, arguments);
		}
		
		else if(console) {
			console.log('Method' + options +
			  ' does not exist on jQuery.stickyScroll');
		}

	};
})(jQuery);