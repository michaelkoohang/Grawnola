import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {axisBottom, axisLeft} from "d3-axis";
import {scaleLinear, scaleBand} from "d3-scale";

// TODO pass width/height and radii as props
const margin = {top: 0, right: 0, bottom: 0, left: 100},
  width = 460 - margin.left - margin.right,
  height = 280 - margin.top - margin.bottom,
  heightTranslated = height / 3.2;

function Budget(props) {
  const d3Container = useRef(null);
  const data = [props.data / 1000];
  console.log(data)

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
        .attr('transform', "translate(80,40)")
        .style('fill', '#6b6b6b')
        .style('font-size', '24px')
        .style('font-weight', '200')
        .style('font-family', 'Helvetica')
        .text(titleText);

      if (data > 0) {
        var x = scaleLinear()
          .domain([0, 15.5])
          .range([ 0, width]);
        svg.append("g")
          .attr("transform", "translate(0," + 240 + ")")
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
          .call(axisLeft(y))

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
      } else {
        svg.append('text')
          .text("Add data on the control panel")
          .attr('transform', `translate(0,130)`)
          .style('fill', '#6b6b6b')
          .style('font-size', '24px')
          .style('font-weight', '600')
          .style('font-family', 'Helvetica')
        svg.append('text')
          .text("to see your emissions!")
          .attr('transform', `translate(40,160)`)
          .style('fill', '#6b6b6b')
          .style('font-size', '24px')
          .style('font-weight', '600')
          .style('font-family', 'Helvetica')
      }

    }
  },[data, d3Container.current]);

  return (
    <div className='single-container' ref={d3Container} />
  );
}

export default Budget;
