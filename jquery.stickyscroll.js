/**
 * StickyScroll
 * written by Rick Harris - @iamrickharris
 * 
 * Requires jQuery 1.4+
 * 
 * Make elements stick to the top of your page as you scroll
 *
 * See README for details
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
          topBoundary: null,
          bottomBoundary: null
        }, options);
        
        function bottomBoundary() {
          return $(document).height() - settings.container.offset().top
            - settings.container.attr('offsetHeight');
        }

        function topBoundary() {
          return settings.container.offset().top
        }

        function elHeight(el) {
          return $(el).attr('offsetHeight');
        }
        
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
          settings.topBoundary = topBoundary();
          settings.bottomBoundary = bottomBoundary();
        }

        return this.each(function(index) {

          var el = $(this),
            win = $(window),
            id = Date.now() + index,
            height = elHeight(el);
            
          el.data('sticky-id', id);
          
          win.bind('scroll.stickyscroll-' + id, function() {
            var top = $(document).scrollTop(),
              bottom = $(document).height() - top - height;

            if(bottom <= settings.bottomBoundary) {
              el.offset({
                top: $(document).height() - settings.bottomBoundary - height
              })
              .removeClass('sticky-active')
              .removeClass('sticky-inactive')
              .addClass('sticky-stopped');
            }
            else if(top > settings.topBoundary) {
              el.offset({
                top: $(window).scrollTop()
              })
              .removeClass('sticky-stopped')
              .removeClass('sticky-inactive')
              .addClass('sticky-active');
            }
            else if(top < settings.topBoundary) {
              el.css({
                position: '',
                top: '',
                bottom: ''
              })
              .removeClass('sticky-stopped')
              .removeClass('sticky-active')
              .addClass('sticky-inactive');
            }
          });
          
          win.bind('resize.stickyscroll-' + id, function() {
            if (settings.mode === 'auto') {
              settings.topBoundary = topBoundary();
              settings.bottomBoundary = bottomBoundary();
            }
            height = elHeight(el);
            $(this).scroll();
          })
          
          el.addClass('sticky-processed');
          
          // start it off
          win.scroll();

        });
        
      },
      
      reset : function() {
        return this.each(function() {
          var el = $(this),
            id = el.data('sticky-id');
            
          el.css({
            position: '',
            top: '',
            bottom: ''
          })
          .removeClass('sticky-stopped')
          .removeClass('sticky-active')
          .removeClass('sticky-inactive')
          .removeClass('sticky-processed');
          
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