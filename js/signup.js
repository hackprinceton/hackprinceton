$(document).ready(function(){
  $("#signup").submit(function(event){
    event.preventDefault();

    // Vaccuum
    var email = $('#email').val();
    var password = "hackprinceton"  // CHANGE THIS
    var first = $('#fname').val();
    var last = $('#lname').val();
    var school = $('#school').val();
    var grade = $('#class option:selected').text();
    var gender = $('input[name=gender]:checked').val();
    var major  = $('#major').val();
    var type = $('input[name=type]:checked').val();
    var firsthack = $('#firsthack').prop('checked');
    var firsthp = $('#firsthp').prop('checked');
    var past = $('#past').val()
    var comments = $('#comments').val();
//    // teamname


    // Parse Initialization
    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");
    var user = new Parse.User();
    user.set("username", email);
    user.set("email", email);
    user.set("password", password);
    user.set("first", first);
    user.set("last", last);
    user.set("school", school);
    user.set("grade", grade);
    user.set("gender", gender);
    user.set("major", major);
    user.set("type", type);
    user.set("firsthack", firsthack);
    user.set("firsthp", firsthp);
    user.set("past", past);
    user.set("comments", comments);


    user.signUp(null, {
      success: function(user) {
        // Hide form, ask to validate email
      },
      error: function(user, error) {
        if (error.code === 202) {
          alert("Email already used to sign up!")
        } else {
          alert("Error: " + error.code + " " + error.message);
        }
      }
    })
  });
});

