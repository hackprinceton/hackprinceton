Template.signup.events({
  'click input[type=submit]': function(event) {
    event.preventDefault();
//    var fname = $('#fname').val();
//    var lname = $('#lname').val();
    var email = $('#email').val();
//    var school = $('#school').val();
//    var grade = $('#class option:selected').text();
//    var gender = $('input[name=gender]:checked').val();
//    var major  = $('#major').val();
//    var type = $('input[name=type]:checked').val();
//    var firsthack = $('#firsthack').isChecked();
//    var firsthp = $('#firsthp').isChecked();
//    var past = $('#past').val();
//    var comments = $('#comments').val();

    var profile = {};

    profile.push({
      key:   "first",
      value: $('#fname').val()
    });

    profile.push({
      key:   "last",
      value: $('#lname').val()
    });

    profile.push({
      key:   "school",
      value: $('#school').val()
    });

    profile.push({
      key:   "class",
      value: $('#class option:selected').text()
    });

   profile.push({
      key:   "gender",
      value: $('input[name=gender]:checked').val()
    });

    profile.push({
      key:   "major",
      value: $('#major').val()
    });

    profile.push({
      key:   "type",
      value: $('input[name=type]:checked').val()
    });

    profile.push({
      key:    "firsthack",
      value:  $("#firsthack").isChecked()
    });

    profile.push({
      key:   "firsthp",
      value: $("#firsthp").isChecked()
    });

    profile.push({
      key:   "past",
      value: $('#past').val()
    });

    profile.push({
      key:   "comments",
      value: $('#comments').val()
    });

    // check for nullity

//    Accounts.createUser({
//      email: email,
//      password: password
//    });

    console.log(profile);
  },

  'click .switchforms': function(event) {
    Router.go('/signin')
  }

});
