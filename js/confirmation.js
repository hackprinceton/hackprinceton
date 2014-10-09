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
})(window, document, 'script', 'http://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-44449737-1', 'auto');
ga('send', 'pageview');

$(document).ready(function () {
    var TeamList = Parse.Object.extend("Teams");

    $("#signin").submit(function (event) {
        event.preventDefault();

        Parse.initialize("VQpQwojL2wjTuNkUDzV0C2wAiQODWJw90cRKtP3Q", "yR5gVtaYrmMyjzTck1bLuvqRinqUrMnAoPqITysH");
        Parse.User.logIn($('#email').val(), $('#password').val(), {
            success: function (user) {
                btnclick = false;

                // Do stuff after successful login.
                $('#form').hide();
                if (user.get('status') == "Pending") {
                    $('#status').text("Status: Waitlisted - We've received an incredible amount of applications this year (over 2500). We'll be letting people off the waitlist in the coming weeks, so hold on tight!");
                    btnclick = true;
                } else if (user.get('status') == "Accepted" || user.get('status') == "Early Bird. You got the worm!" || user.get('school') == "Princeton University") {
                    if (!user.get('confirmSubmit')) {
                        $('#status').text("Congratulations! We'd like to invite you to attend HackPrinceton! Please fill out and *submit* the confirmation form below by Friday, October 17th.");
                        $('#attend').show();
                        $('#confirm').show();
                    } else {
                        $('#status').text("We've already received your response. If you need to make changes, please email hackprinceton@princetoneclub.com!");
                        btnclick = true;
                    }
                } else {
                    $('#status').text("Your status is still pending. Hold on tight while we get decisions out to you!");
                    btnclick = true;
                }

                $('#code').text(user.get('team'));
                $('#account').show();
            },
            error: function (user, error) {
                // The login failed. Check error to see why.
                if (error.message == "invalid login parameters") {
                    $('.error').text("Incorrect Email or Password");
                } else {
                    $('.error').text(error.message);
                }
            }
        });
    }),

    $("#attend").submit(function (event) {
        event.preventDefault();

        var attendance = $('input[name=attendance]:checked').val();

        var user = Parse.User.current();

        // update the Parse.User object
        var attend = false;

        if (attendance == "yes") {
            attend = true;
        } else {
            user.set("confirmSubmit", true);
        }

        user.set("attending", attend);


        user.save(null, {
            success: function (temp) {
                $('#attend').hide();
                if (attend) {
                    $('#confirm').show();
                    $('#status').text("");
                } else {
                    $('#status').text("Thanks for your response! We hope to see you at HackPrinceton next Spring!");
                    btnclick = true;
                }
            },
            error: function (user, error) {
                alert("An error occured. Please email hackprinceton@princetoneclub.com");
            }
        })
    }),

    $("#confirm").submit(function (event) {
        event.preventDefault();

        $('#attend').hide();

        // read in form inputs
        var person_ideas = $('#person_ideas').prop('checked');
        var person_design = $('#person_design').prop('checked');
        var person_hacker = $('#person_hacker').prop('checked');
        var person_all = $('#person_all').prop('checked');
        var ideaGoingIn = $('input[name=goingin]:checked').val();
        var codingExperience = $('input[name=coding]:checked').val();
        var phone = $('#phone').val();
        var diet = $('input[name=diet]:checked').val();
        var referral = $('input[name=referral]:checked').val();

        var user = Parse.User.current();

        // read other field of diet
        if (diet == "other") {
            diet = $('#dietOther').val();
        }

        if (referral == "rother") {
            referral = $('#rOther').val();
        }

        // update the Parse.User object
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

        user.save(null, {
            success: function (temp) {
                if (typeof file === 'undefined') {
                    btnclick = true;
                    $('#confirm').hide();
                    $('#status').text("Thanks for your response! We're excited to see you here!");
                }


            },
            error: function (user, error) {
                alert("An error occured. Please email hackprinceton@princetoneclub.com");
            }
        })

        // handle resume data
        var fileUploadControl = $("#fileselect")[0];
        if (fileUploadControl.files.length > 0) {
            $('#confirm').hide();
            $('#loader').show();
            $('#status').text("***PLEASE WAIT*** Resume Uploading");

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

                user.save(null, {
                    success: function (temp) {
                        btnclick = true;
                        $('#loader').hide();
                        $('#status').text("Thanks for your response! We're excited to see you here!");
                    },
                    error: function (user, error) {
                        alert("An error occured. Please email hackprinceton@princetoneclub.com");
                    }
                })
            }, function (error) {
                alert("An error occured. Please email hackprinceton@princetoneclub.com");
            });
        }
    });
})
