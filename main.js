$('document').ready(function(){
$.ajax({
    url : "http://157.230.17.132:4001/sales",
    method : 'GET',
    success : function(data) {
        var mesi = {}
        for (var i = 0; i < data.length; i++) {
            var mese = moment(data[i].date, 'DD/MM/YYYY').format('MMMM')
            var vendite = data[i].amount;
            if(!mesi.hasOwnProperty(mese)) {
                mesi[mese] = vendite;
            } else {
                mesi[mese] += vendite;
           }

        }
        console.log(mesi);
        var etichette = Object.keys(mesi);
        var valori = Object.values(mesi);
        var ctx = $('#myChart');

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: etichette,
                datasets: [{
                    label: '',
                    data: valori,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
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

    },
    error : function () {
    alert("errore.");
    }
});





















})
