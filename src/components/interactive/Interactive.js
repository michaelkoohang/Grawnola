import React, {useState, useEffect} from 'react';
import {Container, Grid} from "semantic-ui-react";
import './Interactive.css';
import Single from "./single/Single";
import Global from "./global/Global";
import Temp from '../interactive/impact/planet/temp/Temp';
import Sea from '../interactive/impact/planet/sea/Sea';
import Ice from '../interactive/impact/planet/ice/Ice';
import ControlPanel from "./control-panel/ControlPanel";

function Interactive() {

  // Emissions
  const [electricity, setElectricity] = useState(0);
  const [flights, setFlights] = useState([]);
  const [cars, setCars] = useState([]);
  const [shipping, setShipping] = useState([]);
  // Offsets
  const [vegan, setVegan] = useState(0);
  const [carFree, setCarFree] = useState(0);
  const [ledBulbs, setLedBulbs] = useState(0);
  const [trees, setTrees] = useState(0);
  // Time and people
  const [people, setPeople] = useState(1);

  function updateElectricity(value) {
    setElectricity(value);
  }

  function updateFlights(flight) {
    let new_flight;
    if (flight.oneWayRound === 0) {
      new_flight = {
        "type": "flight",
        "passengers": 1,
        "legs": [
          {"departure_airport": flight.from, "destination_airport": flight.to},
        ]
      };
    } else {
      new_flight = {
        "type": "flight",
        "passengers": 1,
        "legs": [
          {"departure_airport": flight.from, "destination_airport": flight.to},
          {"departure_airport": flight.to, "destination_airport": flight.from},
        ]
      };
    }
    setFlights(flights.concat([{"from": flight.from, "to": flight.to, "oneWayRound": flight.oneWayRound, "carbon": 100}]))
  }

  function deleteFlight(flight) {
    setFlights(flights.filter(item => item.to !== flight.to && item.from !== flight.from && item.oneWayRound !== flight.oneWayRound))
  }

  function updateCars(car) {
    console.log(car);
  }

  function updateShipping(item) {
    let new_item = {
      "type": "shipping",
      "weight_value": item.weight,
      "weight_unit": "lb",
      "distance_value": item.distance,
      "distance_unit": "m",
      "transport_method": item.method
    };
    console.log(item);
    setShipping(shipping.concat([{
      "weight": item.weight,
      "distance": item.distance,
      "method": item.method,
      "carbon": 100
    }]))
  }

  function deleteShipping(shipment) {
    setShipping(shipping.filter(item => item.weight !== shipment.weight && item.distance !== shipment.distance && item.method !== shipment.method))
  }

  function updateOffsets(event, data) {
    if (typeof event === "number") {
      // Set trees to event (the number of trees) x whatever constant we use
      setTrees(event);
    } else {
      switch (data.label) {
        case "Go Vegan":
          if (data.checked) {
            setVegan(-100);
          } else {
            setVegan(0);
          }
          break;
        case "Live Car Free":
          if (data.checked) {
            setCarFree(-100);
          } else {
            setCarFree(0);
          }
          break;
        case "Use LED bulbs":
          if (data.checked) {
            setLedBulbs(-100);
          } else {
            setLedBulbs(0);
          }
          break;
        default:
          break;
      }
    }
  }

  // This needs to change all the values aaaaaahhhhh
  function updatePeople(value) {
    if (value !== 1) {
      setPeople(value - 1);
    } else {
      setPeople(1);
    }
  }

  useEffect(() => {
    console.log("Electricity: " + electricity);
    console.log("Flights: " + flights);
    console.log("Cars: " + cars);
    console.log("Shipping: " + shipping);
    console.log("Vegan: " + vegan);
    console.log("Car Free: " + carFree);
    console.log("LED: " + ledBulbs);
    console.log("Trees: " + trees);
    console.log("People: " + people);
    console.log("------------------------------")
  }, [electricity, people, flights, shipping, vegan, carFree, ledBulbs, trees]);

  return (
    <Container className="interactive">
      <Grid className="interactive-grid" columns={3}>
        <Grid.Row className="header" stretched>
          <Grid.Column width={5}>
            <h3>Measure Carbon Emissions</h3>
          </Grid.Column>
          <Grid.Column width={11}>
            <h3>Total Carbon Impact</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="viz-panels" stretched>
          <Grid.Column width={5}>
            <ControlPanel
              electricity={electricity}
              updateElectricity={updateElectricity}
              flights={flights}
              updateFlights={updateFlights}
              deleteFlight={deleteFlight}
              cars={cars}
              updateCars={updateCars}
              shipping={shipping}
              updateShipping={updateShipping}
              deleteShipping={deleteShipping}
              updateOffsets={updateOffsets}
              people={people}
              updatePeople={updatePeople}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <Single />
            <Global />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Interactive;
