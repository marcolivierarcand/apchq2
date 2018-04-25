import * as Map from "./map";

window.initMap = Map.initMap;

window.FontAwesomeConfig = { searchPseudoElements: true }

$( document ).ready(function() {
	scroll();
	nav_mobile();
	nav_scroll();



});



// Nav mobile on click ----------------- //
function nav_mobile() {
  $(document).on('click', function(e) {
    if (e.target.id === 'mobile-nav') {
       $( ".mobile-list" ).slideDown( 300);
			 $( "#mobile-nav" ).toggleClass('hide');
			 $( "#mobile-nav-close" ).toggleClass('hide');
    }

		else if(e.target.id === 'mobile-nav-close') {
			$( "#mobile-nav-close" ).toggleClass('hide');
			$( "#mobile-nav" ).toggleClass('hide');
			$( ".mobile-list" ).slideUp( 200);
		}
		 else {
       $( ".mobile-list" ).slideUp( 200);
			 $( "#mobile-nav-close" ).addClass('hide');
			 $( "#mobile-nav" ).removeClass('hide');
    }
	});
};


// Nav fixed on scroll ----------------- //
function scroll(){
	var Nav_height = $( '.Header' ).height();
	$(window).bind('scroll', function () {
		if ($(window).scrollTop() > Nav_height) {
				$( ".nav-fixed" ).fadeIn( 200);
		} else {
				$('.nav-fixed').fadeOut('quick');
				$( "#mobile-nav" ).removeClass('hide');
				$( "#mobile-nav-close" ).addClass('hide');
				$( ".mobile-list" ).css('display','none');
		}
	});
};

function nav_scroll(){
	$('.nav-target').on('click',function(e) {
		e.preventDefault();
		var offset = 100;
		var target = this.hash;
		if ($(this).data('offset') != undefined) offset = $(this).data('offset');
		$('html, body').stop().animate({
			'scrollTop': $(target).offset().top - offset
		}, 500, 'swing', function() {
			// window.location.hash = target;
		});
	});
}



// Video player
var stopVideo;
$('#video-button').on('click', function(){
	videoplayer();
	$(".video-header").fadeIn( 300);
	$(".video-header").css('display','flex');
	$("body").toggleClass('stop');
})

$( document ).on( 'keydown', function ( e ) {
    if ( e.keyCode === 27 ) { // ESC
        $(".video-header").fadeOut(300);
    }
		$('.video-header iframe').attr('src', stopVideo );
		$("body").removeClass('stop');
});

$('.video_close').on('click', function(){
	$(".video-header").fadeOut(300);
	$('.video-header iframe').attr('src', stopVideo );
	$("body").removeClass('stop');
})


// videoplayer();

function videoplayer(){
	var url = $('.video-header iframe').attr('src');

	var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
	var match = url.match(regExp);

	var result = (match&&match[7].length==11)? match[7] : false;

	var longUrl = "https://www.youtube.com/embed/"+result+"?rel=0&amp;autoplay=1";
	stopVideo = "https://www.youtube.com/embed/"+result+"?rel=0&amp;autoplay=0";

	$('.video-header iframe').attr('src', longUrl );
	// return stopVideo;
}
