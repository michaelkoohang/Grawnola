import React from 'react';
import './StoryProgress.css';
import {Grid, Progress} from "semantic-ui-react";

function StoryProgress(props) {

  const bars = [];

  for (let i = 0; i < 7; i++) {
    if (i <= props.story) {
      bars.push(
        <Grid.Column key={i}>
          <Progress indicating percent={100}/>
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
      <Grid columns={7}>
        <Grid.Row>
          {bars}
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default StoryProgress;
