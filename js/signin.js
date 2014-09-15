function invalidTeam(message) {
  team = null;
  $("#team").css("border","red solid 1px");
  $("#teammessage").text(message)
}

function validTeam() {
  $("#team").css("border","green solid 1px");
  $("#teammessage").text("Team successfully joined!")
}

$(document).ready(function(){
  var TeamList = Parse.Object.extend("Teams");

  $("#signin").submit(function(event){
    event.preventDefault();

    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");
    Parse.User.logIn($('#email').val(), $('#password').val(), {
      success: function(user) {
        // Do stuff after successful login.
        $('#form').hide();
        $('#status').text(user.get('status'));
        $('#code').text(user.get('team'));
        $('#account').show();
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
      }
    });
  }),

  // Team number inputted
  $('#team').change(function(event) {
    var user = Parse.User.current();
    var input = $('#team').val();

    if (input === user.get("team")) {
      invalidTeam("Already on team!");
    }

    var query = new Parse.Query(TeamList);
    query.equalTo("teamcode", input);

    query.first({
      success: function(object) {
        if (object == null) {
          invalidTeam("Team not found.");
        } else if (object.get("count") > 5) {
          invalidTeam("Team already full!");
        } else {

          var teamQuery = new Parse.Query(TeamList);
          teamQuery.equalTo("teamcode", user.get("team"));
          teamQuery.first({
              success: function(team) {
                team.increment("count", -1);
                team.save();
              },
              error: function(error) {
                invalidTeam("Error: " + error.code + " " + error.message);
              }
            });

            user.set("team", object.get("teamcode"));
            user.save(null, {
              success: function(temp) {
                  validTeam();
                  object.increment("count");
                  object.save();
              },
              error: function(user, error) {
                invalidTeam("Error: " + error.code + " " + error.message);
              }
            })
        }
      },
      error: function(error) {
        invalidTeam("Error: " + error.code + " " + error.message);
      }
    });
  });
})
