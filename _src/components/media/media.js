module.exports = function media() {
  (function ($) {

    // Makes video clickable for play / pause
    var $video = $('video');
    $video.click(function () {
      if ($video.get(0).paused) {
        $video.get(0).play();
      } else {
        $video.get(0).pause();
      }
    });

    $video.hover(function toggleControls() {
      if (this.hasAttribute("controls")) {
        this.removeAttribute("controls")
      } else {
        this.setAttribute("controls", "controls")
      }
    })

  })(jQuery);
};
