import React, {useEffect, useState} from 'react';
import './Single.css';
import {Grid, Segment} from "semantic-ui-react";
import Categories from "./Categories";

import greenhouse_gases from '../../../data/narrative/greenhouse_gases.json';

function Single(props) {

  const [data, setData] = useState(0);

  useEffect(() => {
    let electricity_carbon = props.electricity;
    let flights_carbon = props.flights.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let cars_carbon = props.cars.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let shipping_carbon = props.shipping.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let new_data = [
      {"name": "electricity", "value": electricity_carbon},
      {"name": "flights", "value": flights_carbon},
      {"name": "cars", "value": cars_carbon},
      {"name": "shipping", "value": shipping_carbon},
    ];
    setData(new_data);
  }, [props]);

  return (
    <Segment className="single">
      <Grid columns={2} widths='equal'>
        <Grid.Row>
          <Grid.Column>
            <Categories data={data}/>
          </Grid.Column>
          <Grid.Column>

          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Single;
