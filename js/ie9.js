(function(window, $) {
  $(function() {
    initPlaceholders();
  });

  initPlaceholders = function() {
    $.getScript('//cdnjs.cloudflare.com/ajax/libs/jquery-placeholder/2.0.7/jquery.placeholder.min.js', function () {
      $('input, textarea').placeholder();
    });
  };

}(window, jQuery));
