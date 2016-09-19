module.exports = function slider() {
  (function ($) {

    $(function () {
      var $title = $('.title');
      $title.click(function () {
        if ($(this).hasClass('collapsed')) {
          $(this).removeClass('collapsed');
        } else {
          $(this).addClass('collapsed');
        }
      });
    });

    // Adds smooth scroll between anchor points
    $(function () {
      $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: target.offset().top
            }, 300);
            return false;
          }
        }
      });
    });

  })(jQuery);
};
