import React, {useEffect, useRef} from 'react';
import {arc, pie} from 'd3-shape';
import {interpolateCool} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {select} from 'd3-selection';
import {round} from 'lodash';

const margin = {top: 10, right: 10, bottom: 10, left: 10};
const width = 300;
const height = 300;
const innerRadius = 65;
const outerRadius = Math.min(width, height) / 2.5 - margin.top - margin.bottom;

function Categories(props) {
  const d3Container = useRef(null);
  const {data} = props;

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    if (data && d3Container.current) {
      let total_carbon = data.reduce((a, b) => a + (b["value"] || 0), 0);
      select(d3Container.current)
        .select('svg')
        .remove();

      const svg = select(d3Container.current)
        .append('svg')
        .attr('preserveAspectRatio', 'xMidYMin')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .classed('single-svg', true)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      svg.append('text')
        .text("Emissions Categories")
        .attr('transform', `translate(-85,-130)`)
        .style('fill', 'white')
        .style('font-size', '18px')
        .style('font-weight', '200')
        .style('font-family', 'Helvetica')

      if (total_carbon > 0) {
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

        const arcLabel = arc()
          .innerRadius(outerRadius * 0.9)
          .outerRadius(outerRadius * 0.9);

        donut.append('polyline')
          .attr('stroke', 'white')
          .style('fill', 'none')
          .attr('stroke-width', 1)
          .attr('opacity', d => {
            if (d.data.value === 0) {
              return "0"
            }
          })
          .attr('points', (d) => {
            const posA = arcGenerator.centroid(d);
            const posB = arcLabel.centroid(d);
            const posC = arcLabel.centroid(d);
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2
            posC[0] = outerRadius * 0.88 * (midAngle < Math.PI ? 1 : -1);
            return [posA, posB, posC];
          });

        donut.append('text')
          .text(d => d.data.name.charAt(0).toUpperCase() + d.data.name.slice(1))
          .attr('opacity', d => {
            if (d.data.value === 0) {
              return "0"
            }
          })
          .attr('transform', (d) => {
            const pos = arcLabel.centroid(d);
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = outerRadius * 0.9 * (midAngle < Math.PI ? 1 : -1);
            return `translate(${pos})`;
          })
          .style('text-anchor', (d) => {
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midAngle < Math.PI ? 'start' : 'end');
          })
          .style('fill', 'white');

        donut.append('text')
          .text(d => (round(d.data.value).toLocaleString() + " kg"))
          .attr('opacity', d => {
            if (d.data.value === 0) {
              return "0"
            }
          })
          .attr('transform', (d) => {
            const pos = arcLabel.centroid(d);
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            pos[0] = outerRadius * 0.9 * (midAngle < Math.PI ? 1 : -1);
            return `translate(${pos}), translate(0,20)`;
          })
          .style('text-anchor', (d) => {
            const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
            return (midAngle < Math.PI ? 'start' : 'end');
          })
          .style('fill', 'white');
      } else {
        svg.append('text')
          .text("Add data on the control panel")
            .attr('transform', `translate(-125,-40)`)
          .style('fill', '#6b6b6b')
          .style('font-size', '20px')
          .style('font-family', 'Helvetica')

        svg.append('text')
          .text("to see your emissions!")
          .attr('transform', `translate(-90,-10)`)
          .style('fill', '#6b6b6b')
          .style('font-size', '20px')
          .style('font-family', 'Helvetica')
      }
    }
  }, [data, colorScale]);

  return (
    <div className='single-container' ref={d3Container} />
  );
}

export default Categories;
