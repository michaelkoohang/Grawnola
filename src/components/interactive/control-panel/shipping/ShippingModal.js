import React, {useState} from 'react';
import {Button, Modal, Header, Input, Dropdown, Grid, Message} from "semantic-ui-react";
import './ShippingModal.css';
import shipping_methods from '../../../../data/interactive/shipping_methods.json';

function ShippingModal(props) {

  const [weight, setWeight] = useState(0);
  const [distance, setDistance] = useState(0);
  const [method, setMethod] = useState("");
  const [errorHidden, setErrorHidden] = useState(true);

  function addShipping() {
    try {
      let new_weight = parseFloat(weight);
      let new_distance = parseFloat(distance);

      if (new_weight > 0 && new_distance > 0) {
        setErrorHidden(true);
        let item = {
          "weight": new_weight,
          "distance": new_distance,
          "method": method
        };
        props.toggleShippingModal(false);
        setWeight(0);
        setDistance(0);
        props.updateShipping(item);
      } else {
        setErrorHidden(false);
      }
    } catch(err) {
      setErrorHidden(false);
    }
  }

  function cancelShipping() {
    setWeight(0);
    setDistance(0);
    setErrorHidden(true);
    props.toggleShippingModal(false);
  }

  return (
    <Modal
      open={props.openShipping}
      size="tiny"
      className="shipping-modal"
    >
      <Header className="modal-header" icon="box" color='brown' content="Add Package"/>
      <Modal.Content>
        <Grid columns={3} widths="equal">
          <Grid.Row>
            <Grid.Column>
              <h4>Weight (lbs)</h4>
              <Input
                type='number'
                placeholder='Weight'
                fluid
                onChange={(event) => setWeight(event.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Distance (miles)</h4>
              <Input
                type='number'
                placeholder='Distance'
                fluid
                onChange={(event) => setDistance(event.target.value)}
              />
            </Grid.Column>
            <Grid.Column>
              <h4>Transport Method</h4>
              <Dropdown
                fluid
                options={shipping_methods}
                placeholder='Method'
                selection
                onChange={(event, data) => setMethod(data.value)}
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
          onClick={() => cancelShipping()}>
          Cancel
        </Button>
        <Button
          content="Save"
          labelPosition='right'
          icon='checkmark'
          positive
          onClick={() => addShipping()}
        />
      </Modal.Actions>
    </Modal>
  );
}

export default ShippingModal;
