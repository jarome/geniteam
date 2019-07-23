/*!
 * project-name v0.0.1
 * A description for your project.
 * (c) 2019 YOUR NAME
 * MIT License
 * http://link-to-your-git-repo.com
 */

/*----------------------------------------------------*/
/*  Contact Form Section
/*----------------------------------------------------*/
$("#submitt_moeen").click((function(e) {
  //alert();
  document.getElementById("submitt").style.pointerEvents = "none";
  var name = $("#name").val();
  var email = $("#email").val();
  var phone = $("#phone").val();
  var text = $("#text").val();
  text=text.replace(/[^\w\s]/gi, '');
  var dataString =
    "q_name2=" +
    name +
    "&q_email2=" +
    email +
    "&c_phone=" +
    phone +
    "&q_message2=" +
    text;

  //console.log(dataString);

  //ga_calling('Clicked 5 JS Submit Pressed',dataString );
  ga_calling("JS Submit Pressed", dataString);
  e.preventDefault();

  //ga_calling('Quote Request', dataString);

  $(".loading-mask").show();

  //remove iframe from contact div
  $("#contact iframe").remove();

  function isValidEmail(emailAddress) {
    var pattern = new RegExp(
      /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i
    );
    return pattern.test(emailAddress);
  }

  function isValidPhone(phone) {
    var pattern = new RegExp(/^[0-9-]/i);
    return pattern.test(phone);
  }

  if (isValidEmail(email) && text.length >= 2 && name.length > 1) {
    var country = localStorage.getItem("country");
    $.ajax({
      type: "GET",
      //url: "http://www.geniteam.com/site/SAjax_contacPage_s3",// http://www.geniteam.com/site/SAjax
      // url: "http://192.168.0.100/geniteam_svn/site/SAjax_contacPage_s3",// http://www.geniteam.com/site/SAjax
      //data: dataString,
      url:
        "https://n9u3n7tc8g.execute-api.us-east-1.amazonaws.com/Fstagging/helloworld?key1=" +
        name +
        "&key2=" +
        email +
        "&key3=" +
        phone +
        "&key4=" +
        text +
        "&key5=" +
        country +
        "&key6=" +
        window.location.href,
      error: function() {
        $(".loading-mask").hide();

        //ga_calling('Quote Request', "Success");
        ga_calling("Quote Request", dataString);
        //window.location.href = 'thank_you.html';
        $(".alert-success")
          .fadeIn(1000)
          .delay(3000)
          .fadeOut(1000);
        document.getElementById("submitt").style.pointerEvents = "all";
        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("text").value = "";
        document.getElementById("submitt").style.pointerEvents = "all";
      },
      success: function(data) {
        //console.log(data);
        //console.log(data.slice(-1));
        $(".loading-mask").hide();
        //ga_calling('Quote Request', data);
        //ga_calling('Quote Request', "Success");
        ga_calling("Quote Request", dataString);
        //if(data.slice(-1) > 0)
        //{
        //window.location.href = 'thank_you.html';
        $(".alert-success")
          .fadeIn(1000)
          .delay(3000)
          .fadeOut(1000);
        document.getElementById("submitt").style.pointerEvents = "all";

        document.getElementById("name").value = "";
        document.getElementById("email").value = "";
        document.getElementById("phone").value = "";
        document.getElementById("text").value = "";
        /*}
          else
          {
            $('.error_email').fadeIn(1000).delay(3000).fadeOut(1000);
          }*/
      }
    });
  } else {
    document.getElementById("submitt").style.pointerEvents = "all";
    $(".loading-mask").hide();

    //email validation error
    if (!isValidEmail(email))
      $(".error").html("Please enter valid email address");
    else if (0) $(".error").html("Please enter valid Phone Number");
    else if (text.length < 2)
      $(".error").html("Message text should be at least 2 characters");
    else if (name.length <= 1)
      $(".error").html("Name should be at least of 2 characters");

    $(".error")
      .fadeIn(1000)
      .delay(5000)
      .fadeOut(1000);
  }

  return false;
}));

