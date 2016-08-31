// Animates the user down to the 'hacksection'
$(document).ready(function(){
	$('#DEV').on('click',function (e) {
	    $('html, body').stop().animate({
	        'scrollTop': $('#hack').offset().top
	    }, 900, 'swing', function () {

	    });
	});
	$('#SA').on('click',function (e) {
	    $('html, body').stop().animate({
	        'scrollTop': $('#genral_overview').offset().top
	    }, 900, 'swing', function () {

	    });
	});
	$('#BA').on('click',function (e) {
	    $('html, body').stop().animate({
	        'scrollTop': $('#genral_overview').offset().top
	    }, 900, 'swing', function () {

	    });
	});
});
