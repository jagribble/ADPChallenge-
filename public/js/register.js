//in doc ready, check if someone has already registered by seeing if cookie exists
$( document ).ready(function() {
  if(getcookie('hackName') != "") {
    $('#register').empty(); //clear our registration form div as registered users shouldn't see the register form
    $('#welcome').html('<h6>Welcome back, ' + getcookie('hackName')+'</h6>');    //greet returning user

  }

  $('#part2').hide();

});

function regbut() {
  if($('#regbutton').attr('data-toggle') === 'true') {
    $('#regbutton').attr('data-toggle','false');
    $('#regbutton').text('Remove participant');
    $('#part2').show();
  } else {
    $('#regbutton').attr('data-toggle','true');
    $('#regbutton').text('Add participant');
    $('#part2').hide();
  }
}

function create() {
  $.ajax({
    url: "/create",   //our endpoint in routes for creating a new record
    type: 'POST',
    dataType: "json",
    //data is a JSON object that will contain all of the above form's inputs (these params are declared in registration.js)
    data: {'idea' : $('#idea').val(),
    'uni' : $('#uni').val(),
    'name1' : $('#name1').val(),
    'name2' : $('#name2').val(),
    'email1' : $('#email1').val(),
    'email2' : $('#email2').val(),
  },
  success: function ( data ){
    if(data === 'success') {
      $('#register').empty(); //clear our registration form div
      $('#register').html('Thanks for registering, ' + getcookie('hackName')); //grab the cookie set in authenticated-routes /create to display registrants' names
      console.log(getcookie('hackName'));
    }
    else {
      $('errors').html('You missed some fields');
      if(!$('#idea').val()) {
        $("label[for='idea']").css('color','red');
      } else {
        $("label[for='idea']").css('color','');
      }
      if(!$('#uni').val()) {
        $("label[for='uni']").css('color','red');
      } else {
        $("label[for='uni']").css('color','');
      }
      if(!$('#name1').val()) {
        $("label[for='name1']").css('color','red');
      } else {
        $("label[for='name1']").css('color','');
      }
      if(!$('#name2').val()) {
        $("label[for='name2']").css('color','red');
      } else {
        $("label[for='name2']").css('color','');
      }
      if(!$('#email1').val()) {
        $("label[for='email1']").css('color','red');
      } else {
        $("label[for='email1']").css('color','');
      }
      if(!$('#email2').val()) {
        $("label[for='email2']").css('color','red');
      } else {
        $("label[for='email2']").css('color','');
      }
    }

},
error: function ( data ){
  $('#register').empty(); //clear our registration form div
  $('#register').html('Oops, there was an error.'); //show an error message
  console.log('error');
}
});
}

function getcookie(cname) { //this function will get the cookie from the client that was stored by /create POST
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return decodeURI(c.substring(name.length, c.length)); //return decoded cookie value (remove %20)
    }
  }
  return "";
}
