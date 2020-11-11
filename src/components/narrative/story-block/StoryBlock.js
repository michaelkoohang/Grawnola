import React from 'react';
import './StoryBlock.css';

function StoryBlock(props) {

  return (
    <div className="story-block">
      <h1>{props.name}</h1>
      <p>WHAT UP</p>
    </div>
  );
}

export default StoryBlock;
