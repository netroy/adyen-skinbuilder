var collapsecard = new animatedcollapse("pmmdetails-card", 1000, false, false, config["pmmanimation"]==1?false:true);
details.push(collapsecard);
displayAmountExtras['card'] = "";
addOnLoad(function () {
  setTimeout("show(collapsecard, 'completeCard.shtml', 'card', 'brandCodeUndef')",100);
});

if (notNull(document.getElementById('pmmform-card'))) {
  document.getElementById('pmmform-card').setAttribute("autocomplete","off");
}

// useNewCardId = true, groupName = card
requiredFields["card"] = new Array();
requiredFields["card"].push( "card.cardHolderName" );
requiredFields["card"].push( "card.cardNumber" );
requiredFields["card"].push( "card.expiryMonth" );
requiredFields["card"].push( "card.expiryYear" );
errorMessages["card"] = new Array();
errorMessages["card"][ "card.cardHolderName" ] = "Card Holder Name missing";
errorMessages["card"][ "card.cardNumber" ] = "Card Number invalid or missing";
errorMessages["card"][ "card.expiryMonth" ] = "Expiry Month missing";
errorMessages["card"][ "card.expiryYear" ] = "Expiry Year missing";
errorMessages["card"][ "card.cvcCode" ] = "CVC/CVV/CID missing";
errorMessages["card"]["generic"] = "Please enter your card details";

var card_cvcinfo = new Array();
card_cvcinfo["mc"] =  "<h3>What is CVC?<\/h3>" +
                    "<p><img style=\"margin-right: 5px\" class=\"fl\" src=\"/hpp/img/CVC_mini.jpg\" alt=\"CVC location\" />" +
          "The Card Validation Code (CVC) is an <i>additional<\/i> " +
          "three-digit security code that is printed (not embossed) on the back " +
          "of your card.<\/p>" +
          "<p>The CVC is an extra security measure to ensure that you are in possession of the card.<\/p><br style=\"clear: both\" />";
card_cvcinfo["maestro"] = "<h3>What is CVC?<\/h3>" +
                    "<p><img style=\"margin-right: 5px\" class=\"fl\" src=\"/hpp/img/CVC_mini.jpg\" alt=\"CVC location\" />" +
          "The Card Validation Code (CVC) is an <i>additional<\/i> " +
          "three-digit security code that is printed (not embossed) on the back " +
          "of your card.<\/p>" +
          "<p>The CVC is an extra security measure to ensure that you are in possession of the card." +
                      " " +           "<\/p><br style=\"clear: both\" />";
card_cvcinfo["visa"] =  "<h3>What is CVV?<\/h3>" +
                    "<p><img style=\"margin-right: 5px\" class=\"fl\" src=\"/hpp/img/CVV_mini.jpg\" alt=\"CVV location\" />" +
          "The Card Verification Value (CVV) is an <i>additional<\/i> " +
          "three-digit security code that is printed (not embossed) on the back " +
          "of your card.<\/p>" +
          "<p>The CVV is an extra security measure to ensure that you are in possession of the card.<\/p><br style=\"clear: both\" />";
card_cvcinfo["amex"] =  "<h3>What is CID?<\/h3>" +
                    "<p><img style=\"margin-right: 5px\" class=\"fl\" src=\"/hpp/img/CID_mini.jpg\" alt=\"CID location\" />" +
          "The Card IDentification (CID) is an <i>additional<\/i> " +
          "four-digit security code that is printed (not embossed) on the front " +
          "of your card.<\/p>" +
          "<p>The CID is an extra security measure to ensure that you are in possession of the card.<\/p><br style=\"clear: both\" />";
card_cvcinfo["card"] =  "<h3>What is CVC\/CVV\/CID?<\/h3>" +
                    "<p>The Card Security Code (CVC\/CVV\/CID) is an <i>additional<\/i> " +
          "three or four digit security code that is printed (not embossed) on the front or the back " +
          "of your card.<\/p>" +
          "<p>The CVC\/CVV\/CID is an extra security measure to ensure that you are in possession of the card.<\/p><br style=\"clear: both\" />";

// pass these arround, instead of just using
var card_types = new Array();
var card_logos = new Array();
var card_displayAmountExtras = new Array();
var card_extras = new Array();
var card_previousCardNumber ="";
var card_subVariantExtras = new Object();
var card_subVariantExtrasPhrase = new Object();
var card_extraCostDivId = 'pmmextracosts-card';
var card_originalExtraCostPhrase = document.getElementById(card_extraCostDivId).innerHTML;


card_types.push("diners");
card_logos.push("/img/pm/diners");
card_displayAmountExtras.push("");
card_extras.push("");

card_subVariantExtras['diners'] = "";
card_subVariantExtrasPhrase['diners'] = "";
card_types.push("amex");
card_logos.push("/img/pm/amex");
card_displayAmountExtras.push("");
card_extras.push("");

