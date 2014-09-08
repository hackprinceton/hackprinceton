Template.signin.events({
  'click input[type=submit]': function(event) {
    event.preventDefault();
    var email = $('#email').val()
    var code  = $('#code').val()
    // remember me?
//    Meteor.loginWithPassword(email, code, function(err){
//        if(err){
//          console.log(err);
//          throwError(err.reason);
//        }
//      });

    var testing = {}
    testing.push({
      key:"email",
      value:email
    });

    testing.push({
      key:"code",
      value:code
    });
    console.log(email);
    console.log(code);
    console.log(profile);
  },

  'click .switchforms': function(event) {
    Router.go('/signup');
  }
});
