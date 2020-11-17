import React, {useEffect, useRef} from 'react';
import {Button} from 'semantic-ui-react';
import {range} from 'd3-array';
import {select} from 'd3-selection';

import {
  getGridColor,
  getGridLabel,
  getGridSize,
  MAX_GRID_SIZE
} from './grid-conversions';

const width = 500;
const height = 275;

const groupSpacing = 3;
const cellSpacing = 1;
const cellSize = Math.floor((width - 11 * groupSpacing) / 100) - cellSpacing;
const offset = Math.floor((width - 100 * cellSize - 90 * cellSpacing - 11 * groupSpacing) / 2);

function Grid(props) {
  const d3Container = useRef(null);
  const {data} = props;

  function updateGrid(newEmissions) {
    const emissionCells = getGridSize(newEmissions);
    const svg = select(d3Container.current).select('svg');
    const cell = svg.select('g')
      .selectAll('rect')
      .data(range(MAX_GRID_SIZE));

    cell.exit()
      .remove();

    cell.enter()
      .append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', i => {
        const x0 = Math.floor(i / 100) % 10;
        const x1 = Math.floor(i % 10);
        return groupSpacing * x0 + (cellSpacing + cellSize) * (x1 + x0 * 10);
      })
      .attr('y', i => {
        const y0 = Math.floor(i / 1000);
        const y1 = Math.floor(i % 100 / 10);
        return groupSpacing * y0 + (cellSpacing + cellSize) * (y1 + y0 * 10); 
      })
      .attr('fill', i => i > emissionCells
        ? '#8E8E93'
        : getGridColor(newEmissions));

    svg.append('text')
      .attr('x', offset)
      .attr('y', offset)
      .text(getGridLabel(newEmissions))
      .style('fill', 'white');
  }

  // component mounted
  useEffect(() => {
    if (data && d3Container.current) {
      select(d3Container.current)
        .select('svg')
        .remove();

      const svg = select(d3Container.current)
        .append('svg')
        .attr('preserveAspectRatio', 'xMinYMin meet')
        .attr('viewBox', `0 0 ${width} ${height + 50}`);

      svg.append('g')
        .attr('class', 'cells')
        .attr('transform', `translate(${offset}, ${offset})`);

      updateGrid(data.emissions);
    }
  },
  []);

  return(
    <div className="national-container" ref={d3Container} />
  );
}

export default Grid;
