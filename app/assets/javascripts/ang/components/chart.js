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
        let data = dt.map((el, i) => Object.assign({}, {cash: parseFloat(el.Total_$.Total_$)}, {name: el.General_Industry.General_Industry}) ),
          svg = d3.select($element[0])
            .append("svg")
            .attr("height", 800)
            .attr("width", 800),
          color = d3.scaleOrdinal(d3.schemeCategory10),
          margin = {top: 100, right: 30, bottom: 120, left: 10},
          width = svg.attr("width") - margin.left - margin.right,
          height = svg.attr("height") - margin.top - margin.bottom,
          dvalues = data.slice(1,10).map((x)=>x.cash),
          min     = Math.min(width, height),
          pie     = d3.pie().sort(null),
          arc     = d3.arc()
            .outerRadius(min / 2 * 0.9)
            .innerRadius(min / 2 * 0.1);
          // legendRectSize = 2 * 10,
          // legendSpacing = 8
          var g = svg.selectAll(".arc")
              .data(pie(dvalues))
            .enter().append("g")
              .attr("class", "arc");
              .attr('margin-left', 100)

          g.append("path")
              .attr("d", arc)
              .style("fill", function(d, i) { return color(i); });

          // g.append("text")
          //     .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
          //     .attr("dy", ".35em")
          //     .text(function(d) { return d.name; });


          // var legend = svg.append('g')
          //   .selectAll('g').data(data.slice(1,10).map(x=>x.name))
          //   // .attr('width', 40)
          //   // .attr('height', 100)
          //   .enter()
          //   .append('g')
          //     .attr('class', 'legend')
          //     .attr('transform', function(d, i) {
          //       var height = 10;
          //       var offset =  height * color.domain().length / 2;
          //       console.log('offset', offset)
          //       var horz = 100;
          //       var vert = i * height - offset;
          //       console.log('vert', vert)
          //       return 'translate(' + horz + ',' + vert + ')';
          //     })
          //     legend.append('rect')
          //       .attr('width', 10)
          //       .attr('height', 10)
          //       .style('fill', color)
          //       .style('stroke', color)
          //     legend.append('text')
          //       .attr('x', legendRectSize + legendSpacing)
          //       .attr('y', legendRectSize - legendSpacing)
          //       .text(function(d){return d})
          //       console.log('x', legendRectSize + legendSpacing)
          //       console.log('y', legendRectSize - legendSpacing)

        // let text = svg.select(".labelName").selectAll("text")
        //     .data(pie(data.slice(1,10)), function(d){ return d.cash });
        //
        // text.enter()
        //     .append("text")
        //     .attr("dy", ".35em")
        //     .text(function(d) {
        //         return (d.name+": "+d.cash+"%");
        //     });

        // var margin = {top: 20, right: 20, bottom: 120, left: 100},
        //     width = svg.attr("width") - margin.left - margin.right,
        //     height = svg.attr("height") - margin.top - margin.bottom;
        // console.log(data);
        // var x = d3.scaleBand().rangeRound([0, width]).padding([1]),
        //     y = d3.scaleLinear().rangeRound([height, 0]);
        //
        // var g = svg.append("g")
        //   .attr("transform", `translate(${margin.left},${margin.top})`);
        //   x.domain(data.slice(1,10).map((x)=>x.name), 0.1)
        //   y.domain([0, d3.max(data.slice(1,10), function(d) { return d.cash; })]);
        //
        //   g.append("g")
        //       .attr("class", "axis axis--x")
        //       .attr("transform", "translate(0," + height + ")")
        //       .call(d3.axisBottom(x).ticks(10))
        //         .selectAll('text')
        //         .attr("dx", "-.8em")
        //         .attr("dy", ".15em")
        //         .attr("transform", "rotate(-65)")
        //         .attr("text-anchor", "end")
        //
        //   g.append("g")
        //       .attr("class", "axis axis--y")
        //     .call(d3.axisLeft(y).tickValues([0, 10000, 100000, 1000000]))
        //       .selectAll('text')
        //       .attr("y", 6)
        //       .attr("dy", ".15em")
        //       .attr("text-anchor", "end")
        //
        //   g.selectAll(".bar")
        //     .data(data.slice(1, 10))
        //     .enter().append("rect")
        //       .attr("class", "bar")
        //       .attr("x", function(d) { return x(d.name)})
        //       .attr("y", function(d) { return y(d.cash)})
        //       .attr('width', 10)
        //       .attr("height", function(d) { return height - y(d.cash); });
        });

      };
    this.$onInit = function() {
      console.log('init')
      this.createChart();
    }
   this.$doCheck = function(){
     if(!angular.equals(previousFinance, this.finance)){
        if(this.finance){
          previousFinance = this.finance;
          this.createChart(previousFinance);
          console.log('creating it')
        }
        console.log(this.finance, 'changes')
      }else{
        console.log(this.finance,' nochanges')
      }
    }
  }
});
