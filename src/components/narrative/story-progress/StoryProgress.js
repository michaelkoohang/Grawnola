import React from 'react';
import './StoryProgress.css';
import {Grid, Progress} from "semantic-ui-react";

import text from '../../../data/narrative/text.json';

function StoryProgress(props) {

  const bars = [];

  for (let i = 0; i < text.length; i++) {
    if (i <= props.story) {
      bars.push(
        <Grid.Column key={i}>
          <Progress color='grey' inverted indicating percent={100}/>
        </Grid.Column>
      );
    } else {
      bars.push(
        <Grid.Column key={i}>
          <Progress className="inactive" percent={100}/>
        </Grid.Column>
      );
    }
  }

  return (
    <div className="story-progress">
      <Grid columns={text.length}>
        <Grid.Row>
          {bars}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default StoryProgress;
