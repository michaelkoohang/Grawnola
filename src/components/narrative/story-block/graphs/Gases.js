import React, {useEffect, useRef} from 'react';
import {arc, pie} from 'd3-shape';
import {interpolateCool} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {select} from 'd3-selection';

const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 320;
const height = 320;
const innerRadius = 70;
const outerRadius = Math.min(width, height) / 2.4 - margin.top - margin.bottom;

function Gases(props) {
  const d3Container = useRef(null);
  const {data} = props;

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    if (data && d3Container.current) {
      select(d3Container.current)
        .select('svg')
        .remove();

      const svg = select(d3Container.current)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .classed('svg-content', true)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const arcGenerator = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      const pieGenerator = pie()
        .padAngle(0)
        .value(d => d.value);

      const donut = svg
        .selectAll()
        .data(pieGenerator(data))
        .enter();

      donut.append('path')
        .attr('d', arcGenerator)
        .style('fill', (d, i) => colorScale(i))
        .style('stroke-width', 0);

      svg.append('text')
        .style("opacity", 1)
        .style("fill", "white")
        .style('font-size', '9px')
        .style('font-weight', '100')
        .style('font-family', 'Helvetica')
        .text('Overview of US Greenhouse Gas Emissions in 2018')
        .attr('transform',`translate(${-width/3},${-140})`)

      donut.append('text')
        .attr('text-anchor', 'middle')
        .attr('aligment-baseline', 'middle')
        .attr('font-size', '12px')
        .text(d => d.data.formula || d.data.name)
        .style('fill', 'white')
        .attr('transform', (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return (d.data.name === 'HFCs')
            ? `translate(${x}, ${y - 10})`
            : `translate(${x}, ${y})`;
        });

      donut.append('text')
        .attr('text-anchor', 'middle')
        .attr('aligment-baseline', 'middle')
        .attr('font-size', '10px')
        .text(d => `(${d.value}%)`)
        .style('fill', 'white')
        .attr('transform', (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return (d.data.name === 'HFCs')
            ? `translate(${x}, ${y})`
            : `translate(${x}, ${y + 13})`;
        });
    }
  }, [data, colorScale]);

  return (
    <div className="svg-container" ref={d3Container} />
  );
}

export default Gases;
