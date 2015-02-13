(function(window, $) {
  $(function() {
    initInputs();
    initForm();
    initTooltips();
  });

  var initInputs = function() {
    $('div[data-fbuy-state="Facebook Message"] input').keyup(function(e) {
      $('div[data-fbuy-state="Facebook Message"] textarea').val($('div[data-fbuy-state="Facebook Message"] input').val());
    });
    $('div[data-fbuy-state="Facebook Message"] input').trigger('keyup');

    $('div[data-fbuy-state="Twitter Message"] input').keyup(function(e) {
      $('div[data-fbuy-state="Twitter Message"] textarea').val($('div[data-fbuy-state="Twitter Message"] input').val());
    });
    $('div[data-fbuy-state="Twitter Message"] input').trigger('keyup');
  };

  var initForm = function() {
    $('form').submit(function (event) {
      event.stopPropagation();
      event.preventDefault();
      return false;
    });
  };

  var initTooltips = function() {
    $('span.tooltip').bind({
      click: function(e) {
        e.preventDefault();
      },
      mouseenter: function(e) {
        $('p.info').removeClass('hidden');
      },
      mouseleave: function(e) {
        $('p.info').addClass('hidden');
      }
    });
  };

  define('fbuy-data', [], function () {
    return {
      'embed_load_code': "20150128132811cf32",
      'required_messages': {
        'facebook': true,
        'twitter': true,
        'email': true
      },
      'xd_event': 'widget.open'
    };
  });

  define('localized-strings', [], function () {
    var errors = {
      "unauthorized_share_message": "You did not properly authorize your post.",
      "no_known_share_type": "Cannot find an appropriate share type for the data given.",
      "bad_email_in_to_field": "To: field contains an invalid email address.",
      "bad_email_in_from_field": "From: field is not an email address.",
      "empty_share_message": "The message cannot be empty."
    };
    return {
      'errors': errors
    };
  });

  define('customer-info', [], function () {
    return {};
  });
}(window, jQuery));
