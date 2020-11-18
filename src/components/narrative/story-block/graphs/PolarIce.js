import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {scaleTime} from "d3-scale";
import {extent} from "d3-array";
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear} from "d3-scale";
import {max, min} from "d3-array";
import {line} from "d3-shape";
import {brushX} from "d3-brush";

// TODO pass width/height and radii as props
const margin = {top: 0, right: 0, bottom: 60, left: 80},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function PolarIce(props) {
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
        var xAxis = svg.append("g")
          .attr("transform", "translate(0," + height + ")")
          .call(axisBottom(x));

        var y = scaleLinear()
          .domain([max(data, function(d) { return +d.mass; }), min(data, function(d) { return +d.mass; })])
          .range([ 0, height]);
        svg.append("g")
          .call(axisLeft(y));

        // Add labels for each axis
        var yAxisLabelText = 'Mass (Gigatonnes)';
        var xAxisLabelText = 'Date';

        svg.append('text')
          .style('fill', 'white')
          .attr('transform', `translate(180,390)`)
          .text(xAxisLabelText);

        svg.append('text')
          .style('fill', 'white')
          .attr('transform', "translate(-55,230), rotate(270)")
          .text(yAxisLabelText);

        svg.append("line")
          .attr("x1", 0)
          .attr("x2", width)
          .attr("y1", y(0))
          .attr("y2", y(0))
          .attr("stroke", "grey")
          .attr("stroke-dasharray", "4");

        svg.append("defs").append("svg:clipPath")
          .attr("id", "clip-ice")
          .append("svg:rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", 0)
          .attr("y", 0);

        var brush = brushX()
          .extent( [ [0,0], [width,height] ] )
          .on("end", updateChart);

        svg.append('g')
          .attr("clip-path", "url(#clip-ice)")
          .attr('class', 'clip-path-ice')
          .append("path")
          .datum(data)
          .attr("class", "line")
          .attr("fill", "none")
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .attr("d", line()
            .x(function(d) { return x(new Date(d.date)) })
            .y(function(d) { return y(d.mass) })
          );

        svg.select('.clip-path-ice')
          .append("g")
          .attr("class", "brush-ice")
          .call(brush);

        var idleTimeout;
        function idled() { idleTimeout = null; }

        function updateChart({selection}) {
          if (!selection){
            if (!idleTimeout) return idleTimeout = setTimeout(idled, 350);
            x.domain([ 4,8]);
          } else{
            x.domain([ x.invert(selection[0]), x.invert(selection[1]) ])
            select(".brush-ice").call(brush.move, null)
          }

          xAxis.transition().duration(1000).call(axisBottom(x))
          svg.select('.line')
            .transition()
            .duration(1000)
            .attr("d", line()
              .x(function(d) { return x(new Date(d.date)) })
              .y(function(d) { return y(d.mass) })
            )
        }

        svg.on("dblclick",function(){
          x.domain(extent(data, function(d) { return new Date(d.date); }))
          xAxis.transition().call(axisBottom(x))
          svg.select('.line')
            .transition()
            .attr("d", line()
              .x(function(d) { return x(new Date(d.date)) })
              .y(function(d) { return y(d.mass) })
            )
        });

      }
    },[data, d3Container.current]);

  return (
    <div ref={d3Container} />
  );
}

export default PolarIce;
