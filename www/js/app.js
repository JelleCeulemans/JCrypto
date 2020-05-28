$(function() {
  function lsTask(item) {
    if (localStorage.getItem(item)) {
      $("#" + item).val(localStorage.getItem(item));
    }

    $("#" + item).change(function() {
      localStorage.setItem(item, $(this).val());
    });
  }
  function lsTaskWallet(item) {
    if (localStorage.getItem(item)) {
      $("#" + item).val(localStorage.getItem(item));
    }

    $("#" + item).change(function() {
      //$('#wallet').on('change', "#"+item, function () {
      localStorage.setItem(item, $(this).val());
      console.log(localStorage.getItem(item));
    });
  }



  lsTask("afgelopen");
  lsTask("percentage");
  lsTask("aantal");

  $("#ladenCrypto").hide();
  $("#ladenWallet").hide();

  document.addEventListener("deviceready", onDeviceReady, false);
  $(".sidenav").sidenav();
  $("select").formSelect();
  $(".collapsible").collapsible();

  $("#check").click(function() {
    if ($(this).prop("checked")) {
      localStorage.setItem('melding' , 1);
    } else {
      localStorage.setItem('melding' , 0);
    }
  });

  $("#renewCrypto").click(function() {
    Crypto.init();
  });
  $("#renewWallet").click(function() {
    Wallet.init();
  });

  $(".sidenav a").click(function() {
    $(".spa").hide();
    $("#" + $(this).data("show")).show();
    if ($(this).data("show") === "tabCrypto") {
      Crypto.init();
    }
    if ($(this).data("show") === "tabWallet") {
      Wallet.init();
    }
    $(".sidenav").sidenav("close");
  });

  $("#inAppBrowser").click(function() {
    cordova.InAppBrowser.open(
      "https://jelleceulemans.be",
      "_blank",
      "location=yes"
    );
  });
});

function onDeviceReady() {
    if (localStorage.getItem('melding') === '1')  {
      $('#check').prop('checked', true);
    }
}
