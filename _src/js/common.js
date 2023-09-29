/* ===========================================
common.js
=========================================== */
(function($) {
	"use strict";
/* var
------------------------------------- */
	var $win = $(window),
		speed = 300,
		easing = 'swing';


/* smoothScroll
------------------------------------- */
	//scroll speed
	var speed = 500;
	//pagetop btn
	$('a[href="#top"]').on('click', function() {
		$('body,html').animate({ scrollTop: '0' }, speed, 'swing');
		return false;
	});

	$(window).on('load',function(){
		//unchor link in site
		var urlHash = location.hash;
		if(urlHash){
	        var target = $(urlHash);

	        if( !target.length ) { return }

	        var headerHeight = $('.js-header').innerHeight();
	        var position = target.offset().top - headerHeight;
	        $('body,html').animate({ scrollTop:position }, speed, easing);
	    }
	});

    //other link
    $('a[href^="#"]:not([href="#top"]):not(".js-no-scroll")').on('click',function(){
        var href= $(this).attr('href'),
            target = $(href === '#' || href === '' ? 'html' : href);

        if( !target.length ) { return }

        var headerHeight = $('.js-header').innerHeight(),
            position = target.offset().top - headerHeight;
        $('body,html').animate({ scrollTop:position }, speed, easing);
        return false;
    });

/* headerFixed
------------------------------------- */
var startPos = 0,
winScrollTop = 0;
$(window).on('scroll',function(){
	winScrollTop = $(this).scrollTop();
	if( winScrollTop > startPos ) {
		if(winScrollTop >= 200) {
			$('.js-header').addClass('is_active');
		}
	} else if( startPos > winScrollTop ) {
		$('.js-header').removeClass('is_active');
	}
	startPos = winScrollTop;
});

/* pagetop btn
------------------------------------- */
	var $pagetop = $('.js-pagetop'),
		classView = 'is-view';
	$win.on('scroll',function(){
		// fade appear
		if($(this).scrollTop() > 300){
			$pagetop.addClass(classView);
		}else{
			$pagetop.removeClass(classView);
		}

		// stop over footer
		var scrollH = $(document).height();
		var scrollP = $win.height() + $win.scrollTop();
		var footerH = $('.js-footer').innerHeight();
		if(scrollH - scrollP <= footerH){
			$pagetop.css({'position': 'absolute', 'bottom': footerH + 'px'});
		}else{
			$pagetop.removeAttr('style');
		}
	});
})(jQuery);
