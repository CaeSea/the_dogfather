(function() {
  $(document).ready(function() {
    var isSamsungBrowser = navigator.userAgent.match(/SamsungBrowser/i);
    if (isSamsungBrowser && screen.width < 400) {
      $("#gal1").css("display", "none");
      $("#gal2").css("display", "none");
      $(".landing-strip-title-wrapper").css("margin-top", "10px");
    }
  });
})();
