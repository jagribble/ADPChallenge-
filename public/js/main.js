$(document).ready(function() {

    $(window).scroll(function() {

        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn(200);
        } else {

            $('.go-top').fadeOut(200);
        }
    });

    // Animate the scroll to top
    $('.go-top').click(function(event) {
        event.preventDefault();
        window.scrollTo(0, 0);
    });
    $(".roll").css("opacity","0.6");

    var role = localStorage.getItem("role");
     $('.card-title:contains("' + role + '")').parent().parent().find('.roll').css("opacity","0.0");
    // ON MOUSE OVER
    $(".landingcard").hover(function () {

    // SET OPACITY TO 70%
    $(this).find('.roll').stop().animate({
        opacity: 0
    }, "fast");
    },


    // ON MOUSE OUT
    function () {
        var role = localStorage.getItem("role");
        if(role !== $(this).find('.card-title').text()){
             var role = localStorage.getItem("role");
             // SET OPACITY BACK TO 50%
            $(this).find('.roll').stop().animate({
                opacity: 0.6
            }, "slow");
            };
        });
   
});