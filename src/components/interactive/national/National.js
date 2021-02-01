import React from 'react';
import {Segment} from "semantic-ui-react";
import {getEmissions} from './grid-conversions';
import Grid from './Grid';
import './National.css';

const DEBUG = 0;

function National({carbon, people}) {
  const emissions = getEmissions(carbon, people);

  if(DEBUG) {
    console.info('@National carbon', carbon);
    console.info('@National emissions', emissions);
    console.info('@National people', people);
  }

  return (
    <Segment className="national">
      <Grid data={{emissions}} />
    </Segment>
  );
}

export default National;
