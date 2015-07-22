$(document).ready(function(){
  var Chart = function(){
    this.data = [];
  }
  var name;
  var code;
  
  Chart.prototype.getData = function(url){
    $.ajax({
      context: this,
      type : 'GET',
      url : url,
      success : function(response){
        console.log(response);
        var items = response.data.sort()
        name = response.name;
        code = response.code;
        
        for (var i = 0; i < response.data.length; i++){
          this.data.push({
            x : new Date(items[i][0]),
            y : items[i][1]
          })
        };
      console.log(this.data);
      this.drawGraph();
      }
    });
  };
  
  Chart.prototype.drawGraph = function(){
    var highchartConfig = {
      title: {
        text: "Currencies exchange rate vs HKD"
      },
      xAxis: {
        type: 'datetime'
      },
      series:[
        {
          name: code,
          data: this.data,
          turboThreshold: 0
        }
      ]
    }
    $('#chart').highcharts(highchartConfig);
  };


  $('#input_url').submit(function(){
  event.preventDefault();
  })

// 'https://www.quandl.com/api/v1/datasets/ECB/EURHKD.json';

  var chart = new Chart();

  var url;
  
  $('#go').click(function(){
    url = $('#url').val();
    chart.getData(url);
    console.log(url);
  });
  

})