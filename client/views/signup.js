Template.signup.events = {
  // Submit info
  'click button[type=submit]': function(event) {
    event.preventDefault();
    var email = $('#email').val();
    // password?

    // Personal Information
    var profile = [];

    profile.push({key:"first", value:$('#fname').val()});
    profile.push({key:"last",value:$('#lname').val()});
    profile.push({key:"school",value:$('#school').val()});
    profile.push({key:"class",value:$('#class option:selected').text()});
    profile.push({key:"gender",value:$('input[name=gender]:checked').val()});
    profile.push({key:"major",value:$('#major').val()});
    profile.push({key:"type",value:$('input[name=type]:checked').val()});
    profile.push({key:"firsthack",value:$("#firsthack").checked});
    profile.push({key:"firsthp",value:$("#firsthp").checked});
    profile.push({key:"past",value:$('#past').val()});
    profile.push({key:"comments",value:$('#comments').val()});

    console.log(profile);

    // check for nullity

    // Create account
//    Accounts.createUser({
//      email: email,
//      password: password
//    });
  },

  // Switch to signin form
  'click .switchforms': function(event) {
    Router.go('/signin')
  }

};
