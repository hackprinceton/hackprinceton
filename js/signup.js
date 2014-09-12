function invalidTeam(message) {
  team = null;
  $("#team").css("border","red solid 1px");
  $("#teammessage").text(message)
}

function validTeam() {
  $("#team").css("border","green solid 1px");
  $("#teammessage").text("Team Open!")
}

$(document).ready(function(){

  // Parse Initialization
  Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");
  var TeamList = Parse.Object.extend("Teams");

  // Setup user's individual team number
  var team = null;
  var code = Math.floor((Math.random() * 10000000) + 1).toString();
  $('#code').text(code);

  // Team number inputted
  $('#team').change(function(event) {
    var input = $('#team').val();
    var query = new Parse.Query(TeamList);
    query.equalTo("teamcode", input);

    query.first({
      success: function(object) {
        team = object;
        if (object == null) {
          invalidTeam("Team not found.");
        } else if (object.get("count") > 5) {
          invalidTeam("Team already full!");
        } else {
          team = object;
          validTeam();
        }
      },
      error: function(error) {
        invalidTeam("Error: " + error.code + " " + error.message);
      }
    });
  });

  // Form submission
  $("#signup").submit(function(event){
    event.preventDefault();

    // Vaccuum
    var email = $('#email').val();
    var password = $('#password').val();
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

    if (team == null) {
      // create new team, set count to 0
      var newTeam = new TeamList();
      newTeam.set("teamcode", code)
      newTeam.set("count", 0)
      newTeam.save();
      user.set("team", code);
    } else {
      // increment given team, save
      user.set("team", team.get("teamcode"));
      team.increment("count");
      team.save();
    }


    user.signUp(null, {
      success: function(user) {
        // Hide form, ask to validate email
        $('#form').hide();
        $('#confirmation').show();
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

