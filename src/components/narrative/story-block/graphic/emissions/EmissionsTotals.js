import React from 'react';
import {Container} from "semantic-ui-react";
import {select} from 'd3-selection';
import {json} from 'd3-fetch';

import emissions_totals from '../../../../../data/narrative/emissions_totals.json';

function EmissionsTotals(props) {
  // set the dimensions and margins of the graph
  const margin = {top: 10, right: 10, bottom: 10, left: 10};
  const width = 445 - margin.left - margin.right;
  const height = 445 - margin.top - margin.bottom;

  var svg = select("#emissions_totals")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  console.info('Input json', emissions_totals);
  // read json data
  json(emissions_totals, (data) => {
    console.info('data', data);
  });

  return (
    <Container>
      {"This is a test"}
    </Container>
  );
}

export default EmissionsTotals;
