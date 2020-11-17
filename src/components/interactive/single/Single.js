import React, {useEffect, useState} from 'react';
import './Single.css';
import {Grid, Segment} from "semantic-ui-react";
import Categories from "./Categories";
import Budget from "./Budget";
import flow_data from '../../../data/narrative/net_emissions_flow.json';

function Single(props) {

  const [budgetData, setBudgetData] = useState(0);
  const [emissionsData, setEmissionsData] = useState(0);

  useEffect(() => {
    let electricity_carbon = props.electricity;
    let flights_carbon = props.flights.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let cars_carbon = props.cars.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let shipping_carbon = props.shipping.reduce((a, b) => a + (b["carbon"] || 0), 0);
    let new_emissions_data = [
      {"name": "electricity", "value": electricity_carbon},
      {"name": "flights", "value": flights_carbon},
      {"name": "cars", "value": cars_carbon},
      {"name": "shipping", "value": shipping_carbon},
    ];
    let new_budget_data = electricity_carbon
      + flights_carbon
      + cars_carbon
      + shipping_carbon
      + props.vegan
      + props.carFree
      + props.ledBulbs
      + props.trees
    setEmissionsData(new_emissions_data);
    setBudgetData(new_budget_data)
  }, [props]);

  return (
    <Segment className="single">
      <Grid columns={2} widths='equal'>
        <Grid.Row>
          <Grid.Column>
            <Categories data={emissionsData}/>
          </Grid.Column>
          <Grid.Column>
            <Budget data={budgetData}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Single;
