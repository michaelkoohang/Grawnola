import React, {useState} from 'react';
import {Button, Modal, Header, Radio, Dropdown, Grid, Message} from "semantic-ui-react";
import './FlightsModal.css';
import airports from '../../../../data/interactive/us_airports.json';

function FlightsModal(props) {

  // Flights
  const [oneWayRoundTrip, setOneWayRoundTrip] = useState(0);
  const [fromDestination, setFromDestination] = useState("");
  const [toDestination, setToDestination] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  function addFlight() {
    if (toDestination.length > 0 && fromDestination.length > 0) {
      setErrorHidden(true);
      let flight;
      if (oneWayRoundTrip === 0) {
        flight = {
          "type": "flight",
          "passengers": 1,
          "legs": [
            {"departure_airport": fromDestination, "destination_airport": toDestination},
          ]
        };
      } else {
        flight = {
          "type": "flight",
          "passengers": 1,
          "legs": [
            {"departure_airport": fromDestination, "destination_airport": toDestination},
            {"departure_airport": toDestination, "destination_airport": fromDestination}
          ]
        };
      }
      props.toggleFlightsModal(false);
      setToDestination("");
      setFromDestination("");
      props.updateFlights(flight);
    } else {
      setErrorHidden(false);
    }
  }

  function cancelFlight() {
    setToDestination("");
    setFromDestination("");
    setOneWayRoundTrip(0);
    setErrorHidden(true);
    props.toggleFlightsModal(false);
  }

  return (
    <Modal
      open={props.openFlights}
      size="tiny"
      className="flight-modal"
    >
      <Header className="modal-header" icon="plane" content="Add Flight"/>
      <Modal.Content>
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <h4>From</h4>
              <Dropdown
                fluid
                options={airports}
                placeholder='From'
                search
                selection
                onChange={(event, data) => setFromDestination(data.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <h4>To</h4>
              <Dropdown
                fluid
                options={airports}
                placeholder='To'
                search
                selection
                onChange={(event, data) => setToDestination(data.value)}
              />
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Radio
                label='One Way'
                value='One Way'
                checked={oneWayRoundTrip === 0}
                onChange={() => setOneWayRoundTrip(0)}
              />
              <br />
              <Radio
                label='Round Trip'
                value='Round Trip'
                checked={oneWayRoundTrip === 1}
                onChange={() => setOneWayRoundTrip(1)}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
        <Message negative hidden={errorHidden}>
          <Message.Header>Something went wrong.</Message.Header>
          <p>Please make sure you fill out all information correctly.</p>
        </Message>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='red'
          onClick={() => cancelFlight()}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          positive
          onClick={() => addFlight()}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default FlightsModal;
