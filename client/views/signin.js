Template.signin.events = {
  'click button[type=submit]': function(event) {
    event.preventDefault();
    var email = $('#email').val()
    var code  = $('#password').val()
    var remember = $('#remember').checked

    // values drawn in correctly
    Meteor.loginWithPassword(email, code, function(err){
        if(err) {
          console.log(err);
          throwError(err.reason);
        } else {
          Router.go('/profile');
        }
      });
  },

  'click .switchforms': function(event) {
    Router.go('/signup');
  }
};
