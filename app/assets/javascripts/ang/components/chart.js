app.component('chart', {
  bindings: {
    finance: '='
  },
  template: '<div class="chart-container text-center"><h3>{{$ctrl.loading}}</div>',
  controller: function ($element, d3Factory) {
    let $ctrl = this;
    let previousFinance;
    this.createChart = function(dt) {
      d3Factory.d3().then(function(d3) {
        d3.select("svg").remove();
        let color = d3.scaleOrdinal(d3.schemeCategory10);
        let data = dt.map((el, i) => Object.assign({}, {cash: parseFloat(el.Total_$.Total_$)}, {name: el.General_Industry.General_Industry}) )
        let svg = d3.select($element[0])
          .append("svg")
          .attr("height", 500)
          .attr("width", 1000);
        let margin = {top: 20, right: 20, bottom: 120, left: 100},
            width = svg.attr("width") - margin.left - margin.right,
            height = svg.attr("height") - margin.top - margin.bottom;
        let x = d3.scaleBand().rangeRound([0, width]).padding([1]),
            y = d3.scaleLinear().rangeRound([height, 0]);
        var tooltip = d3.select($element[0]).append("div").attr("class", "toolTip")

        let g = svg.append("g")
          .attr("transform", `translate(${margin.left},${margin.top})`);
          x.domain(data.slice(1,11).map((x)=>x.name), 0.1)
          y.domain([0, d3.max(data.slice(1,10), function(d) { return d.cash; })]);

          g.append("g")
              .attr("class", "axis axis--x")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x).ticks(10))
                .selectAll('text')
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)")
                .attr("text-anchor", "end")

          g.append("g")
              .attr("class", "axis axis--y")
            .call(d3.axisLeft(y).tickValues([0, 50000, 100000, 1000000]))
              .selectAll('text')
              .attr("y", 6)
              .attr("dy", ".15em")
              .attr("text-anchor", "end")


          g.selectAll(".bar")
            .data(data.slice(1, 11))
            .enter().append("rect")
              .attr("class", "bar")
              .attr("x", function(d) { return x(d.name)})
              .attr("y", function(d) { return y(d.cash)})
              .attr('width', 10)
              .attr("height", function(d) { return height - y(d.cash); })
              .style("fill", function(d, i){return color(i)})
              .on("mouseover", function(d){
                  tooltip
                    .style("left", "444px")
                    .style("top", "50px")
                    .style("display", "inline-block")
                    .html((d.name) + "<br>" + "$" + (d.cash.toLocaleString()))
              })
            });

          //data = [...new Array(100)].map(() => Math.round(Math.random() * 1000)),
          // width = 500,
          // height = 500,
          // min = Math.min(width, height),
          //
          // svg = d3.select($element[0]).append('svg')
          // pie = d3.layout.pie().sort(null),
          // arc = d3.svg.arc()
          // .outerRadius(min / 2 * 0.9)
          // .innerRadius(min / 2 * 0.5);
          // console.log(data)
          // svg.attr({width: width, height: height});
          // let g = svg.append('g')
          // .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
          //
          // g.selectAll('path').data(pie(data))
          // .enter().append('path')
          // .style('stroke', 'white')
          // .attr('d', arc)
          // .attr('fill', function(d, i) { return color(i); });
      };
    this.$onInit = function() {
      console.log('init')
      $ctrl.loading = "Loading Financial Contributions.."
      this.createChart();
    }
   this.$doCheck = function(){
     if(!angular.equals(previousFinance, this.finance)){
        if(this.finance){
          $ctrl.loading = "Top 10 Contributions By Sector for Most Recent Election"
          previousFinance = this.finance;
          this.createChart(previousFinance);
          console.log('creating it')
        }
      }else{
        console.log(this.finance,' nochanges')
      }
    }
  }
});
