$(document).ready(function () {
  "use strict";

  // 1. Scroll Up
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#back-top").fadeIn("slow");
    } else {
      $("#back-top").fadeOut("slow");
    }
  });

  $("#back-top a").click(function () {
    $("html, body").animate(
      {
        scrollTop: 0,
      },
      800
    );
    return false;
  });
});
