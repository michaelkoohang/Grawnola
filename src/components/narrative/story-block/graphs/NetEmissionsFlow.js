import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear, scaleBand} from "d3-scale";

const margin = {top: 30, right: 0, bottom: 100, left: 80},
  width = 460 - margin.left - margin.right,
  height = 220 + margin.top + margin.bottom;

function NetEmissionsFlow(props) {
  const d3Container = useRef(null);
  const {data} = props;

  useEffect(() => {
    if (data && d3Container.current) {
      select(d3Container.current)
        .select('svg')
        .remove();

      const svg = select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

      var x = scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.emission; }))
        .padding(0.2);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      var y = scaleLinear()
        .domain([-40, 40])
        .range([ height, 0]);
      svg.append("g")
        .call(axisLeft(y));

      var yAxisLabelText = 'CO\u2082 Emissions (kg)';
      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(-50,270), rotate(270)")
        .text(yAxisLabelText);

      svg.selectAll("nefbar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) { return x(d.emission); })
        .attr("y", function(d) {
          if (d.carbon > 0) {
            return y(d.carbon);
          } else {
            return y(0);
          }
        })
        .attr("width", x.bandwidth())
        .attr("height", function(d) {
          if (d.carbon > 0) {
            return height/2 - y(d.carbon);
          } else {
            return height/2 - y(-d.carbon);
          }
        })
        .attr("fill", (d) => {
          if (d.carbon > 0) {
            return "#FF453A"
          } else {
            return "#32D74B"
          }
        })

      svg.selectAll("nefbar")
        .data(data)
        .enter()
        .append('text')
        .attr('fill', 'white')
        .attr('font-size', '12px')
        .attr('font-weight', '800')
        .text(function(d) {
          return `${Math.round(d.carbon)}`
        })
        .attr("x", function(d){
          if (d.emission === '1 Tree Planted') {
            return x(d.emission) + 13;
          }
          return x(d.emission) + 20;
        })
        .attr("y", function(d) {
          if (d.carbon < 0) {
            return y(d.carbon) + 20;
          } else {
            return y(d.carbon) - 10;
          }
        });

      svg.append("line")
        .attr("x1", 0 )
        .attr("x2", width )
        .attr("y1", height / 2)
        .attr("y2", height / 2)
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4")

      svg.append('text')
        .style('font-size', '14px')
        .style('font-weight', '100')
        .style('font-family', 'Helvetica')
        .text('CO\u2082 Swaps')
        .style("fill", "white")
        .attr('transform','translate(150,-18)')

    }
  },[data]);

  return (
    <div ref={d3Container} />
  );
}

export default NetEmissionsFlow;
