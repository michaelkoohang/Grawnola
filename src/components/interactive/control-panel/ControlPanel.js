import React, {useState} from 'react';
import {Button, Icon, Checkbox, List, Label} from "semantic-ui-react";
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import './ControlPanel.css';
import FlightsModal from "./flights/FlightsModal";
import CarsModal from "./cars/CarsModal";
import ShippingModal from "./shipping/ShippingModal";

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
        <div className="emissions-header">
          <h4 className="emissions-title">
            <Icon name="lightning" color="yellow" />
            Electricity Bill
          </h4>
          <h2 className="emissions-value">${electricityLabel}</h2>
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
        <h4><Icon name="plane" color="blue" /> Flights</h4>
        { props.flights.map((flight, index) => (
          <Button as='div' labelPosition='left' className='flight-label' key={index}>
            <Label as='div' basic>
              <p>{flight.from.toUpperCase()}
                <Icon name='right arrow' className='flight-arrow'/>
                {flight.to.toUpperCase()} ({flight.oneWayRound})
              </p>
            </Label>
            <Button animated='vertical' color='red' onClick={() => deleteFlight(flight)}>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{flight.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button size="mini" onClick={() => setOpenFlights(true)}><Icon name="add" />Add flight</Button>
      </div>
      <div className="emissions">
        <h4><Icon name="car" color="red" /> Cars</h4>
        { props.cars.map((car, index) => (
          <Button as='div' labelPosition='left' className='flight-label' key={index}>
            <Label as='div' basic>
              <p>{car.miles} mi / {car.frequency} </p>
            </Label>
            <Button animated='vertical' color='red' onClick={() => deleteCar(car)}>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{car.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button size="mini" onClick={() => setOpenCars(true)}><Icon name="add" />Add car</Button>
      </div>
      <div className="emissions">
        <h4><Icon name="box" color="brown" /> Shipping</h4>
        { props.shipping.map((shipment, index) => (
          <Button as='div' labelPosition='left' className='flight-label' key={index}>
            <Label as='div' basic>
              <p>{shipment.weight} lbs | {shipment.distance} mi | {shipment.method}</p>
            </Label>
            <Button animated='vertical' color='red' onClick={() => deleteShipping(shipment)}>
              <Button.Content hidden><Icon name='delete' /></Button.Content>
              <Button.Content visible>{shipment.carbon} kg</Button.Content>
            </Button>
          </Button>
        ))
        }
        <Button size="mini" onClick={() => setOpenShipping(true)}><Icon name="add" />Add package</Button>
      </div>
      <div className="emissions">
        <h4><Icon name="leaf" color="green" /> Offsets</h4>
        <Checkbox className="offset" label='Go Vegan' onChange={props.updateOffsets}/>
        <Checkbox className="offset" label='Live Car Free' onChange={props.updateOffsets} />
        <Checkbox className="offset" label='Use LED bulbs' onChange={props.updateOffsets} />
        <div className="offset-tree">
          <div className="offset-tree-header">
            <p className="offset-tree-label">Plant a tree</p>
            <h2 className="offset-tree-value"><Icon name="tree" color="green" />{(treesLabel).toLocaleString()}</h2>
          </div>
          <Slider
            onChange={updateTreesLabel}
            step={1}
            min={0}
            max={1000}
            className="tree-slider"
          />
        </div>
      </div>
      <div className="emissions">
        <div className="emissions-header">
          <h4 className="emissions-title">
            <Icon name="user" color="black" />
            People
          </h4>
          <h2 className="emissions-value">{(props.people).toLocaleString()}</h2>
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
