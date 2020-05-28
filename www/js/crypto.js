var Crypto = function () {
    function toonKomma (prijs) {
        return prijs.toString().replace('.', ',');
    }
    function formattingDate(item) {
        if (item < 10) {
            item = '0' + item;
        }
        return item;
    }
    function laatsteUpdate() {
        var datum = new Date();
        var dag = formattingDate(datum.getDate());
        var maand = formattingDate(datum.getMonth() + 1);
        var jaar = datum.getFullYear();
        var uur = formattingDate(datum.getHours());
        var minuten = formattingDate(datum.getMinutes());
        var seconden = formattingDate(datum.getSeconds());
        var nu = 'Laatste update om: ' + dag + '/' + maand + '/' + jaar + ' ' + uur + ':' + minuten + ':' + seconden;
        return nu;
    }
    var images = ["bitcoin", "bitcoin-cash", "eos", "ethereum", "litecoin", "ripple"];
   var init = function () {
       $('#ladenCrypto').show();
       $('#datum').html('');
       $('#munten').hide();
       var aantal = $('#aantal').val();
       var sortering = $('#sorteren').val();
       setTimeout(function () {
           $.ajax({
               type: "GET",
               url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit="+aantal+"&convert=EUR&sort=" + sortering,
               headers: {
                   'X-CMC_PRO_API_KEY':'d8927441-fc19-44ad-9a0a-0ba861cfc8e0',
                   'Content-Type':'application/json'
               },
               success: function (result) {
                   var tekst = '';
                   $(result.data).each(function (i, item) {
                       var afbeelding = item.slug;

                       if (images.indexOf(afbeelding) < 0) {
                           afbeelding = 'coin';
                       }
                       tekst += '<div class="card">' +
                           '              <div class="card-content">' +
                           '                <div class="row">' +
                           '                    <div class="col s5">' +
                           '                        <img src="images/'+afbeelding+'.png" height="auto" width="80vw">' +
                           '                    </div>' +
                           '                    <div class="col s7">\n' +
                           '                    <h3 class="card-title">'+item.name+' <span>('+item.symbol+')</span></h3>'+
                           '                    <p><b>Prijs: </b>€ '+toonKomma((item.quote.EUR.price).toFixed(2))+'</p>\n' +
                           '                    </div></div></div>\n' +
                           '              <div class="card-tabs">\n' +
                           '                <ul class="tabs tabs-fixed-width">\n' +
                           '                  <li class="tab"><a href="#tab'+item.id+'1" class="active">1 uur</a></li>\n' +
                           '                  <li class="tab"><a href="#tab'+item.id+'2">1 dag</a></li>\n' +
                           '                  <li class="tab"><a href="#tab'+item.id+'3">1 week</a></li>\n' +
                           '                </ul>\n' +
                           '              </div>\n' +
                           '              <div class="card-content grey lighten-4">\n' +
                           '                <div id="tab'+item.id+'1">'+toonKomma(item.quote.EUR.percent_change_1h)+'%</div>\n' +
                           '                <div id="tab'+item.id+'2">'+toonKomma(item.quote.EUR.percent_change_24h)+'%</div>\n' +
                           '                <div id="tab'+item.id+'3">'+toonKomma(item.quote.EUR.percent_change_7d)+'%</div>\n' +
                           '              </div>\n' +
                           '            </div>';
                   });
                   $('#munten').html(tekst).show();
                   $('#ladenCrypto').hide();
                   $('#datum').text(laatsteUpdate());
                   $('.tabs').tabs();
               },
               error: function () {
                   $('#munten').html('<h6>De prijzen konden niet worden opgehaalt, gelieve de ontwikkelaar te contacteren!</h6>');
               }
           });
       },1000);
   };
    return {
        init: init
    };
}();