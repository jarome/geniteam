/*!
 * geniteamwebsite v0.0.1
 * Static files for GeniTeam website
 * (c) 2019 Moons of Jupiter
 * MIT License
 * http://link-to-your-git-repo.com
 */

/* GeniTeam Custom Behaviours **/

(function() {

  // Some Global Vars

  var isSafari = (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1);
  var isMobile = false; //initiate as false

  // device detection
  if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
      || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
      isMobile = true;
  }

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

    // Custom Number Counter - Replacing legacy CountUp jQuery plugin
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

  }));

  $(window).on("load", (function() {
    var wind = $(window);


    // Preloader
    $(".loading").fadeOut(500);

    setTimeout((function() {
      $('body').addClass('loaded');
    }), 700);

    // stellar
    if(isMobile) {
      wind.stellar();
    }

    // contact form validator

    var $contactForm = $('#contact-form');

    $contactForm.validator();

    $contactForm.on("submit", (function(e) {
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
              $contactForm
                .find(".messages")
                .html(alertBox);
              $contactForm[0].reset();
            }
          }
        });
        return false;
      }
    }));
  }));

})();
