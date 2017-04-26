app.component('chart', {
  bindings: {
    finance: '='
  },
  template: '<div class="chart-container"></div>',
  controller: function ($element, d3Factory) {
    debugger;
    var finance = this.parent;
    var $ctrl = this;
    $ctrl.createChart = createChart;
    function createChart() {
      d3Factory.d3().then(function(d3) {
        debugger;
        var color = d3.scale.category10(),
          dataNames = $ctrl.finance.map(function(el, i){
            el.General_Industry.General_Industry
          }),
          data = $ctrl.finance.map(function(el, i){
            parseFloat(el.Total_$)
          }),
          width = 500,
          height = 500,
          min = Math.min(width, height),

          svg = d3.select($element[0]).append('svg'),
          pie = d3.layout.pie().sort(null),
          arc = d3.svg.arc()
          .outerRadius(min / 2 * 0.9)
          .innerRadius(min / 2 * 0.5);

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
  }
});
