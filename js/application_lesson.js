$(document).ready(function(){
  //Class
  var HighCharts = function(){
    this.graphData = [];
  };

  HighCharts.prototype.makeAjaxRequest = function() {
    $.ajax({
      context : this,
      type : 'GET',
      url: 'https://www.quandl.com/api/v1/datasets/BTS_MM/RETAILGAS.json?auth_token=E6kNzExHjay2DNP8pKvB',
      success : function(response){
        
        //DATA WRANGLING  
        var items = response.data.sort();//To avoid error you need to sort the data;

        for (var i=0; i < items.length; i++){
          item = items[i];
          this.graphData.push({
            x: new Date(item[0]),
            y: item[1] 
          })
        }

        console.log(this.graphData);
        this.graph();
      }
    });
  };

  //DRAWING THE GRAPH
  HighCharts.prototype.graph = function(){
     var highchartConfig = {
      title: {
        text: 'Average retail gas prices'
      },
      subtitle: {
        text: 'Bureau of Transportation Statistics (Multimodal)'
      },
      xAxis: {
        type: 'datetime'
      },
      series: [
        {
          name: 'US',
          data: this.graphData
        }
      ]
    };

    $('#chart').highcharts(highchartConfig);
  }


  //Instance
  var chart = new HighCharts();

  chart.makeAjaxRequest();

});

