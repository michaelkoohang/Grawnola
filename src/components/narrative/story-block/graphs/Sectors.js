import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {hierarchy, treemap} from 'd3-hierarchy';
import {scaleLinear, scaleOrdinal} from 'd3-scale';
import {filter, map} from 'lodash';

import './SvgStyles.css';

// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 10, left: 10};
// TODO pass width and height as props
const width = 800;
const height = 800;

function Sectors(props) {
  const d3Container = useRef(null);
  const {data} = props;

  useEffect(() => {
    if (data && d3Container.current) {
      const color = scaleOrdinal()
        .domain(map(data.children, sector => sector.name))
        .range(['#b1a0a0', '#e68f96', '#e8d166', '#9ce79c', '#608ba5', ' 	#a996a9'])

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
        .append('g');

      const root = hierarchy(data)
        .sum(d => d.value);

      console.info('@Sectors root', root);

      treemap()
        .size([width, height])
        .paddingTop(margin.top * 2)
        .paddingRight(margin.right)
        .paddingInner(1)
        .paddingOuter(3)
        .round(true)
        (root);


      const nodes = svg.selectAll('rect')
        .data(root.descendants());

      // draw rectangles
      nodes.enter()
        .append('rect')
        .attr('id', d => d.data.name)
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style('stroke', 'white');
        // .style('fill', d => color(d.parent.data.name || d.data.name));
        // .style('opacity', d => opacity(d.data.value))

      nodes.exit().remove()

      const nodeText = svg
        .selectAll('text')
        .data(root.leaves());

      // add main text
      nodeText.enter()
        .append('text')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 20)
        .text(d => d.data.name)
        .attr('font-size', '20px')
        .attr('fill', 'white')

      // const nodeVals = svg.selectAll('vals')
      //   .data(root.leaves())

      // // display the values
      // nodeVals.enter()
      //   .append('text')
      //   .attr('x', d => d.x0 + 5)
      //   .attr('y', d => d.y0 + 35)
      //   .text(d => `${d.data.value}%`)
      //   .attr('font-size', '12px')
      //   .attr('fill', 'white')

      // // parent node titles
      // svg.selectAll('titles')
      //   .data(filter(root.descendants(), sector => sector.depth === 1))
      //   .enter()
      //   .append('text')
      //   .attr('x', d => d.x0)
      //   .attr('y', d => d.y0 + 5)
      //   .text(d => d.data.name)
      //   .attr('font-size', '18px')
      //   .attr('fill', d => color(d.data.name));
    }
  },
  [data, d3Container.current]);

  return (
    <div id="container" className="svg-container" ref={d3Container} />
  );
}

export default Sectors;
