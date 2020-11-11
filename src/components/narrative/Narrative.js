import {Button, Container, Header, Icon, Modal, Transition} from "semantic-ui-react";
import Footer from '../footer/Footer';
import React, {useState, useEffect} from 'react';
import StoryProgress from "./story-progress/StoryProgress";
import StoryBlock from "./story-block/StoryBlock";
import './Narrative.css';
import earth from '../../img/earth.png';

function Narrative() {
  const [modalOpen, setModalOpen] = useState(true);
  const [currentStory, setCurrentStory] = useState(-1);
  const [visible] = useState([true, false, false, false, false, false, false, false]);
  const storyBlocks = [];

  // Set up each story block. Needed for the animation between blocks to work.
  for (let i = 0; i < 7; i++) {
    storyBlocks.push (
      <Transition visible={visible[i]} animation='fade' duration={500} key={i}>
        <Container>
          <StoryBlock story={i}/>
        </Container>
      </Transition>
    )
  }

  // Handler for keyboard presses.
  function handleKeyPress(event) {
    if (event.key === "ArrowLeft" && currentStory >= 0) {
      visible[currentStory] = false;
      visible[currentStory - 1] = true;
      setCurrentStory(currentStory - 1);
    }
    if (event.key === "ArrowRight" && currentStory < 6) {
      visible[currentStory] = false;
      visible[currentStory + 1] = true;
      setCurrentStory(currentStory + 1);
    }
  }

  // Add keyboard listener for arrow keys
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
            <p className="modal-title">Navigate with Your Keyboard</p>
          </Header>
          <Modal.Content>
            <p className="modal-content">
              Use the left and right arrow keys on your keyboard to move through the viz.
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
            <h1>Our global ecosystem <span id='resiliently'>resiliently</span> supports life on earth. But...</h1>
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
      { currentStory < 6
        ? <a href="#/interactive" className="skip-viz">Skip to Interactive Viz <Icon name="arrow right"/></a>
        : <Button href="#/interactive" className="go-viz" positive>Go to Interactive Viz <Icon name="arrow right"/></Button>
      }
      <Footer />
    </div>
  );
}

export default Narrative;
