import React, {useEffect, useRef} from 'react';
import {arc, pie} from 'd3-shape';
import {interpolateCool} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {select} from 'd3-selection';

import './SvgStyles.css';

// SOURCES
// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/

const margin = {top: 10, right: 10, bottom: 10, left: 10};
// TODO pass width/height and radii as props
const width = 320;
const height = 320;
const innerRadius = 80;
const outerRadius = Math.min(width, height) / 2 - margin.top - margin.bottom;

function Gases(props) {
  const d3Container = useRef(null);
  const {data} = props;

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    if (data && d3Container.current) {
      // remove the old svg
      select(d3Container.current)
        .select('svg')
        .remove();

      // create new svg
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
      // TODO add interactivity so that when you hover different sections of the
      // donut, you can preview info on each of the greenhouse gases

      // Add labels
      donut.append('text')
        .attr('text-anchor', 'middle')
        .attr('aligment-baseline', 'middle')
        .attr('font-size', '12px')
        .text(d => d.data.formula || d.data.name)
        .style('fill', 'white')
        .attr('transform', (d) => {
          const [x, y] = arcGenerator.centroid(d);
          return (d.data.name === 'Fluorinated gases')
            ? `translate(${x}, ${y - 15})`
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
          return (d.data.name === 'Fluorinated gases')
            ? `translate(${x}, ${y})`
            : `translate(${x}, ${y + 13})`;
        });

      // NOTE if you comment out the code for the labels above,
      // and instead use the code that's commented out below, you get labels
      // with fancy lines outside of the donut.
      // TODO figure out how to size the svg properly so that the labels
      // are not cut out of the svg bounds
      // const arcLabel = arc()
      //   .innerRadius(outerRadius * 0.9)
      //   .outerRadius(outerRadius * 0.9);

      // donut.append('polyline')
      //   .attr('stroke', 'white')
      //   .style('fill', 'none')
      //   .attr('stroke-width', 1)
      //   .attr('points', (d) => {
      //     const posA = arcGenerator.centroid(d);
      //     const posB = arcLabel.centroid(d);
      //     const posC = arcLabel.centroid(d);
      //     const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
      //     posC[0] = outerRadius * 0.88 * (midAngle < Math.PI ? 1 : -1);
      //     return [posA, posB, posC];
      //   });
      // donut.append('text')
      //   .text(d => d.data.name)
      //   .attr('transform', (d) => {
      //     const pos = arcLabel.centroid(d);
      //     const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      //     pos[0] = outerRadius * 0.9 * (midAngle < Math.PI ? 1 : -1);
      //     return `translate(${pos})`;
      //   })
      //   .style('text-anchor', (d) => {
      //     const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
      //     return (midAngle < Math.PI ? 'start' : 'end');
      //   })
      //   .style('fill', 'white');
    }
  },
  [data, d3Container.current]);

  return (
    <div id="container" className="svg-container" ref={d3Container} />
  );
}

export default Gases;