card_subVariantExtras['amex'] = "";
card_subVariantExtrasPhrase['amex'] = "";
card_types.push("mc");
card_logos.push("/img/pm/mc");
card_displayAmountExtras.push("");
card_extras.push("");

card_subVariantExtras['mcatm'] = "";
card_subVariantExtrasPhrase['mcatm'] = "";
card_subVariantExtras['mccredit'] = "";
card_subVariantExtrasPhrase['mccredit'] = "";
card_subVariantExtras['mc'] = "";
card_subVariantExtrasPhrase['mc'] = "";
card_subVariantExtras['maestro'] = "";
card_subVariantExtrasPhrase['maestro'] = "";
card_subVariantExtras['bijcard'] = "";
card_subVariantExtrasPhrase['bijcard'] = "";
card_subVariantExtras['cirrus'] = "";
card_subVariantExtrasPhrase['cirrus'] = "";
card_subVariantExtras['bcmc'] = "";
card_subVariantExtrasPhrase['bcmc'] = "";
card_subVariantExtras['mcpro'] = "";
card_subVariantExtrasPhrase['mcpro'] = "";
card_subVariantExtras['mcdebit'] = "";
card_subVariantExtrasPhrase['mcdebit'] = "";
card_subVariantExtras['mccorporate'] = "";
card_subVariantExtrasPhrase['mccorporate'] = "";
card_subVariantExtras['mccommercialcredit'] = "";
card_subVariantExtrasPhrase['mccommercialcredit'] = "";


var baseURL = "/hpp/";
if(baseURL.indexOf(";jsession") != -1) {
  baseURL = baseURL.substr(0,baseURL.indexOf(";jsession"));
}

function card_validateCcNumber(e, groupName, group_types, group_logos, group_subVariantExtras, group_subVariantExtrasPhrase, dontHideErrorFrame) {
  cardNumber = (document.getElementById( 'card.cardNumber' ).value);

  // empty card field - reset all
  if (cardNumber.length == 0) {
    card_previousCardNumber = cardNumber;
    card_resetExtraCost(groupName);
    card_setCardBrand(null, false, groupName, group_types, group_logos);
    return;
  }

  // When editing the card (but not adding digits at the end), don't display validation error(s) and don't reformat the number
  var l=0;
  while(l < card_previousCardNumber.length && l < cardNumber.length) {
    if(cardNumber[l] != card_previousCardNumber[l]) {
      card_previousCardNumber = cardNumber;
      return;
    }
    l++;
  }

  // remove all whitespace
  reg = /\s+/g;
  cardNumber = cardNumber.replace(reg,'');

  nrOfDigits = cardNumber.length;
  if(nrOfDigits > 19){
    card_ccNumberPresentation(false, groupName);
    return;
  }

  card_ccNumberPresentation(true, groupName, dontHideErrorFrame);

  baseCard = getBaseCard(cardNumber, group_types);
  if(baseCard != null) {
      card_setCardBrand(baseCard, true, groupName, group_types, group_logos);
  } else if(nrOfDigits > 4) {
      card_setCardBrand(null, true, groupName, group_types, group_logos);
    card_ccNumberPresentation(false,groupName);
  } else {
    card_setCardBrand(null, false, groupName, group_types, group_logos);
  }

  if (nrOfDigits < 6) {
    card_setExtraCost(baseCard, null, groupName, group_types, group_subVariantExtras, group_subVariantExtrasPhrase);
  } else if (nrOfDigits == 6 || nrOfDigits == 9 || nrOfDigits == 12 || nrOfDigits == 16){
    _.X("/hpp/binLookup.shtml",function(d,r){
      if(r.status != 200 || d.indexOf('"result"') == -1) return false;
            var response=eval("("+d+")");

      if(typeof(response.result)=='undefined') return false;

      if (response.result == 0) {
        lookedUpCardType = response.cardType;
      } else {
        lookedUpCardType = null;
      }
      card_setExtraCost(baseCard, lookedUpCardType, groupName, group_types, group_subVariantExtras, group_subVariantExtrasPhrase);

      return true;
        }, 'bin='+cardNumber+'&'+_.Q(_.G("pageform")));
  }

  //show value with white space after four numbers
  result = cardNumber.replace(/(\d{4})/g, '$1 ');
  result = result.replace(/\s+$/, ''); //remove trailing spaces

  card_previousCardNumber = result;
  document.getElementById( 'card.cardNumber' ).value = result;
}

function card_setExtraCost(selectedCard, lookedUpCard, groupName, group_types, group_subVariantExtras, group_subVariantExtrasPhrase) {
  var extraCostDisplayed = false;
  if (lookedUpCard != null && group_subVariantExtras[lookedUpCard] != null) {
    document.getElementById('extraCostAmount').innerHTML = group_subVariantExtras[lookedUpCard];
    displayAmountExtras[groupName] = group_subVariantExtras[lookedUpCard];
    document.getElementById(card_extraCostDivId).innerHTML = group_subVariantExtrasPhrase[lookedUpCard];
    extraCostDisplayed = true;
  } else {
              for(var i = 0; i < group_types.length; ++i) {
        if(selectedCard != null && group_types[i] == selectedCard.cardtype && group_subVariantExtras[selectedCard.cardtype] != null) {
        document.getElementById('extraCostAmount').innerHTML = group_subVariantExtras[selectedCard.cardtype];
        displayAmountExtras[groupName] = group_subVariantExtras[selectedCard.cardtype];
        document.getElementById(card_extraCostDivId).innerHTML = group_subVariantExtrasPhrase[selectedCard.cardtype];
        extraCostDisplayed = true;
        }
        }
  }

  if (!extraCostDisplayed) {
    card_resetExtraCost(groupName);
  }
}

