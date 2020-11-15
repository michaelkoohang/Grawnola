import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {scaleTime} from "d3-scale";
import {extent} from "d3-array";
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {max, min} from "d3-array";
import {line} from "d3-shape";

// TODO pass width/height and radii as props
const margin = {top: 0, right: 0, bottom: 60, left: 80},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function Carbon(props) {
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

      var x = scaleTime()
        .domain(extent(data, function(d) { return new Date(d.date); }))
        .range([ 0, width ]);
      svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x));

      var y = scaleLinear()
        .domain([max(data, function(d) { return +d.value; }), min(data, function(d) { return +d.value; })])
        .range([ 0, height]);
      svg.append("g")
        .call(axisLeft(y));

      // Add labels for each axis
      var yAxisLabelText = 'CO2 (parts per million)';
      var xAxisLabelText = 'Date';

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', `translate(180,390)`)
        .text(xAxisLabelText);

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(-40,230), rotate(270)")
        .text(yAxisLabelText);

      // Add the line
      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#32D74B")
        .attr("stroke-width", 2)
        .attr("d", line()
          .x(function(d) { return x(new Date(d.date)) })
          .y(function(d) { return y(d.value) })
        )

    }
  },[data, d3Container.current]);

  return (
    <div ref={d3Container} />
  );
}

export default Carbon;
