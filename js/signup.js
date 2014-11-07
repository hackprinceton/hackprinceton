// Google Analytics
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
    m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-44449737-1', 'auto');
ga('send', 'pageview');

function invalidTeam(message) {
    team = null;
    $("#team").css("border", "red solid 1px");
    $("#teammessage").text(message)
}

function validTeam() {
    $("#team").css("border", "green solid 1px");
    $("#teammessage").text("Team Open!")
}

$(document).ready(function () {

    // Parse Initialization
    Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");

    // Form submission
    $("#signup").submit(function (event) {
        event.preventDefault();

        // Vaccuum
        var email = $('#email').val().toLowerCase();

        if (email.indexOf("@princeton.edu") < 0) {
            $('#form').hide();
            $('#notPrinceton').show();
            return;
        }


        var user = new Parse.User();


        // Registration form data
        var password = $('#password').val();
        var first = $('#fname').val();
        var last = $('#lname').val();
        var school = $('#school').val();
        var grade = $('#class option:selected').text();
        var gender = $('input[name=gender]:checked').val();
        var major = $('#major').val();
        var type = $('input[name=type]:checked').val();
        var firsthack = $('#firsthack').prop('checked');
        var firsthp = $('#firsthp').prop('checked');
        var past = $('#past').val()
        var comments = $('#comments').val();
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


        // Confirmation form data
        var person_ideas = $('#person_ideas').prop('checked');
        var person_design = $('#person_design').prop('checked');
        var person_hacker = $('#person_hacker').prop('checked');
        var person_all = $('#person_all').prop('checked');
        var ideaGoingIn = $('input[name=goingin]:checked').val();
        var codingExperience = $('input[name=coding]:checked').val();
        var phone = $('#phone').val();
        var diet = $('input[name=diet]:checked').val();
        var referral = $('input[name=referral]:checked').val();
        // read other field of diet
        if (diet == "other") {
            diet = $('#dietOther').val();
        }

        if (referral == "rother") {
            referral = $('#rOther').val();
        }
        user.set("person_ideas", person_ideas);
        user.set("person_design", person_design);
        user.set("person_hacker", person_hacker);
        user.set("person_all", person_all);
        user.set("ideaGoingIn", ideaGoingIn);
        user.set("codingExperience", codingExperience);
        user.set("phone", phone);
        user.set("diet", diet);
        user.set("referral", referral);
        user.set("confirmSubmit", true);
        user.set("attending", true);


        // handle resume data
        var fileUploadControl = $("#fileselect")[0];
        if (fileUploadControl.files.length > 0) {
            $('#confirm').hide();
            $('#loader').show();
            $('#status').text(statuses.resumeUploading);

            var file = fileUploadControl.files[0];

            var name = "resumeF14.pdf";
            if ($('#fileselect').val().indexOf("docx") >= 0) {
                name = "resumeF14.docx";
            }
            var parseFile = new Parse.File(name, file);
            parseFile.save().then(function () {
                // update resume URL
                user.set("resumeURL", parseFile.url());
                user.set("resumeFile", parseFile);

                user.signUp(null, {
                    success: function (user) {
                        // Hide form, ask to validate email
                        $('#form').hide();
                        $('#confirmation').show();
                    },
                    error: function (user, error) {
                        if (error.code === 202) {
                            alert("Email already used to sign up!")
                        } else {
                            alert("Error: " + error.code + " " + error.message);
                        }
                    }
                })
            }, function (error) {
                alert(errors.general);
            });
        }
    });
});
