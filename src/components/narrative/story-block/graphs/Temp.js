import React, {useEffect, useRef} from 'react';
import {axisBottom, axisLeft} from "d3-axis";
import {brushX} from "d3-brush";
import {bisector, extent, max} from "d3-array";
import {line} from "d3-shape";
import {scaleLinear, scaleTime} from "d3-scale";
import {pointer, select} from 'd3-selection';

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

      var x = scaleTime()
        .domain(extent(data, function(d) { return new Date(d.date); }))
        .range([ 0, width ]);
      var xAxis = svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(axisBottom(x).ticks(5));

      var y = scaleLinear()
        .domain([-0.5, max(data, function(d) { return +d.value; })])
        .range([ height, 0 ]);
      svg.append("g")
        .call(axisLeft(y));

      var yAxisLabelText = 'Temperature Anomaly (ºC)';
      var xAxisLabelText = 'Date';

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', `translate(180,390)`)
        .text(xAxisLabelText);

      svg.append('text')
        .style('fill', 'white')
        .attr('transform', "translate(-40,230), rotate(270)")
        .text(yAxisLabelText);

      svg.append("path")
        .datum(data)
        .attr("fill", "none")
        .attr("stroke", "#FF453A")
        .attr("stroke-width", 1.5)
        .attr("d", line()
          .x(function(d) { return x(new Date(d.date)) })
          .y(function(d) { return y(d.value) })
        )

      svg.append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", y(0))
        .attr("y2", y(0))
        .attr("stroke", "grey")
        .attr("stroke-dasharray", "4");

      // This allows to find the closest X index of the mouse:
      var bisect = bisector(function(d) { return new Date(d.date); }).left;

      // Create the circle that travels along the curve of chart
      var focus = svg
        .append('g')
        .append('circle')
        .style("fill", "white")
        .attr("stroke", "white")
        .attr('r', 4.5)
        .style("opacity", 0)

      // Create the text that travels along the curve of chart
      var focusText = svg
        .append('g')
        .append('text')
        .style("opacity", 0)
        .style("fill", "#FF453A")
        .style('font-size', '48px')
        .style('font-weight', '900')
        .style('font-family', 'Helvetica')
        .attr('transform','translate(50,100)')

      svg
        .append('rect')
        .style("fill", "none")
        .style("pointer-events", "all")
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', mouseover)
        .on('mousemove', mousemove)
        .on('mouseout', mouseout);


      // What happens when the mouse move -> show the annotations at the right positions.
      function mouseover() {
        focus.style("opacity", 1)
        focusText.style("opacity",1)
      }

      function mousemove(event, d) {
        // recover coordinate we need
        let xy = pointer(event);
        var x0 = x.invert(xy[0]);
        var i = bisect(data, x0, 1);
        if (i < data.length) {
          let selectedData = {"x": new Date(data[i].date), "y": data[i].value};
          focus
            .attr("cx", x(selectedData.x))
            .attr("cy", y(selectedData.y));
          focusText
            .html(`${selectedData.y} ºC`)
        }

      }
      function mouseout() {
        focus.style("opacity", 0)
        focusText.style("opacity", 0)
      }

    }
  },[data]);

  return (
    <div ref={d3Container} />
  );
}

export default Temp;
