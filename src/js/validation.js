const ContactFormValidation = (function() {
  const inputs = ["#name", "#email", "#tel", "#message"];

  function init() {
    for (let input of inputs) {
      $(input).on("keyup", checkForEmpty);
      $(input).on("focusout", addOrRemoveValMessage);
    }
    $("#tel").on("keydown", isNumberKey);
  }

  function addOrRemoveValMessage(e) {
    const input = e.target;
    if (input.id === "email") {
      if (!$(input).val() && $(input).hasClass("dirty")) {
        $(input).addClass("invalid");
        $(".error-message").text(
          "Please enter a value for all required fields"
        );
        return;
      }
      if (!validateEmail($("#email").val()) && $("#email").val()) {
        $(input).addClass("invalid");
        $(".error-message").text("Please enter a valid email address");
        return;
      }
      if (validateEmail($("#email").val() && $(input).val())) {
        if ($(input).hasClass("invalid")) {
          $(input).removeClass("invalid");
        }
      }
    } else {
      if (!$(input).val() && $(input).hasClass("dirty")) {
        $(input).addClass("invalid");
        $(".error-message").text(
          "Please enter a value for all required fields"
        );
      } else {
        if ($(input).hasClass("invalid")) {
          $(input).removeClass("invalid");
        }
      }
    }
  }

  function checkForEmpty(e) {
    const input = e.target;
    if (
      $(inputs[0]).val() &&
      $(inputs[1]).val() &&
      $(inputs[2]).val() &&
      $(inputs[3]).val() &&
      validateEmail($("#email").val())
    ) {
      $("#submit").attr("disabled", false);
    } else {
      $("#submit").attr("disabled", true);
    }
    if ($(input).hasClass("pristine")) {
      $(input)
        .removeClass("pristine")
        .addClass("dirty");
    }
    if ($(input).hasClass("invalid") && $(input).val()) {
      $(input).removeClass("invalid");
    }
    if (!$(".invalid").length) {
      $(".error-message").text("");
    }
  }

  function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function isNumberKey(e) {
    const keyCode = window.event ? e.keyCode : e.which;
    if (keyCode < 48 || keyCode > 57) {
      //codes for backspace, delete, enter
      if (keyCode != 0 && keyCode != 8 && keyCode != 13 && !e.ctrlKey) {
        e.preventDefault();
      }
    }
  }

  return {
    init: init
  };
})();

$(document).ready(function() {
  ContactFormValidation.init();
});
