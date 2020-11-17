import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear, scaleTime} from "d3-scale";
import {extent, max} from "d3-array";
import {line} from "d3-shape";
import {brushX} from "d3-brush";

// TODO pass width/height and radii as props
const margin = {top: 0, right: 20, bottom: 60, left: 80},
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

function Temp(props) {
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

      // Add X axis --> it is a date format
      var x = scaleTime()
        .domain(extent(data, function(d) { return new Date(d.date); }))
        .range([ 0, width ]);
      var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x).ticks(5));

      console.log(xAxis);

      // Add Y axis
      var y = scaleLinear()
        .domain([-0.5, max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(axisLeft(y));

      // Add labels for each axis
      var yAxisLabelText = 'Temperature Anomaly (ºC)';
      var xAxisLabelText = 'Year';

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', `translate(180,390)`)
        .text(xAxisLabelText);

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(-40,230), rotate(270)")
        .text(yAxisLabelText);

      // Add a clipPath: everything out of this area won't be drawn.
      svg.append("defs").append("svg:clipPath")
        .attr("id", "clip")
        .append("svg:rect")
        .attr("width", width )
        .attr("height", height )
        .attr("x", 0)
        .attr("y", 0);

      var brush = brushX()                   // Add the brush feature using the d3.brush function
        .extent( [ [0,0], [width,height] ] )  // initialise the brush area: start at 0,0 and finishes at width,height: it means I select the whole graph area
        .on("end", updateChart);               // Each time the brush selection changes, trigger the 'updateChart' function

      svg.append('g')
        .attr("clip-path", "url(#clip)")
        .attr('class', 'clip-path')
        .append("path")
        .datum(data)
        .attr("class", "line")  // I add the class line to be able to modify this line later on.
        .attr("fill", "none")
        .attr("stroke", "#FF453A")
        .attr("stroke-width", 1.5)
        .attr("d", line()
          .x(function(d) { return x(new Date(d.date)) })
          .y(function(d) { return y(d.value) })
        );

      svg.select('.clip-path')
        .append("g")
        .attr("class", "brush")
        .call(brush);

      var idleTimeout;
      function idled() { idleTimeout = null; }

      function updateChart({selection}) {
        console.log(selection);

        // What are the selected boundaries?
        let extent = selection

        // If no selection, back to initial coordinate. Otherwise, update X axis domain
        if(!extent){
          if (!idleTimeout) return idleTimeout = setTimeout(idled, 350); // This allows to wait a little bit
          x.domain([ 4,8])
        }else{
          x.domain([ x.invert(extent[0]), x.invert(extent[1]) ])
          select(".brush").call(brush.move, null) // This remove the grey brush area as soon as the selection has been done
        }

        // Update axis and line position
        xAxis.transition().duration(1000).call(axisBottom(x))
        svg.select('.line')
          .transition()
          .duration(1000)
          .attr("d", line()
            .x(function(d) { return x(new Date(d.date)) })
            .y(function(d) { return y(d.value) })
          )
      }

      svg.on("dblclick",function(){
        x.domain(extent(data, function(d) { return new Date(d.date); }))
        xAxis.transition().call(axisBottom(x))
        svg.select('.line')
          .transition()
          .attr("d", line()
            .x(function(d) { return x(new Date(d.date)) })
            .y(function(d) { return y(d.value) })
          )
      });

    }
  },[data]);

  return (
    <div ref={d3Container} />
  );
}

export default Temp;
