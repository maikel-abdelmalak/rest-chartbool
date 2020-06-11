$('document').ready(function(){
chiamata_get();


$('button').click(function(){

    var dati = {
        salesman : $('.nomi option:selected').text(),
        amount: parseInt($('input').val()),
        date: $('.mesi option:selected').text()
    }
    dati.date = moment(dati.date, 'MMMM').format('01/MM/2017');
    console.log(dati.date);
    if(dati.salesman != '-Scegli venditore-' && dati.date != '-Scegli mese vendita-' && !isNaN(dati.amount)){

        $.ajax({
            url : "http://157.230.17.132:4001/sales",
            method : 'POST',
            data: dati,
            success : function(dati) {
            console.log(dati);

            chiamata_get();

            },
            error : function () {
            alert("errore.");
            }
        });
    }else{
        alert('hai inserito valori non validi')
    }

})

function chiamata_get(){
    $.ajax({
        url : "http://157.230.17.132:4001/sales",
        method : 'GET',
        success : function(data) {
            var mesi = {
                January: 0,
                February: 0,
                March: 0,
                April: 0,
                May: 0,
                June: 0,
                July: 0,
                August: 0,
                September: 0,
                October: 0,
                November: 0,
                December: 0,
            };
            var venditori = {};
            console.log(venditori);
            var vendite_totali = 0;
            for (var i = 0; i < data.length; i++) {
                var mese_corrente = moment(data[i].date, 'DD/MM/YYYY').format('MMMM')
                var vendita_corrente = parseInt(data[i].amount);
                var venditore_corrente = data[i].salesman;
                vendite_totali += vendita_corrente;
               mesi[mese_corrente] += vendita_corrente;

               mesi[mese_corrente] += vendita_corrente;

                if(!venditori.hasOwnProperty(venditore_corrente)) {
                    venditori[venditore_corrente] = vendita_corrente;

                } else {
                    venditori[venditore_corrente] += vendita_corrente;
               }

            }


    //rivedere
            for (var nome_venditore in venditori) {
               var importo_venditore = venditori[nome_venditore];
               var percentuale_venditore = (importo_venditore * 100 / vendite_totali).toFixed(1);
              venditori[nome_venditore] = percentuale_venditore;
            }
    //fine rivedere

            var etichette = Object.keys(mesi);
            var valori_mesi = Object.values(mesi);

            var nomi = Object.keys(venditori);
            var valori_venditori = Object.values(venditori);
             var select_1 = $('.nomi');
             popola_select(nomi, select_1);

             var select_2 = $('.mesi');
             popola_select(etichette, select_2);

             crea_line(etichette, valori_mesi);

            crea_doughnut(nomi, valori_venditori);

        },
        error : function () {
        alert("errore.");
        }
    });
}

function crea_line(label, data){
    var ctx = $('#myChart');
     myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: label,
            datasets: [{
                label: '',
                data: data,
                backgroundColor: [
                    'rgba(255, 255, 255, 0)',
                    // 'rgba(54, 162, 235, 1)',
                    // 'rgba(255, 206, 86, 1)',
                    // 'rgba(75, 192, 192, 1)',
                    // 'rgba(153, 102, 255, 1)',
                    // 'rgba(255, 159, 64, 1)'// 'rgba(255, 99, 132, 1)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 4
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function crea_doughnut(label, data){
    var ctx_2 = $('#myChart-Doughnut');
    var myChart_2 = new Chart(ctx_2, {
        type: 'doughnut',
        data: {
            labels: label,
            datasets: [{
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderColor: [
                    'rgba(255, 255, 255, 1)',

                ],
                borderWidth: 3
            }]
        },
        options: {

        }
    });
}

function popola_select(object, select){
    for (var proprieta in object) {
        var source   = $('#option-template').html();
        var template = Handlebars.compile(source);
        var context = {valore: object[proprieta]};
        var html = template(context);
        select.append(html)
    }
}














})
