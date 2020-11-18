import React, {useEffect, useRef} from 'react';
import {arc, pie} from 'd3-shape';
import {interpolateCool, interpolateWarm} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {select} from 'd3-selection';
import {round} from 'lodash';

// import './SvgStyles.css';

// SOURCES
// https://medium.com/@Elijah_Meeks/interactive-applications-with-react-d3-f76f7b3ebc71
// https://chartio.com/resources/tutorials/how-to-resize-an-svg-when-the-window-is-resized-in-d3-js/

const margin = {top: 10, right: 10, bottom: 10, left: 10};
// TODO pass width/height and radii as props
const width = 300;
const height = 300;
const innerRadius = 65;
const outerRadius = Math.min(width, height) / 2.5 - margin.top - margin.bottom;

function Categories(props) {
  const d3Container = useRef(null);
  const {data} = props;

  const colorScale = scaleSequential()
    .interpolator(interpolateWarm)
    .domain([0, data.length]);

  useEffect(() => {
      if (data && d3Container.current) {
        let total_carbon = data.reduce((a, b) => a + (b["value"] || 0), 0);
        // remove the old svg
        select(d3Container.current)
          .select('svg')
          .remove();

        // create new svg
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
          // .style('opacity', 0.9)
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
          // TODO add interactivity so that when you hover different sections of the
          // donut, you can preview info on each of the greenhouse gases

          // Add labels
          // donut.append('text')
          //   .attr('text-anchor', 'middle')
          //   .attr('aligment-baseline', 'middle')
          //   .attr('font-size', '12px')
          //   .text(d => d.data.formula || d.data.name)
          //   .style('fill', 'white')
          //   .attr('transform', (d) => {
          //     const [x, y] = arcGenerator.centroid(d);
          //     return (d.data.name === 'Fluorinated gases')
          //       ? `translate(${x}, ${y - 15})`
          //       : `translate(${x}, ${y})`;
          //   });
          //
          // donut.append('text')
          //   .attr('text-anchor', 'middle')
          //   .attr('aligment-baseline', 'middle')
          //   .attr('font-size', '10px')
          //   .text(d => `(${d.value}%)`)
          //   .style('fill', 'white')
          //   .attr('transform', (d) => {
          //     const [x, y] = arcGenerator.centroid(d);
          //     return (d.data.name === 'Fluorinated gases')
          //       ? `translate(${x}, ${y})`
          //       : `translate(${x}, ${y + 13})`;
          //   });

          // NOTE if you comment out the code for the labels above,
          // and instead use the code that's commented out below, you get labels
          // with fancy lines outside of the donut.
          // TODO figure out how to size the svg properly so that the labels
          // are not cut out of the svg bounds
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
            // .style('font-weight', '800')
            .style('font-family', 'Helvetica')
          svg.append('text')
            .text("to see your emissions!")
            .attr('transform', `translate(-90,-10)`)
            .style('fill', '#6b6b6b')
            .style('font-size', '20px')
            // .style('font-weight', '600')
            .style('font-family', 'Helvetica')

        }


      }
    },
    [data, d3Container.current]);

  return (
    <div className='single-container' ref={d3Container} />
  );
}

export default Categories;
