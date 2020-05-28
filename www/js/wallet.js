var Wallet = function () {
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
    var init = function () {
        var prijzen = [];
        var melding = [];
        var cryptomunten = [];
        var teller = 0;
        $('#ladenWallet').show();
        $('#datumWallet').html('');
        $('#wallet').hide();
        setTimeout(function () {
            $.ajax({
                type: "GET",
                url: "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=6&convert=EUR",
                headers: {
                    'X-CMC_PRO_API_KEY':'d8927441-fc19-44ad-9a0a-0ba861cfc8e0',
                    'Content-Type':'application/json'
                },
                success: function (result) {
                    var outprint = '';
                    $(result.data).each(function (i, item) {
                        cryptomunten[item.symbol] = item.name;
                        prijzen[item.symbol] = item.quote.EUR.price;
                        outprint += '<div class="card">\n' +
                            '                <div class="card-content">\n' +
                            '                    <div class="row">\n' +
                            '                        <div class="col s5">\n' +
                            '                            <div class="col s12"><img src="images/'+item.slug+'.png" width="80vw" height="auto"></div>\n' +
                            '                             <h5 class="col s12">'+item.name+' <span>('+item.symbol+')</span></h5>' +
                            '                        </div>\n' +
                            '                        <div class="col s7">\n' +
                            '                            <div class="input-field col s12 row">\n' +
                            '                                <input id="hoeveelheid'+item.symbol+'" type="number" value="0">\n' +
                            '                                <label for="hoeveelheid" class="active">Hoeveelheid</label>\n' +
                            '                            </div>\n' +
                            '                            <div class="input-field col s12 row">\n' +
                            '                                <input id="betaald'+item.symbol+'" type="number" value="0">\n' +
                            '                                <label for="betaald" class="active">Betaald</label>\n' +
                            '                            </div>\n' +
                            '                        </div>\n' +
                            '                    </div>\n' +
                            '                </div>\n' +
                            '                <div class="card-tabs">\n' +
                            '                <ul class="tabs tabs-fixed-width">\n' +
                            '                  <li class="tab"><a href="#wal'+item.symbol+'1" class="active">Waarde nu</a></li>\n' +
                            '                  <li class="tab"><a href="#wal'+item.symbol+'2">Vershil %</a></li>\n' +
                            '                  <li class="tab"><a href="#wal'+item.symbol+'3">Verschil €</a></li>\n' +
                            '                </ul>\n' +
                            '              </div>\n' +
                            '              <div class="card-content grey lighten-4">\n' +
                            '                <div id="wal'+item.symbol+'1"></div>\n' +
                            '                <div id="wal'+item.symbol+'2"></div>\n' +
                            '                <div id="wal'+item.symbol+'3"></div>\n' +
                            '              </div>\n' +
                            '            </div>';

                    });
                    function countItem(object) {
                        var hoeveelheid = $('#hoeveelheid'+object).val();
                        var betaald = $('#betaald'+object).val();
                        var waardeNu =  prijzen[object] * hoeveelheid;

                        if (betaald > waardeNu) {
                            melding[teller] = cryptomunten[object];
                            teller++;
                        }

                        if (hoeveelheid > 0 && betaald > 0) {
                            var verschilProcent =  waardeNu / betaald  * 100;
                            var verschilEUR =  waardeNu - betaald;
                        }
                        else {
                            verschilProcent = 0;
                            verschilEUR = 0;
                        }
                        $('#wal' +object+ '1').text('€ ' + toonKomma(waardeNu.toFixed(2)));
                        $('#wal' +object+ '2').text(toonKomma(verschilProcent.toFixed(2)) + '%');
                        $('#wal' +object+ '3').text('€ ' + toonKomma(verschilEUR.toFixed(2)));
                    }
                    $('#wallet').html(outprint).show(function () {
                        var meldingTekst = '';
                        $(melding).each(function (i, item) {
                            meldingTekst += item + ", ";
                        });

                        if (!$('#check').prop('checked') && meldingTekst) {
                            navigator.vibrate(2000);
                            navigator.notification.beep(1);
                            navigator.notification.alert('Let op u maakt verlies met de volgende munten!\n\n'+ meldingTekst.slice(0,-2), '', 'Opgelet', 'Oké');
                        }
                    });
                    $('#ladenWallet').hide();
                    $('#datumWallet').text(laatsteUpdate());





                    function lsTaskWallet (item) {
                        if (localStorage.getItem(item)) {
                            $('#'+item).val(localStorage.getItem(item));
                        }

                        $('#'+item).change(function () {
                            //$('#wallet').on('change', "#"+item, function () {
                            localStorage.setItem(item, $(this).val());
                            console.log(localStorage.getItem(item));
                        });
                    }
                    lsTaskWallet('hoeveelheidBTC');
                    lsTaskWallet('betaaldBTC');
                    lsTaskWallet('hoeveelheidETH');
                    lsTaskWallet('betaaldETH');
                    lsTaskWallet('hoeveelheidXRP');
                    lsTaskWallet('betaaldXRP');
                    lsTaskWallet('hoeveelheidEOS');
                    lsTaskWallet('betaaldEOS');
                    lsTaskWallet('hoeveelheidLTC');
                    lsTaskWallet('betaaldLTC');
                    lsTaskWallet('hoeveelheidBCH');
                    lsTaskWallet('betaaldBCH');

                    countItem('BTC');
                    countItem('ETH');
                    countItem('XRP');
                    countItem('EOS');
                    countItem('LTC');
                    countItem('BCH');
                    $('.tabs').tabs();



                },
                error: function () {
                    $('#wallet').html('<h5>De prijzen konden niet worden opgehaalt, gelieve de ontwikkelaar te contacteren!</h5>');
                }
            });
        },1000);
    };
    return {
        init: init
    };
}();