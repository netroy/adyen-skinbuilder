// (function () {

  // 'use strict';

  var requiredFields = [];
  var fieldLinks = [];
  var errorMessages = [];
  var errorAreas = [];
  var validationFunctions = [];
  var details = [];

  requiredFields["default"] = ["brandCode"];

  var maySubmitOnlyOnce=true;

  var defaultErrMsgs = errorMessages["default"] = [];
  defaultErrMsgs.brandCode = "Please enter your payment details";
  defaultErrMsgs.submitonce = "Your request is being processed, please wait....";

  var locked = false;
  var _valFunc = function () {}; // There was a "new" here... didn't make any sense

  var displayAmountExtras = {};

  function show(detail, actionURL, group, brandCode) {

    if(config.pmmanimation !== 1) {
      if(locked) {
        return false;
      }
      locked = true;
      setTimeout(function() {
        locked = false;
      },1000);
    }

    if(group == "card") {
      brandCode="brandCodeUndef";
    }

    var form = document.forms.pageform;
    form.action=actionURL;
    form.onsubmit=null;

    if(form.addEventListener) {
      form.removeEventListener('submit',_valFunc ,false);
      form.addEventListener('submit',_valFunc = function(e) {
        result = formValidate(form, group);
        if(result === false) {
          e = e || event;
          if(e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      }, false);
    } else {

      form.detachEvent('onsubmit',_valFunc);
      form.attachEvent('onsubmit',_valFunc = function(e) {
        result = formValidate(form, group);
        if(result === false) {
          e = e||event;
          if(e.preventDefault) {
            e.preventDefault();
          } else {
            e.returnValue = false;
          }
        }
      });
    }

    form.brandCode.value = brandCode;
    form.displayGroup.value = group;

    document.getElementById('extraCostAmount').innerHTML = displayAmountExtras[group];

    if(detail !== "") {
        detail.slideit();
        for (i = 0; i < details.length; i++) {
          if (details[i].divId != detail.divId) {
            details[i].slideup();
          }
        }
    }

    // possible selection handler hook
    var selectHandler = "select" + group + "Handler";
    if (eval("typeof " + selectHandler + " === 'function'")) {
      window[selectHandler](detail, actionURL, group, brandCode);
    }

    return false;
  }

  addOnLoad(preventEnterSubmit);

// })();