// Google Analytics
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-44449737-1', 'auto');
    ga('send', 'pageview');

$(document).ready(function(){
  var TeamList = Parse.Object.extend("Teams");

  $("#signin").submit(function(event){
    event.preventDefault();

    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");
    Parse.User.logIn($('#email').val(), $('#password').val(), {
      success: function(user) {
        // Do stuff after successful login.
        $('#form').hide();
          if (user.get('status') == "Pending") {
              $('#status').text("Your status is still pending. Hold on tight while we get decisions out to you!");
          } else if (user.get('status') == "Accepted" || user.get('status') == "Early Bird. You got the worm!") {
              $('#status').text("Congrats! You've been selected to attend HackPrinceton! Please fill out and *submit* the confirmation form below by Thursday, October 9th.");
              $('#confirm').show();
          }
              
        
        $('#code').text(user.get('team'));
        $('#account').show();
      },
      error: function(user, error) {
        // The login failed. Check error to see why.
        if(error.message == "invalid login parameters") {
          $('.error').text("Incorrect Email or Password");
        } else {
          $('.error').text(error.message);
        }
      }
    });
  }),

  // Team number inputted
  $('#team').on("change keypress", function(event) {
    if (event.type == "keypress") {
      if (event.keyCode == 13) {
        event.preventDefault();
      } else {
        return;
      }
    }

    var user = Parse.User.current();
    var input = $('#team').val();

    if (input === user.get("team")) {
      invalidTeam("Already on team!");
    }

    var query = new Parse.Query(TeamList);
    query.equalTo("teamcode", input);

    query.first({
      success: function(object) {
        if (object == null || object.get("open") == false) {
          invalidTeam("Team not found.");
        } else if (object.get("count") >= 5) {
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


/*$(document).ready(function(){
// Form submission
    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");

  $("#confirm").submit(function(event){
    event.preventDefault();

    var diet = $('#diet').val();
    alert(diet);
    var user = new Parse.User.current();
    alert(user);
    // user.set("diet", "normal");
    // user.set("status", "Pending");

    // if (team == null) {
    //   // create new team, set count to 1
    //   var newTeam = new TeamList();
    //   newTeam.set("teamcode", code)
    //   newTeam.set("open", true)
    //   newTeam.set("count", 1)
    //   newTeam.save();
    //   user.set("team", code);
    // } else {
    //   // increment given team, save
    //   user.set("team", team.get("teamcode"));
    //   team.increment("count");
    //   team.save();
    // }


    user.save(null, {
      success: function(user) {
        // Hide form, ask to validate email
        $("#confirm").hide();
        $("#confirm_done").show();
      },
      error: function(user, error) {
        alert("An error occured.");
      }
    })
  });
});*/