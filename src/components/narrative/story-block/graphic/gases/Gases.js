import React, {useEffect, useRef} from 'react';
import {Container} from "semantic-ui-react";
import {arc, pie} from 'd3-shape';
import {interpolateCool} from 'd3-scale-chromatic';
import {scaleSequential} from 'd3-scale';
import {select} from 'd3-selection';

const margin = {top: 10, right: 10, bottom: 10, left: 10};
// TODO pass width/height and radii as props
const width = 300;
const height = 300;
const innerRadius = 100;
const outerRadius = Math.min(width, height) / 2 - margin.top;

function Gases(props) {
  const d3Container = useRef(null);
  const {data} = props;
  console.info('@Gases data', data);

  const colorScale = scaleSequential()
    .interpolator(interpolateCool)
    .domain([0, data.length]);

  useEffect(() => {
    if (data && d3Container.current) {
      // remove the old svg
      select(d3Container.current)
        .select('g')
        .remove();

      // create new svg
      const svg = select(d3Container.current)
        .append('g')
        .attr('transform', `translate(${width / 2}, ${height / 2})`);

      const arcGenerator = arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

      const pieGenerator = pie()
        .padAngle(0)
        .value(d => d.value);

      const doughnut = svg
        .selectAll()
        .data(pieGenerator(data))
        .enter();

      doughnut.append('path')
        .attr('d', arcGenerator)
        .style('fill', (d, i) => colorScale(i))
        .style('stroke-width', 0);
    }
  },
  [data, d3Container.current]);

  return (
    <svg
      className="gases"
      height={height}
      ref={d3Container}
      width={width} />
  );
}

export default Gases;
