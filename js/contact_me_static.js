$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault();
            
            if($form.find('[name=honey]').val()) {
                return;
            }

            var formData = new FormData();
            formData.append('name',$form.find('[name=name]').val());
            formData.append('email',$form.find('[name=email]').val());
            formData.append('message',$form.find('[name=message]').val());
            
            $.ajax({
                url: "https://script.google.com/macros/s/AKfycbyJYeDD-Lq57yfwpPCSz6QLI7gt34fQem5ctMK60Q/exec",
                type: "POST",
                processData: false,
                contentType: false,
                crossDomain: true,
                data: formData,
                
                
            }).done(function(resp) {
                if(resp.result === 'success') {
                    $form.find('#contact-error').hide();
                    $form.find('[type=submit]').hide();
                    $form.find('#contact-success').show();
                }
                else {
                    $form.find('#contact-error').show();
                }
            }).error(function (xhr, status) {
                $form.find('#contact-error').show();
            });

            
            
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

/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
