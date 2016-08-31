// Pre-loader config
$(document).ready(function () {

 // Height of Challenges Config
 var height = $('#Health').height();
 // If Hunger is bigger, height = hunger
 if($('#Hunger').height() > height) {
 height = $('#Hunger').height();
}
 else if($('#CYO').height() > height) {
   height = $('#CYO').height();
 }
 // Set all heights to the biggest
 $('#Hunger').css('min-height', height );
 $('#Health').css('min-height', height );
 $('#CYO').css('min-height', height + 85.5);

// On each button click - Set Local storage to record role
$( "#BA" ).click(function() {
  var role = localStorage.getItem("role");
  $('.card-title:contains("' + role + '")').parent().parent().find('.roll').css("opacity","0.6");
  localStorage.setItem("role", "Business Analyst");
  checkRole();
  showRole(true);
});

$( "#SA" ).click(function() {
   var role = localStorage.getItem("role");
  $('.card-title:contains("' + role + '")').parent().parent().find('.roll').css("opacity","0.6");
  localStorage.setItem("role", "Systems Analyst");
  checkRole();
  showRole(true);
});

$( "#DEV" ).click(function() {
   var role = localStorage.getItem("role");
  $('.card-title:contains("' + role + '")').parent().parent().find('.roll').css("opacity","0.6");
  localStorage.setItem("role", "Developer");
  checkRole();
  showRole(true);
});

// On document ready - Trigger checkRole()
	countVisits();
  checkRole();
  if(localStorage.getItem('role')) $('#iama').text('I am a ' + localStorage.getItem('role'))
});

// Identify your role and show the correct section
function checkRole() {
	var role = localStorage.getItem("role");
	if (role === "Developer") {
    $("#sa_overview").hide();
    $("#ba_overview").hide();
    $("#dev_overview").show();
    $("#hack").show();
    $("#howToApply").hide();
  }
  else if (role === "Systems Analyst") {
    $("#hack").hide();
    $("#dev_overview").hide();
    $("#ba_overview").hide();
    $("#sa_overview").show();
    $("#howToApply").show();
  }
  else if (role === "Business Analyst") {
    $("#dev_overview").hide();
    $("#sa_overview").hide();
    $("#ba_overview").show();
    $("#hack").hide();
    $("#howToApply").show();
  }
  else {
    //default
    $("#dev_overview").hide();
    $("#sa_overview").hide();
    $("#ba_overview").hide();
    $('#hack').hide();
    $("#howToApply").hide();
  }

}

//update the I am a... text to reflect role selected
var showRole = function(makeToast) {
    $('#iama')
    //fade out current role
    .fadeOut(750)
    //queue text change (makes sure text has faded out before changing text)
    .queue(function() {
      //change text to reflect selected role
      $('#iama').text('I am a ' + localStorage.getItem('role')).dequeue();
    })
    //fade text back in
    .fadeIn(750);

    if(makeToast) Materialize.toast('Website Content Changed!', 4000);
}


// Count how many times the user has visited the page
function countVisits(){
  str_count = localStorage.getItem("visits");
    //get a numeric value from str_count, put it in count
    if (str_count == null || str_count == "null"){
      count = 0;
    } else {
      count = parseInt(str_count);
    }
    //increment count
    count++;
    //store count
    localStorage.setItem("visits", count);
    console.log(count);
  } // end count

// Check if the user is a Mobile user
/*function mobileCheck() {
  // Check if Mobile - NOT CURRENTLY IN USE
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      $('#overview').text("Mobile Detected!");// Insert here mobile view (Buttons)
  }
  else {
      $('#cards').show(); // Insert here Standard view (Cards)
  }
}*/