/* For click events on all fields*/
var evt_field_c1 = true;
var evt_field_c2 = true;
var evt_field_filled_c2 = true;
var evt_field_c3 = true;
var evt_field_c4 = true;

$("#name").focus((function() {
  if (evt_field_c1 == true) {
    ga_calling("Clicked 1 Name Field", "");
    evt_field_c1 = false;
  }
}));

$("#email").focus((function() {
  if (evt_field_c2 == true) {
    ga_calling("Clicked 2 Email Field", "");
    evt_field_c2 = false;
  }
}));

$("#email").blur((function() {
  if ($(this).val() != "") {
    ga_calling("Clicked 2.2 Email Filled", $("#email").val());
    // evt_field_filled_c2 = false;
  }
}));

$("#phone").focus((function() {
  if (evt_field_c3 == true) {
    ga_calling("Clicked 3 Phone Field", "");
    evt_field_c3 = false;
  }
}));

$("#text").focus((function() {
  if (evt_field_c4 == true) {
    ga_calling("Clicked 4 Message Field", "");
    evt_field_c4 = false;
  }
}));

function validateEmail() {
  var email = document.getElementById("email").value;
  var re = /\S+@\S+\.\S+/;
  var a = re.test(email);
  if (a) {
    //ga_calling('Clicked 2.2 Email Filled', email);
  }
}
/* For click event on heder links */
function EventOnLoad() {
  //ga_calling('0. Landed on Page', '');
  ga_calling("Landed on Page", "");
}
function ga_calling(type, data) {
  var page_url = $(location).attr("href");
  //ga("send", "event", "geniteam.com", type, page_url + " - " + data, 1);
}
/* For Scroll to specific Section */

var evt_show_1 = true;
var evt_show_2 = true;
var evt_show_3 = true;
var evt_show_4 = true;
var evt_show_5 = true;
var evt_show_6 = true;
var evt_show_7 = true;
var evt_show_8 = true;
var evt_show_9 = true;
var enabledScrollEvent = true;

$(".header").appear((function() {
  if (evt_show_1 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 1. Home", "");
  evt_show_1 = false;
}));
$("#client").appear((function() {
  if (evt_show_2 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 4. Clients", "");
  evt_show_2 = false;
}));
$("#technologies").appear((function() {
  if (evt_show_3 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 5. Technologies", "");
  evt_show_3 = false;
}));
$("#services").appear((function() {
  if (evt_show_4 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 3. Services", "");
  evt_show_4 = false;
}));
$("#aboutus").appear((function() {
  if (evt_show_5 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 2. AboutUs", "");
  evt_show_5 = false;
}));
$("#numbers").appear((function() {
  if (evt_show_6 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 6. Numbers", "");
  evt_show_6 = false;
}));
$("#process").appear((function() {
  if (evt_show_7 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 7. Process", "");
  evt_show_7 = false;
}));
$("#testimonial").appear((function() {
  if (evt_show_8 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 8. Testimonial", "");
  evt_show_8 = false;
}));
$("#contact").appear((function() {
  if (evt_show_9 == true && enabledScrollEvent == true)
    ga_calling("Start Showing: 9. ContactUs", "");
  evt_show_9 = false;
}));

/*
function tp_link(data){
  enabledScrollEvent=false;
  //console.log("Stop Event Log");
  setTimeout(function() {
            enabledScrollEvent=true;
      //console.log("Resume Event Log");
        }, 2000);
  ga_calling(data,'');



}
*/

function tp_link(data, section) {
  enabledScrollEvent = false;
  console.log("Stop Event Log");
  setTimeout((function() {
    enabledScrollEvent = true;
    //console.log("Resume Event Log");
  }), 2000);

  var x = $(section).position();
  //$('html,body').animate({ scrollTop: x.top }, 1500);

  ga_calling(data, "");
}

function ismobile() {
  var check = false;
  (function(a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);
  return check;
}
