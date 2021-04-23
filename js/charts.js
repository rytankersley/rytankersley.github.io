var barctx = document.getElementById('barChart').getContext('2d');
var radarctx = document.getElementById('radarChart').getContext('2d');

function createBarChartConfig() {
  var data = getInitialChartData();
  return {
    type: 'bar',
    data: data,
    options: {
      indexAxis: 'y',
      // Elements options apply to all of the options unless overridden in a dataset
      // In this case, we are setting the border of each horizontal bar to be 2px wide
      elements: {
        bar: {
          borderWidth: 2,
        }
      },
      responsive: true,
      plugins: {
        legend: {
          position: 'right',
        },
        title: {
          display: true,
          text: 'Chart.js Horizontal Bar Chart'
        }
      },
      scales: {
          x: {
              suggestedMax: 100
          }
      }
    }
  };
};

function createRadarChartConfig() {
  var data = getInitialChartData();
  return {
    type: 'radar',
    data: data,
    options: {
      elements: {
        line: {
          borderWidth: 3
        }
      },
      scales: {
        r: {
            suggestedMin: 0,
            suggestedMax: 100
        }
    }
    },
  };
};

function getInitialChartData() {
  var labels = [];
  var values = [];
  
  var textData = getTextData(0);
  for(var i = 0; i <textData.categories.length; i++) {
    labels.push(textData.categories[i].name);
    values.push(50.00);
  }
  
  return {
    labels: labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: values,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      }]
  };
};

var barChart = new Chart(barctx, createBarChartConfig());
var radarChart = new Chart(radarctx, createRadarChartConfig());