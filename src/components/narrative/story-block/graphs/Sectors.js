import React, {useEffect, useRef} from 'react';
import {select} from 'd3-selection';
import {hierarchy, treemap} from 'd3-hierarchy';
import {scaleLinear, scaleOrdinal} from 'd3-scale';
import {filter, map} from 'lodash';

import './SvgStyles.css';

// SOURCES
// https://www.d3-graph-gallery.com/graph/treemap_custom.html
// https://www.pluralsight.com/guides/d3-treemap-in-react

// set the dimensions and margins of the graph
const margin = {top: 10, right: 10, bottom: 10, left: 10};
// TODO pass width and height as props
const width = 900;
const height = 900;

function Sectors(props) {
  const d3Container = useRef(null);
  const {data} = props;

  useEffect(() => {
    if (data && d3Container.current) {
      const color = scaleOrdinal()
        .domain(map(data.children, sector => sector.name))
        .range([
          '#FF2D55', // Transportation
          '#64D2FF', // Electricity
          '#FF9F0A', // Industry
          '#32D74B', // Agriculture
          // '#5E5CE6', // Commercial
          '#BF5AF2' // Residential
        ]);

      const opacity = scaleLinear()
        .domain([0, 17]) // NOTE hardcoded values for transportation sub-sectors
        .range([.6,1]);

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
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const root = hierarchy(data)
        .sum(d => d.value);

      console.info('@Sectors root', root);

      treemap()
        .size([width - (margin.right + margin.left), height - (margin.top + margin.bottom)])
        .paddingTop(30)
        .paddingRight(margin.right)
        .paddingInner(3)
        .round(true)
        (root);


      const nodes = svg.selectAll('rect')
        .data(root.leaves());

      // draw rectangles
      nodes.enter()
        .append('rect')
        .attr('id', d => d.data.name)
        .attr('x', d => d.x0)
        .attr('y', d => d.y0)
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .style('stroke', 'white')
        .style('fill', d => {
          if (d.data.colname !== 'level3') return 'none';
          // if (d.data.name === 'Transportation') return 'white';
          // return color(d.parent && d.parent.data.name !== 'Sectors'
          //   ? d.parent.data.name
          //   : d.data.name)
          return color(d.parent.data.name);
        })
        .style('opacity', d => d.data.colname === 'level3'
          ? opacity(d.data.value) : 1);

      nodes.exit().remove()

      const nodeText = svg
        .selectAll('text')
        .data(root.leaves());

      // add main text
      nodeText.enter()
        .append('text')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 20)
        .text(d => d.data.subsector
          ? d.data.name
          : '')
        .attr('font-size', '18px')
        .attr('fill', 'white')

      const nodeVals = svg.selectAll('vals')
        .data(root.leaves())

      // display the values
      nodeVals.enter()
        .append('text')
        .attr('x', d => d.x0 + 5)
        .attr('y', d => d.y0 + 40)
        .text(d => d.data.subsector
          ? `${d.data.percent}%`
          : '')
        .attr('font-size', '16px')
        .attr('fill', 'white')

      // parent node titles
      svg.selectAll('titles')
        .data(filter(root.descendants(), sector => sector.depth === 1))
        .enter()
        .append('text')
        .attr('x', d => d.x0)
        .attr('y', d => d.y0 + 24)
        .text(d => `${d.data.name} (${d.data.percent}%)`)
        .attr('font-size', d => d.data.name === 'Agriculture'
          ? '21px'
          : '24px')
        .attr('fill', d => color(d.data.name));
    }
  },
  [data, d3Container.current]);

  return (
    <div id="container" className="svg-container" ref={d3Container} />
  );
}

export default Sectors;
