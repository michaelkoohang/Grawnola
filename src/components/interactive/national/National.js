import React from 'react';
import {Segment} from "semantic-ui-react";

import Grid from './Grid';

import './National.css';

function National() {
  // NOTE our budget is 5,500 million metric tons of CO2 per year
  // encoding these as 1 little cell in the grid is 2 million metric tons of CO2
  const emissions = 2750;
  // TODO pass the emissions

  return (
    <Segment className="national">
      <Grid data={{emissions}} />
    </Segment>
  );
}

export default National;
