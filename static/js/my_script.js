console.log("Script is running");  // デバッグ用

let myChart;
let ctx = document.getElementById('myChart').getContext('2d');
myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Operational Rate (%)',
            data: [],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                max: 100 // as it's a rate in percentage
            }
        }
    }
});

function updateChart(timeScale) {
    console.log("Sending GET request with timeScale:", timeScale);  // デバッグ用

    $.get('/occupancy_rate/', {time_scale: timeScale}, null, 'json')
        .done(function(data) {
            console.log("GET request succeeded:", JSON.stringify(data));  // デバッグ用

            myChart.data.labels = data.labels;
            myChart.data.datasets[0].data = data.values;
            myChart.update();
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.log("GET request failed:", textStatus, errorThrown);  // デバッグ用
        });
}

$(document).ready(function(){
    updateChart('hour');
    
    $('#time_scale').change(function(){
        const timeScale = $(this).val();
        updateChart(timeScale);
    });
});