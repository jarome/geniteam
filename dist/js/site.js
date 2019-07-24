/*!
 * geniteamwebsite v0.0.1
 * Static files for GeniTeam website
 * (c) 2019 Moons of Jupiter
 * MIT License
 * http://link-to-your-git-repo.com
 */

/*-----------------------------------------------------------------------------------

    Theme Name: Infinity
    Theme URI: http://
    Description: The Multi-Purpose Onepage Template
    Author: themezey
    Author URI: http://themeforest.net/user/themezey
    Version: 1.0

-----------------------------------------------------------------------------------*/

/* ----------------------------------------------------------------

    == Table Of Content

        - scrollIt navbar plugin
        - navbar scrolling background color
        - progress bar
        - sections background image from data background
        - owl-carousel Plugin
            - Testimonials
            - Team
            - Blog
        - Tabs
        - Input Form effects
        - magnificPopup
        - countUp
        - The Map
        - index When Loading
        - Preloader
        - stellar Parallax Background
        - isotope Portfolio Plugin
        - contact form validator

---------------------------------------------------------------- */
var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);

$((function() {
  "use strict";

  var wind = $(window);
  var $body = $('body');

  if (isSafari) {
      $body.addClass('is-safari');
  }

  // scrollIt
  $.scrollIt({
    upKey: 38, // key code to navigate to the next section
    downKey: 40, // key code to navigate to the previous section
    easing: "swing", // the easing function for animation
    scrollTime: 600, // how long (in ms) the animation takes
    activeClass: "active", // class given to the active nav element
    onPageChange: null, // function(pageIndex) that is called when page is changed
    topOffset: -63 // offste (in px) for fixed top navigation
  });

  // navbar scrolling background
  wind.on("scroll", (function() {
    var bodyScroll = wind.scrollTop(),
      navbar = $(".navbar"),
      logo = $(".navbar .logo> img");

    if (bodyScroll > 100) {
      navbar.addClass("nav-scroll");
      logo.attr("src", "img/logo.png");
    } else {
      navbar.removeClass("nav-scroll");
      logo.attr("src", "img/logo.png");
    }
  }));

  // progress bar
  wind.on("scroll", (function() {
    $(".skills-progress span").each((function() {
      var bottom_of_object = $(this).offset().top + $(this).outerHeight();
      var bottom_of_window = $(window).scrollTop() + $(window).height();
      var myVal = $(this).attr("data-value");
      if (bottom_of_window > bottom_of_object) {
        $(this).css({
          width: myVal
        });
      }
    }));
  }));

  // sections background image from data background
  var pageSection = $(".bg-img, section");
  pageSection.each((function(indx) {
    if ($(this).attr("data-background")) {
      $(this).css(
        "background-image",
        "url(" + $(this).data("background") + ")"
      );
    }
  }));



  // === owl-carousel === //

  // Testimonials owlCarousel
  $(".clients .owl-carousel").owlCarousel({
    items: 1,
      nav:true,
    loop: true,
    margin: 0,
    mouseDrag: false,
    autoplay: false,
    smartSpeed: 500
  });

  // Team owlCarousel
  $(".team .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      700: {
        items: 2
      },
      1000: {
        items: 4
      }
    }
  });

  // Blog owlCarousel
  $(".blog .owl-carousel").owlCarousel({
    loop: true,
    margin: 30,
    mouseDrag: false,
    autoplay: true,
    smartSpeed: 500,
    responsiveClass: true,
    responsive: {
      0: {
        items: 1
      },
      700: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });

  // magnificPopup
  $(".gallery").magnificPopup({
    delegate: "a.popimg",
    type: "image",
    gallery: {
      enabled: true
    }
  });


  // Custom Number Counter
  $.fn.countMeUp = function(options) {

      return this.each((function() {

        var $this = $(this),
        countTo = $this.attr('data-count');

        var counterUpper = function() {

          $({countNum: $this.text()}).animate({
            countNum: countTo
          },
          {
            duration: 2000,
            easing: 'linear',
            step: function () {
              $this.text(Math.floor(this.countNum));
            },
            complete: function () {
              $this.text(this.countNum);
            }
          });
        };

      $this.waypoint(counterUpper, { offset: '100%', triggerOnce: true });
    }));

  };

  var $counterElements = $('.js-count');

  $counterElements.countMeUp();

  // Map Toggle
  $(".themap .map-toggle").on("click", (function() {
    $(this).toggleClass("map-opened");

    $(".map").slideToggle();
  }));
}));

// === window When Loading === //

$(window).on("load", (function() {
  var wind = $(window);

  // Preloader
  $(".loading").fadeOut(500);

  // stellar
 // wind.stellar();

  if(!isSafari) {
    $.stellar({
        hideDistantElements: false
    });
  }

  // isotope
  $(".gallery").isotope({
    // options
    itemSelector: ".items"
  });

  var $gallery = $(".gallery").isotope({
    // options
  });

  // filter items on button click
  $(".filtering").on("click", "span", (function() {
    var filterValue = $(this).attr("data-filter");

    $gallery.isotope({ filter: filterValue });
  }));

  $(".filtering").on("click", "span", (function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  }));

  // contact form validator
  $("#contact-form").validator();

  $("#contact-form").on("submit", (function(e) {
    if (!e.isDefaultPrevented()) {
      var url = " ";

      $.ajax({
        type: "POST",
        url: url,
        data: $(this).serialize(),
        success: function(data) {
          var messageAlert = "alert-" + data.type;
          var messageText = data.message;

          var alertBox =
            '<div class="alert ' +
            messageAlert +
            ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' +
            messageText +
            "</div>";
          if (messageAlert && messageText) {
            $("#contact-form")
              .find(".messages")
              .html(alertBox);
            $("#contact-form")[0].reset();
          }
        }
      });
      return false;
    }
  }));
}));

// Slider
$(document).ready((function() {
  var owl = $(".header .owl-carousel");

  // Slider owlCarousel
  $(".slider .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    smartSpeed: 500
  });

  // Slider owlCarousel
  $(".slider-fade .owl-carousel").owlCarousel({
    items: 1,
    loop: true,
    margin: 0,
    autoplay: true,
    smartSpeed: 500,
    animateOut: "fadeOut"
  });

  owl.on("changed.owl.carousel", (function(event) {
    var item = event.item.index - 2; // Position of the current item
    $("h5").removeClass("animated fadeInUp");
    $("h1").removeClass("animated fadeInUp");
    $("p").removeClass("animated fadeInUp");
    $(".buton").removeClass("animated zoomIn");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find("h5")
      .addClass("animated fadeInUp");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find("h1")
      .addClass("animated fadeInUp");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find("p")
      .addClass("animated fadeInUp");
    $(".owl-item")
      .not(".cloned")
      .eq(item)
      .find(".buton")
      .addClass("animated zoomIn");
  }));
}));
