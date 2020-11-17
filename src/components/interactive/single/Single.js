import React, {useEffect, useState} from 'react';
import {Grid, Segment} from "semantic-ui-react";
import './Single.css';
import Categories from "./graphs/Categories";
import Comparison from "./comparison/Comparison";
import Budget from "./graphs/Budget";

function Single(props) {

  const [emissionsTotal, setEmissionsTotal] = useState(0);
  const [offsetsTotal, setOffsetsTotal] = useState(0);
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
    let new_emissions_total = new_emissions_data.reduce((a, b) => a + (b["value"] || 0), 0);
    let new_offset_total = props.vegan + props.carFree + props.ledBulbs + props.trees;
    setEmissionsTotal(new_emissions_total);
    setOffsetsTotal(-1 * new_offset_total);
    setEmissionsData(new_emissions_data);
    setBudgetData(new_emissions_total + new_offset_total);
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
            <Comparison emissions={emissionsTotal} offsets={offsetsTotal}/>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>
  );
}

export default Single;
