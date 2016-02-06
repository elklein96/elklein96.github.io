$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); 
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; 
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "http://108.24.150.90/scripts/send_email.php",
                type: "POST",
                data:   {
                    recipients:   ["elklein96@gmail.com"],
                    from:         "evan@elkdev.com",
                    subject:      "Someone contacted me! :D",
                    emailBody:    "<p>Contact info: "+name+", "+phone+", "+email+".</p><p>"+message+"</p>"
                },
                cache: false,
                success: function() {
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Thanks for the message, "+firstName+"! </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>I'm sorry " + firstName + ", I'm afraid I can't do that. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    
                    $('#contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


$('#name').focus(function() {
    $('#success').html('');
});
