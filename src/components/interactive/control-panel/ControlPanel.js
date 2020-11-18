import React, {useState} from 'react';
import {filter, map} from 'lodash';
import {Button, Icon, Checkbox, List, Label} from "semantic-ui-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';
import FlightsModal from "./flights/FlightsModal";
import CarsModal from "./cars/CarsModal";
import ShippingModal from "./shipping/ShippingModal";

import {offsets} from '../emission_conversions';

function ControlPanel(props) {

  const [electricityLabel, setElectricityLabel] = useState(0);
  const [treesLabel, setTreesLabel] = useState(0);
  const [openFlights, setOpenFlights] = useState(false);
  const [openCars, setOpenCars] = useState(false);
  const [openShipping, setOpenShipping] = useState(false);

  function updateElectricityLabel(value) { setElectricityLabel(value) }
  function updateTreesLabel(value) {
    setTreesLabel(value);
    props.updateOffsets(value);
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
        <h2>
          <Icon color='red' name='fire' />
          Emissions
        </h2>
        <div className="emissions-header">
          <h3 className="emissions-title">
            <Icon name="lightning" color="yellow" />
            Electricity Bill
          </h3>
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
        <h3><Icon name="plane" color="teal" /> Flights</h3>
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
        <h3><Icon name="car" color="purple" /> Cars</h3>
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
        <h3><Icon name="box" color="brown" /> Shipping</h3>
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
        <h2><Icon name="leaf" color="green" /> Offsets</h2>
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
            step={1}
            min={0}
            max={10}
            className="tree-slider"
          />
        </div>
      </div>
      <div className="emissions">
        <h2>
          <Icon color='blue' name='sliders horizontal' />
          &nbsp;Multipliers
        </h2>
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
    </div>
  );
}

export default ControlPanel;
