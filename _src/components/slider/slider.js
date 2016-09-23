module.exports = function slider() {
  (function ($) {

    $(function () {
      var $fold = $('.fold');
      var $code = $('.code, .usage');

      $fold.click(function () {
        if ($(this).prev($code).hasClass('collapsed')) {
          $(this).prev($code).removeClass('collapsed');
        } else {
          $(this).prev($code).addClass('collapsed');
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
