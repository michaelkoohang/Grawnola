import React, {useState} from 'react';
import {filter, map} from 'lodash';
import {Button, Icon, Checkbox, List, Label, Popup, Modal, Message, Header} from "semantic-ui-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';
import FlightsModal from "./flights/FlightsModal";
import CarsModal from "./cars/CarsModal";
import ShippingModal from "./shipping/ShippingModal";

import {offsets} from '../emission_conversions';
import {
  emissionsTitle,
  electricityTitle,
  flightsTitle,
  carsTitle,
  shippingTitle,
  offsetsTitle,
  multipliersTitle
} from './headers';

function ControlPanel(props) {

  const [electricityLabel, setElectricityLabel] = useState(0);
  const [treesLabel, setTreesLabel] = useState(0);
  const [openFlights, setOpenFlights] = useState(false);
  const [openCars, setOpenCars] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  const [introOpen, setIntroOpen] = useState(true);

  function updateElectricityLabel(value) { setElectricityLabel(value) }
  function updateTreesLabel(value) {
    setTreesLabel(value);
    // props.updateOffsets(value);
  }

  // Modal logic
  function toggleFlightsModal(hidden) { setOpenFlights(hidden); }
  function updateFlights(flight) { props.updateFlights(flight); }
  function deleteFlight(flight) { props.deleteFlight(flight); }

  function toggleCarsModal(hidden) { setOpenCars(hidden); }
  function updateCars(car) { props.updateCars(car); }
  function deleteCar(car) { props.deleteCar(car); }

  function toggleShippingModal(hidden) { setOpenShipping(hidden); }
  function updateShipping(item) { props.updateShipping(item); }
  function deleteShipping(flight) { props.deleteShipping(flight); }

  return (
    <div className="input-panel">
      <div className="emissions">
      <Popup basic trigger={emissionsTitle}>
      <Popup.Header>Emissions</Popup.Header>
        <Popup.Content>
          Add estimates for your behavior to calculate your CO<sub>2</sub> emissions.
          Values correspond to yearly emissions.
        </Popup.Content>
      </Popup>
        <div className="emissions-header">
        <Popup basic trigger={electricityTitle}>
        <Popup.Header>Electricity</Popup.Header>
          <Popup.Content>
            The average American pays $50 per month.
            Our emissions calculator uses the&nbsp;
            <a href="https://www.carboninterface.com">Carbon Interface API.</a>
          </Popup.Content>
        </Popup>
          <h3 className="offset-tree-value">
            <Icon name='dollar' color='yellow' />
            {electricityLabel}
          </h3>
        </div>
        <Slider
          onChange={updateElectricityLabel}
          onAfterChange={props.updateElectricity}
          step={1}
          min={0}
          max={500}
        />
      </div>
      <div className="emissions">
        <Popup basic trigger={flightsTitle}>
        <Popup.Header>Flights</Popup.Header>
          <Popup.Content>
            Our emissions calculator uses the&nbsp;
            <a href="https://www.carboninterface.com">Carbon Interface API.</a>
          </Popup.Content>
        </Popup>
        { props.flights.map((flight, index) => (
          <Button
            as='div'
            basic
            className='flight-label'
            key={index}
            labelPosition='left'
            size='mini'>
            <Label as='div' basic size='mini'>
              <Button.Content>{flight.from.toUpperCase()}
                <Icon name='right arrow' className='flight-arrow'/>
                {flight.to.toUpperCase()} ({flight.oneWayRound})
              </Button.Content>
            </Label>
            <Button
              animated='vertical'
              basic
              color='red'
              onClick={() => deleteFlight(flight)}
              size='mini'>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{flight.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button
          size="mini"
          onClick={() => setOpenFlights(true)}>
            <Icon name="add" />
            Add flight
        </Button>
      </div>
      <div className="emissions">
        <Popup basic trigger={carsTitle}>
        <Popup.Header>Cars</Popup.Header>
          <Popup.Content>
            This projection is based on the mileage of a Toyota Corolla 2017.
            Our emissions calculator uses the&nbsp;
            <a href="https://www.carboninterface.com">Carbon Interface API.</a>
          </Popup.Content>
        </Popup>
        { props.cars.map((car, index) => (
          <Button
            as='div'
            basic
            className='flight-label'
            key={index}
            labelPosition='left'
            size='tiny'>
            <Label as='div' basic size='tiny'>
              <Button.Content>{car.miles} mi / {car.frequency} </Button.Content>
            </Label>
            <Button
              animated='vertical'
              basic
              color='red'
              onClick={() => deleteCar(car)}
              size='tiny'>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{car.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button size="mini" onClick={() => setOpenCars(true)}><Icon name="add" />Add car</Button>
      </div>
      <div className="emissions">
        <Popup basic trigger={shippingTitle}>
        <Popup.Header>Shipping</Popup.Header>
          <Popup.Content>
            Our emissions calculator uses the&nbsp;
            <a href="https://www.carboninterface.com">Carbon Interface API.</a>
          </Popup.Content>
        </Popup>
        { props.shipping.map((shipment, index) => (
          <Button
            as='div'
            basic
            className='flight-label'
            key={index}
            labelPosition='left'
            size='tiny'>
            <Label as='div' basic size='tiny'>
              <Button.Content>
                {shipment.weight} lbs | {shipment.distance} mi | {shipment.method}
              </Button.Content>
            </Label>
            <Button
              animated='vertical'
              basic color='red'
              onClick={() => deleteShipping(shipment)}
              size='tiny'>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{shipment.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button size="mini" onClick={() => setOpenShipping(true)}><Icon name="add" />Add package</Button>
      </div>
      <div className="emissions">
        <Popup basic trigger={offsetsTitle}>
        <Popup.Header>Offsets</Popup.Header>
          <Popup.Content>
            <p>Select behaviors to offset your CO<sub>2</sub> emissions.</p>
            <ul>
              <li>Going vegan saves 3,372.91 kg of CO<sub>2</sub> per year</li>
              <li>Living car free saves 5,355.57 kg CO<sub>2</sub> per year</li>
              <li>Recycling saves 136.08 kg of CO<sub>2</sub> per year</li>
              <li>Planting a tree saves 33.11kg of CO<sub>2</sub> per year</li>
            </ul>
          </Popup.Content>
        </Popup>
        {map(filter(offsets, offset => !offset.multiplier), offset => (
          <Checkbox
            className='offset'
            key={`offset-${offset.id}`}
            label={offset.label}
            onChange={props.updateOffsets} />
        ))}
        <div className="offset-tree">
          <div className="offset-tree-header">
            <p className="offset-tree-label">Plant a tree</p>
            <h3 className="offset-tree-value">
              <Icon name="tree" color="green" />
              {(treesLabel).toLocaleString()}
            </h3>
          </div>
          <Slider
            onChange={updateTreesLabel}
            onAfterChange={props.updateOffsets}
            step={1}
            min={0}
            max={100}
            className="tree-slider"
          />
        </div>
      </div>
      <div className="emissions">
        <Popup basic trigger={multipliersTitle}>
        <Popup.Header>Multipliers</Popup.Header>
          <Popup.Content>
            Scale the people slider to see the collective action if everyone
            had the same carbon footprint as you.
          </Popup.Content>
        </Popup>
        <div className="emissions-header">
          <h3 className="emissions-title">
            <Icon name="users" color="blue" />
            &nbsp;Community
          </h3>
          <h3 className="emissions-value">
            <Icon name="user" color="blue" />
            {(props.people).toLocaleString()}
          </h3>
        </div>
        <Slider
          onChange={props.updatePeople}
          step={20000000}
          min={1}
          max={328000000}
          dots={true}
        />
      </div>

      {/* Modals */}
      <FlightsModal
        openFlights={openFlights}
        toggleFlightsModal={toggleFlightsModal}
        updateFlights={updateFlights}
      />
      <ShippingModal
        openShipping={openShipping}
        toggleShippingModal={toggleShippingModal}
        updateShipping={updateShipping}
      />
      <CarsModal
        openCars={openCars}
        toggleCarsModal={toggleCarsModal}
        updateCars={updateCars}
      />
      <Modal
        basic
        onClose={() => setIntroOpen(false)}
        open={introOpen}
        size='small'>
        <Header icon>
          <div className="modal-icons">
            <Icon name='thermometer full' />
            {/* <Icon name='globe' /> */}
          </div>
          <p className="modal-title">Optimize your CO<sub>2</sub> budget</p>
        </Header>
        <Modal.Content>
          <p className="modal-content">
            You can use this interactive viz to explore how you can offset your own CO<sub>2</sub> emitting behviors.
          </p>
          <Message color='black'>
            <Message.Header><Icon name='list ol'/> Directions</Message.Header>
            <List ordered inverted>
              <List.Item>You can use the control panel on the left to enter your behaviors, and explore offsets that you can do</List.Item>
              <List.Item>The net carbon impact of your choices is visualized by your personal budget, and your goal is to stay within your 16.7 mt limit (the US's per capita goal for 2020 according to the Paris Agreement).</List.Item>
              <List.Item>At the bottom you will see the US National CO2 emissions, far over budget. Use the people slider to visualize the impact on the national budget if more people behaved like you.</List.Item>
            </List>
          </Message>
        </Modal.Content>
        <Modal.Actions>
          <Button color='white' inverted onClick={() => setIntroOpen(false)}>
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}

export default ControlPanel;
