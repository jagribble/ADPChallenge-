$( document ).ready(function() {
	$('.card .show-button').click(function(){
		if($(this).text() === 'Show more'){
			$(this).parent().find('.extended-card').show(500);
			$(this).text('Show less');
		}
		else{
			$(this).parent().find('.extended-card').hide(500);
			$(this).text('Show more');
		}
		
	});
});