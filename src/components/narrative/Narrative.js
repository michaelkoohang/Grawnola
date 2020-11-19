import {Button, Container, Header, Icon, Modal, Transition} from "semantic-ui-react";
import React, {useState, useEffect} from 'react';
import StoryProgress from "./story-progress/StoryProgress";
import StoryBlock from "./story-block/StoryBlock";
import './Narrative.css';

import earth from '../../img/earth.png';
import text from '../../data/narrative/text.json';

function Narrative() {
  const [modalOpen, setModalOpen] = useState(true);
  const [currentStory, setCurrentStory] = useState(-1);
  const [visible] = useState([true, false, false, false, false, false, false, false]);
  const storyBlocks = [];

  for (let i = 0; i < text.length; i++) {
    storyBlocks.push (
      <Transition visible={visible[i]} animation='fade' duration={500} key={i}>
        <Container>
          <StoryBlock story={i}/>
        </Container>
      </Transition>
    )
  }

  function handleKeyPress(event) {
    if (event.key === "ArrowLeft" && currentStory >= 0) {
      visible[currentStory] = false;
      visible[currentStory - 1] = true;
      setCurrentStory(currentStory - 1);
    }
    if (event.key === "ArrowRight" && currentStory < text.length - 1) {
      visible[currentStory] = false;
      visible[currentStory + 1] = true;
      setCurrentStory(currentStory + 1);
    }
  }

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress, false);
    return () => {
      document.removeEventListener("keydown", handleKeyPress, false);
    };
  });

  return (
    <div className="narrative" onKeyPress={() => handleKeyPress()}>
      <Container>
        <Modal
          basic
          onClose={() => setModalOpen(false)}
          open={modalOpen}
          size='small'
        >
          <Header icon>
            <div className="modal-icons">
              <Icon name='arrow left' />
              <Icon name='keyboard' />
              <Icon name='arrow right' />
            </div>
            <p className="modal-title">Navigate with your keyboard</p>
          </Header>
          <Modal.Content>
            <p className="modal-content">
              Use the left and right arrow keys on your keyboard to move through the visualizations.
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={() => setModalOpen(false)}>
              <Icon name='checkmark' /> Ok
            </Button>
          </Modal.Actions>
        </Modal>
        <Transition visible={currentStory < 0} animation='fade' duration={500}>
          <Container className="title-block">
            <h1>Our global ecosystem <span id='resiliently'>resiliently</span> supports life on earth, but...</h1>
            <img src={earth} alt='Earth'/>
          </Container>
        </Transition>
        <Transition visible={currentStory >= 0} animation='fade' duration={500}>
          <Container>
            <StoryProgress story={currentStory} />
            <Container className="story-container">
              {storyBlocks}
            </Container>
          </Container>
        </Transition>
      </Container>
      { currentStory < text.length - 1
        ? (<a href="#/interactive" className="skip-viz">
            Skip to your CO<sub>2</sub> impact<Icon name="arrow right"/>
          </a>)
        : (<Button href="#/interactive" className="go-viz" positive>
            Explore your CO<sub>2</sub> impact<Icon name="arrow right"/>
          </Button>)
      }
    </div>
  );
}

export default Narrative;
