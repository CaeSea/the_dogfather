$(document).ready(function() {
  $(".back-to-top").hide();

  $("a").on("click", function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $("html, body").animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function() {
          window.location.hash = hash;
        }
      );
    }
  });

  $(window).scroll(function() {
    if ($(this).scrollTop() > 150) {
      $(".back-to-top").fadeIn();
    } else {
      $(".back-to-top").fadeOut();
    }
  });

  var timer = null;
  $(window).scroll(function() {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(function() {
      $(".back-to-top").fadeOut();
    }, 2000);
  });
});
