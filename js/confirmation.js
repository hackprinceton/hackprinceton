$(document).ready(function(){
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
});