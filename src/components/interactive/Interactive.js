import React, {useState, useEffect} from 'react';
import {Container, Grid} from "semantic-ui-react";
import './Interactive.css';
import Single from "./single/Single";
import National from "./national/National";
import ControlPanel from "./control-panel/ControlPanel";

const DEBUG = 0;

function Interactive() {

  const carbonInterfaceToken = "edqnsNcjCvigIYO2mtva7Q";
  const carbonInterfaceURL = "https://www.carboninterface.com/api/v1/estimates";

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
  // People
  const [people, setPeople] = useState(1);

  function updateElectricity(value) {
    let kwh = parseInt(value * 100 / 11.19 * 12);
    let new_electricity = {
      "type": "electricity",
      "electricity_unit": "kwh",
      "electricity_value": kwh,
      "country": "us",
    }
    // setElectricity(100);
    // getCarbon(new_electricity)
    //   .then((carbon) => {
        setElectricity(1000);
      // });
  }

  function updateFlights(flight) {
    if (DEBUG) console.log(flight);
    let new_flight;
    if (flight.oneWayRound === "One Way") {
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
    if (DEBUG) console.log(new_flight);
    // getCarbon(new_flight)
    //   .then((carbon) => {
        setFlights(flights.concat([{
          "from": flight.from, "to": flight.to,
          "oneWayRound": flight.oneWayRound,
          "carbon": 1000
        }]))
    //   });
  }

  function deleteFlight(flight) {
    setFlights(flights.filter(item => item.to !== flight.to && item.from !== flight.from && item.oneWayRound !== flight.oneWayRound))
  }

  function updateCars(car) {
    let miles;
    if (car.frequency === "week") {
      miles = car.miles * 52;
    }
    let new_car = {
      "type": "vehicle",
      "distance_unit": "mi",
      "distance_value": miles,
      "vehicle_make": "Toyota",
      "vehicle_model": "Corolla",
      "vehicle_year": 2017
    }
    // getCarbon(new_car)
    //   .then((carbon) => {
        setCars(cars.concat([{
          "miles": car.miles,
          "frequency": car.frequency,
          "carbon": 1000
        }]));
      // });
  }

  function deleteCar(car) {
    setCars(cars.filter(item => item.miles !== car.miles && item.frequency !== car.frequency))
  }

  function updateShipping(item) {
    let new_item = {
      "type": "shipping",
      "weight_value": item.weight,
      "weight_unit": "lb",
      "distance_value": item.distance,
      "distance_unit": "mi",
      "transport_method": item.method
    };
    if (DEBUG) console.log(new_item);
    // getCarbon(new_item)
    //   .then((carbon) => {
        setShipping(shipping.concat([{
          "weight": item.weight,
          "distance": item.distance,
          "method": item.method,
          "carbon": 1000
        }]));
      // });
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
            setVegan(-500);
          } else {
            setVegan(0);
          }
          break;
        case "Live Car Free":
          if (data.checked) {
            setCarFree(-500);
          } else {
            setCarFree(0);
          }
          break;
        case "Use LED bulbs":
          if (data.checked) {
            setLedBulbs(-500);
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

  function getCarbon(json) {
    return fetch(carbonInterfaceURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${carbonInterfaceToken}`
      },
      body: JSON.stringify(json),
    })
      .then(response => response.json())
      .then(data => {
        return data.data.attributes.carbon_kg
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  useEffect(() => {
    if (DEBUG) {
      console.log("Electricity: " + electricity);
      console.log("Flights: ");
      console.log(flights);
      console.log("Cars: ");
      console.log(cars);
      console.log("Shipping: ");
      console.log(shipping);
      console.log("Vegan: " + vegan);
      console.log("Car Free: " + carFree);
      console.log("LED: " + ledBulbs);
      console.log("Trees: " + trees);
      console.log("People: " + people);
      console.log("------------------------------")
    }
  }, [electricity, flights, shipping, cars, vegan, carFree, ledBulbs, trees, people]);

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
              deleteCar={deleteCar}
              shipping={shipping}
              updateShipping={updateShipping}
              deleteShipping={deleteShipping}
              updateOffsets={updateOffsets}
              people={people}
              updatePeople={updatePeople}
            />
          </Grid.Column>
          <Grid.Column width={11}>
            <Single
              electricity={electricity}
              flights={flights}
              cars={cars}
              shipping={shipping}
              vegan={vegan}
              carFree={carFree}
              ledBulbs={ledBulbs}
              trees={trees}
            />
            <National />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  );
}

export default Interactive;
