app.component('chart', {
  bindings: {
    finance: '='
  },
  template: '<div class="chart-container"></div>',
  controller: function ($element, d3Factory) {
    var $ctrl = this;
    var previousFinance;
    this.createChart = function(dt) {
      d3Factory.d3().then(function(d3) {
        d3.select("svg").remove();
        var color = d3.scale.category10(),
          // dataNames = dt.map(function(el, i){
          //   el.General_Industry.General_Industry
          // }),
          data = dt.map((el, i) => parseFloat(el.Total_$.Total_$)),
          //data = [...new Array(100)].map(() => Math.round(Math.random() * 1000)),
          width = 500,
          height = 500,
          min = Math.min(width, height),

          svg = d3.select($element[0]).append('svg')
          pie = d3.layout.pie().sort(null),
          arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);
          console.log(data)
          svg.attr({width: width, height: height});
          var g = svg.append('g')
          .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

          g.selectAll('path').data(pie(data))
          .enter().append('path')
          .style('stroke', 'white')
          .attr('d', arc)
          .attr('fill', function(d, i) { return color(i); });
        });
      }
    this.$onInit = function() {
      this.createChart();
      console.log('init')
    }
   this.$doCheck = function(){
     if(!angular.equals(previousFinance, this.finance)){
        if(this.finance && this.finance.finance){
          previousFinance = this.finance.finance;
          this.createChart(previousFinance);
          console.log('creating it')
        }
        console.log('changes')
      }else{
        console.log(this.finance,' nochanges')
        console.log(this)
      }
    }
  }
});