function card_resetExtraCost(groupName) {
  // groupName is not used anymore
  displayAmountExtras['card'] = "";
  document.getElementById('extraCostAmount').innerHTML = "";
  document.getElementById(card_extraCostDivId).innerHTML = card_originalExtraCostPhrase;
}

function card_setCardBrand(selectedCard, greyInactive, groupName, group_types, group_logos) {

  for(var i = 0; i < group_types.length; ++i) {
      var imageId =  'card.cclogo'  + i;
    if(selectedCard != null && group_types[i] == selectedCard.cardtype) {
      document.getElementById(imageId).src=baseURL + group_logos[i] + "_small.png";
    } else {
        if(greyInactive) {
        document.getElementById(imageId).src=baseURL + group_logos[i] + "_small_grey.png";
      } else {
        document.getElementById(imageId).src=baseURL + group_logos[i] + "_small.png";
      }
    }
    document.getElementById(imageId).style.display="inline";
  }

  card_setCvcElement(selectedCard != null ? selectedCard.cardtype : null, groupName);
}

function card_setCvcElement(selectedCardType, groupName) {
  // for tokenising, the cvc element is not displayed, so check before using it
  var cvcCodeElem = document.getElementById( 'card.cvcCode' );
  if(selectedCardType != null && cvcCodeElem != null) {
    if(selectedCardType == "amex") {
    cvcCodeElem.maxLength = 4;
    document.getElementById( 'card.cvcName' ).innerHTML = "CID";
    document.getElementById( 'card.cvcWhatIs' ).innerHTML = "What is CID?";
    document.getElementById( 'card.cvcFrame' ).innerHTML = card_cvcinfo["amex"];
    } else if (selectedCardType == "visa" || selectedCardType == "electron") {
      cvcCodeElem.maxLength = 3;
    document.getElementById( 'card.cvcName' ).innerHTML = "CVV";
    document.getElementById( 'card.cvcWhatIs' ).innerHTML = "What is CVV?";
    document.getElementById( 'card.cvcFrame' ).innerHTML = card_cvcinfo["visa"];
    } else if (selectedCardType == "mc" || selectedCardType == "maestrouk" || selectedCardType == "solo" || selectedCardType == "bijcard" || selectedCardType == "elo") {
      cvcCodeElem.maxLength = 3;
    document.getElementById( 'card.cvcName' ).innerHTML = "CVC";
    document.getElementById( 'card.cvcWhatIs' ).innerHTML = "What is CVC?";
    document.getElementById( 'card.cvcFrame' ).innerHTML = card_cvcinfo["mc"];
    } else if (selectedCardType == "maestro") {
              cvcCodeElem.maxLength = 3;
    document.getElementById( 'card.cvcName' ).innerHTML = "CVC <i></i>";
    document.getElementById( 'card.cvcWhatIs' ).innerHTML = "What is CVC?";
    document.getElementById( 'card.cvcFrame' ).innerHTML = card_cvcinfo["maestro"];
    } else {
      cvcCodeElem.maxLength = 3;
    document.getElementById( 'card.cvcName' ).innerHTML = "CVC";
    document.getElementById( 'card.cvcWhatIs' ).innerHTML = "What is CVC?";
    document.getElementById( 'card.cvcFrame' ).innerHTML = card_cvcinfo[groupName];
    }
  }
}


function card_ccNumberPresentation(valid, groupName, dontHideErrorFrame){
  // groupName is not used anymore
  var errors = new Array();
  errors.push( 'card.cardNumber' );
  if(valid){
    clearErrors(errors, dontHideErrorFrame);
  }
  else{
    markErrorFields(errors);
  }
}

function card_doCCCheck(groupName){
  // groupName is not used anymore
  var cardNumberField = document.getElementById( 'card.cardNumber' );
  if(card_isCardNumberValid(cardNumberField)) {
    card_ccNumberPresentation(true,groupName);
  } else {
    card_ccNumberPresentation(false,groupName);
  }
}

function card_isCardNumberValid(cardNumberField){
  cardNumber = cardNumberField.value;
  reg = /\s+/g;
  cardNumber = cardNumber.replace(reg,'');
  if(cardNumber == "" || luhnCheck(cardNumber)){
    return true;
  }
  return false;
}

validationFunctions["card"] = new Array();
validationFunctions["card"][ "card.cardNumber" ] = card_isCardNumberValid;