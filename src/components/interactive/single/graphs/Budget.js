import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear, scaleBand} from "d3-scale";

import NATIONAL_STATS from '../../../../data/interactive/national_statistics';

const DEBUG = 0;

// TODO pass width/height and radii as props
const margin = {top: 0, right: 0, bottom: 0, left: 100},
  width = 460 - margin.left - margin.right,
  height = 150 - margin.top - margin.bottom,
  heightTranslated = height / 3.9;

function Budget(props) {
  const per_capita_limit = NATIONAL_STATS.budget_per_capita;
  const d3Container = useRef(null);
  const data = [props.data / 1000];
  if (DEBUG) console.log(data)

  useEffect(() => {
    if (data && d3Container.current) {
      select(d3Container.current)
        .select('svg')
        .remove();

      const svg = select(d3Container.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr('preserveAspectRatio', 'xMidYMid')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .classed('single-svg-budget', true)
        .append("g")
        .attr("transform",
          "translate(" + 0 + "," + 0 + ")");

      var titleText = 'Your CO\u2082 Budget';
      svg.append('text')
        .style('fill', 'white')
        // .style('opacity', 0.9)
        .attr('transform', "translate(100,20)")
        .style('font-size', '18px')
        .style('font-weight', '200')
        .style('font-family', 'Helvetica')
        .text(titleText);

      var x = scaleLinear()
        .domain([0, 18])
        .range([0, width]);
      svg.append("g")
        .attr("transform", "translate(0," + 120 + ")")
        .call(axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Y axis
      var y = scaleBand()
        .range([0, height/2])
        .domain([""])
        .padding(.1);
      svg.append("g")
        .attr("transform", "translate(0," + heightTranslated + ")")
        .style('opacity', "0")
        .call(axisLeft(y));

      //Bars
      svg.selectAll("myRect")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", x(0) )
        .attr("y", function() { return y(""); })
        .attr("width", function() { return x(data); })
        .attr("height", y.bandwidth() )
        .attr("transform", "translate(0," + heightTranslated + ")")
        .attr("fill", "#69b3a2")

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(150,280)")
        .style('fill', 'white')
        .style('font-family', 'Helvetica')
        .text("Metric Tons");

      svg.append('text')
        .style('fill', 'white')
        .attr("x", () => {
          if (data[0] > 0) {
            return x(data[0] + 0.5)
          }
        })
        .attr("y", height / 2)
        .style('fill', 'white')
        .style('font-size', '16px')
        .style('font-weight', '900')
        .style('font-family', 'Helvetica')
        .text(`${data}`);

      svg.append('text')
        .style('fill', 'white')
        .attr("x", () => {
          if (data[0] > 0) {
            return x(data[0] + 0.5)
          }
        })
        .attr("y", height / 2 + 12)
        .style('fill', 'white')
        .style('opacity', 0.8)
        .style('font-size', '12px')
        .style('font-weight', '200')
        .style('font-family', 'Helvetica')
        .text(`metric tons`);

      svg.append("line")
        .attr("x1", x(per_capita_limit))
        .attr("x2", x(per_capita_limit))
        .attr("y1", height / 2 - height / 4 + 5)
        .attr("y2", height / 2 + height / 4)
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4");

      svg.append('text')
        .style('fill', 'white')
        .attr("x", x(15.5) + 5)
        .attr("y", height / 2 - height / 4 + 2)
        .style('fill', 'white')
        .style('opacity', 0.8)
        .style('font-size', '12px')
        .style('font-weight', '200')
        .style('font-family', 'Helvetica')
        .text(`${per_capita_limit} mt limit`);
    }
  },[data, d3Container.current]);

  return (
    <div className='single-container' ref={d3Container} />
  );
}

export default Budget;
