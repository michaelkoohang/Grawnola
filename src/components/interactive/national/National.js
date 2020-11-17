import React from 'react';
import {Segment} from "semantic-ui-react";

import {getInitEmissions} from './grid-conversions';

import Grid from './Grid';

import './National.css';

function National() {
  // const emissions = getInitEmissions() - 2000000000;
  // TODO compute emissions based on input from the control panel
  const emissions = getInitEmissions();

  console.info('@National emissions', emissions);

  return (
    <Segment className="national">
      <Grid data={{emissions}} />
    </Segment>
  );
}

export default National;
