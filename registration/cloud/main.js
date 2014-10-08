// Use Parse.Cloud.define to define as many cloud functions as you want.
// For example:
Parse.Cloud.define("hello", function (request, response) {
  response.success("Hello world!");
});

Parse.Cloud.define("earlyBird", function (request, response) {

  Parse.Cloud.useMasterKey();

  var query = new Parse.Query(Parse.User);
  query.equalTo("username", request.params.username);

  // Get the first user which matches the above constraints.
  query.first({
    success: function(anotherUser) {
      anotherUser.set("status", "Early Bird. You got the worm!");

      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated " + anotherUser.get("username") + ".");
        },
        error: function(another, error) {
          response.error("Could not save changes to user.");
        }
      });
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });

});

Parse.Cloud.define("accept", function (request, response) {

  Parse.Cloud.useMasterKey();

  var query = new Parse.Query(Parse.User);
  query.equalTo("username", request.params.username);

  // Get the first user which matches the above constraints.
  query.first({
    success: function(anotherUser) {
      anotherUser.set("status", "Accepted");

      // Save the user.
      anotherUser.save(null, {
        success: function(anotherUser) {
          // The user was saved successfully.
          response.success("Successfully updated " + anotherUser.get("username") + ".");
        },
        error: function(another, error) {
          response.error("Could not save changes to user.");
        }
      });
    },
    error: function(error) {
      response.error("Could not find user.");
    }
  });

});

Parse.Cloud.beforeSave(Parse.User, function(request, response) {
  var user = request.object;
  if(user.dirty("status")){
    response.error("User status cannot be modified.");
  } else {
    response.success();
  }
});