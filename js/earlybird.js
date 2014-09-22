// close teams - done
// update user status

$(document).ready(function(){
    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");

  var TeamList = Parse.Object.extend("Teams");

    var userquery = new Parse.Query(Parse.User);
    var teamquery = new Parse.Query(TeamList);

    var validteams = [3608908, 4879071, 4831771, 5841703,
                    1866292, 9579142, 6869858, 847975,
                    9579142, 595826, 1983338, 6607579,
                    2819347, 9156725, 9542279, 1534651,
                    6983048, 1541156, 196932, 727521,
                    1458476, 4893929, 9426591, 6595889,
                    2174386, 2696326, 6109580, 631985,
                    4497631, 1606347, 1212182, 679963,
                    6616949, 7423357, 5089142, 919797,
                    3434845, 7014843, 7200590, 2593984,
                    6473658, 8479124, 626023, 5975664,
                    7970114, 679963, 9579142, 7182753,
                    7045111, 1134813, 6043603, 5016122,
                    3217739, 5705313, 5495084, 1084202,
                    2803587, 5960751, 9749311, 7475437,
                    25086, 6625455, 9579142, 70843,
                    3173285, 4403159, 2594892, 5090521,
                    7385350, 8551963, 5837153, 2174386,
                    3264700, 8587865, 5669494, 4763226,
                    2473771, 679963, 7897892, 2857748,
                    1714923, 3229576, 5758692, 346408,
                    9194919, 2981780, 7029273, 2314641,
                    7962405, 2592604, 1643873, 8199481,
                    5288733, 1975399, 6719975, 3760682];

    for (var i = 0; i < validteams.length; i++) { // only doing first atm
      var input = validteams[i].toString();

      // Update team status
      teamquery.equalTo("teamcode", input);
      teamquery.first({
        success: function (team) {
          team.set("open", false);
          team.save();
        }
      })

      // Update team members
      userquery.equalTo("team", input);
      userquery.find({
        success: function (members) {
          for (var j = 0; j < members.length; j++) {
             Parse.Cloud.run('earlyBird', {username: members[j].get("username")}, {
                success: function(result) {
                  console.log(result);
                },
                error: function(error) {
                }
            });
          }
        }
      });
    }
});
