import React, {useEffect, useRef} from 'react';
import {pointer, select} from 'd3-selection';
import {scaleTime} from "d3-scale";
import {bisector, extent} from "d3-array";
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {max, min} from "d3-array";
import {line} from "d3-shape";

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

      var yAxisLabelText = 'CO\u2082 (parts per million)';
      var xAxisLabelText = 'Date';

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', `translate(180,390)`)
        .text(xAxisLabelText);

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(-40,230), rotate(270)")
        .text(yAxisLabelText);

      svg
        .append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FF453A")
        .attr("stroke-width", 1.5)
        .attr("d", line()
          .x(function(d) { return x(new Date(d.date)) })
          .y(function(d) { return y(d.value) })
        )

      var bisect = bisector(function(d) { return new Date(d.date); }).left;

      var focus = svg
        .append('g')
        .append('circle')
        .style("fill", "white")
        .attr("stroke", "white")
        .attr('r', 4.5)
        .style("opacity", 0)

      var focusText = svg
        .append('g')
        .append('text')
        .style("opacity", 0)
        .style("fill", "#FF453A")
        .style('font-size', '48px')
        .style('font-weight', '900')
        .style('font-family', 'Helvetica')
        .attr('transform','translate(50,80)')

      var focusSubtext = svg
        .append('g')
        .append('text')
        .html('ppm')
        .style("opacity", 0)
        .style("fill", "#FF453A")
        .style('font-size', '48px')
        .style('font-weight', '900')
        .style('font-family', 'Helvetica')
        .attr('transform','translate(50,120)')

      svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);

      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
        focusSubtext.style("opacity",1)
      }

      function mousemove(event) {
        let xy = pointer(event);
        var x0 = x.invert(xy[0]);
        var i = bisect(data, x0, 1);
        if (i < data.length) {
          let selectedData = {"x": new Date(data[i].date), "y": data[i].value};
          focus
            .attr("cx", x(selectedData.x))
            .attr("cy", y(selectedData.y));
          focusText
            .html(`${selectedData.y}`)
        }
      }

      function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
        focusSubtext.style("opacity",0)
      }
    }

  },[data]);

  return (
    <div ref={d3Container} />
  );
}

export default Carbon;
