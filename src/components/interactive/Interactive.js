import React, {useState, useEffect} from 'react';
import {Grid} from "semantic-ui-react";
import './Interactive.css';
import Single from "./impact/total/single/Single";
import Global from "./impact/total/global/Global";
import Temp from '../interactive/impact/planet/temp/Temp';
import Sea from '../interactive/impact/planet/sea/Sea';
import Ice from '../interactive/impact/planet/ice/Ice';
import ControlPanel from "./input/ControlPanel";

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
  const [years, setYears] = useState(1);

  function updateElectricity(value) {
    setElectricity(value);
  }

  function updateFlights(flight) {
    console.log(flight);
    setFlights(flights.concat([{"from": flight.legs[0].departure_airport, "to": flight.legs[0].destination_airport, "type": flight.type}]))
  }

  function updateCars(car) {
    console.log(car);
  }

  function updateShipping(item) {
    console.log(item);
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

  // This needs to change all the values ahahhhh
  function updateYears(value) {
    setYears(value);
  }

  useEffect(() => {

  }, [people, years, electricity]);

  return (
    <div className="interactive">
      <Grid className="interactive-grid" columns={3}>
        <Grid.Row className="header" stretched>
          <Grid.Column width={4}>
            <h3>Measure Carbon Emissions</h3>
          </Grid.Column>
          <Grid.Column width={8}>
            <h3>Total Carbon Impact</h3>
          </Grid.Column>
          <Grid.Column width={4}>
            <h3>Impact on Planet</h3>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row className="viz-panels" stretched>
          <Grid.Column width={4}>
            <ControlPanel
              electricity={electricity}
              updateElectricity={updateElectricity}
              flights={flights}
              updateFlights={updateFlights}
              cars={cars}
              updateCars={updateCars}
              shipping={shipping}
              updateShipping={updateShipping}
              updateOffsets={updateOffsets}
              years={years}
              updateYears={updateYears}
              people={people}
              updatePeople={updatePeople}
            />
          </Grid.Column>
          <Grid.Column width={8}>
            <Single />
            <Global />
          </Grid.Column>
          <Grid.Column width={4}>
            <Temp />
            <Sea />
            <Ice />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}

export default Interactive;
