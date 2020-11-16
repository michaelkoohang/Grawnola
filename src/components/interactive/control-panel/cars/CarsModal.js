import React, {useState} from 'react';
import {Button, Modal, Header, Grid, Message, Input, Dropdown} from "semantic-ui-react";
import './CarsModal.css';
import driving_frequency from "../../../../data/interactive/driving_frequency.json";

function CarsModal(props) {

  const [miles, setMiles] = useState(0);
  const [frequency, setFrequency] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  function addCar() {
    try {
      let new_miles = parseInt(miles);
      if (new_miles > 0 && frequency.length > 0) {
        setErrorHidden(true);
        props.toggleCarsModal(false);
        setMiles(0);
        props.updateCars({"miles": miles, "frequency": frequency});
      } else {
        setErrorHidden(false);
      }
    } catch(err) {
      setErrorHidden(false);
    }
  }

  function cancelCar() {
    setMiles(0);
    setErrorHidden(true);
    props.toggleCarsModal(false);
  }

  return (
    <Modal
      open={props.openCars}
      size="tiny"
      className="cars-modal"
    >
      <Header className="modal-header" icon="car" content="Add Car"/>
      <Modal.Content>
        <Grid columns={2} widths='equal'>
          <Grid.Row>
            <Grid.Column>
              <h4>Miles Driven</h4>
              <Input
                type='number'
                placeholder='Distance'
                fluid
                onChange={(event) => setMiles(event.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Frequency</h4>
              <Dropdown
                fluid
                options={driving_frequency}
                placeholder='Frequency'
                selection
                onChange={(event, data) => setFrequency(data.value)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Message negative hidden={errorHidden}>
          <Message.Header>Something went wrong.</Message.Header>
          <p>Please make sure you fill out all information.</p>
        </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='red'
          onClick={() => cancelCar()}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          positive
          onClick={() => addCar()}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default CarsModal;
