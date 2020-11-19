import React from 'react';
import {Icon} from 'semantic-ui-react';

/* EMISSIONS */
export const emissionsTitle = (
  <h2>
    <Icon color='red' name='fire' />
    Emissions
  </h2>
);

export const electricityTitle = (
  <h3 className='emissions-title'>
    <Icon name='lightning' color='yellow' />
    Electricity
  </h3>
);

export const flightsTitle = (
  <h3>
    <Icon name='plane' color='teal' />
    Flights
  </h3>
);

export const carsTitle = (
  <h3>
    <Icon name='car' color='purple' />
    Cars
  </h3>
);

export const shippingTitle = (
  <h3>
    <Icon name="box" color="brown" />
    Shipping
  </h3>
);

/* OFFSETS */

export const offsetsTitle = 
<h2>
  <Icon color='green' name='leaf' />
  Offsets
</h2>;

/* MULTIPLIERS */

export const multipliersTitle = 
<h2>
  <Icon color='blue' name='sliders horizontal'/>
  Multipliers
</h2>;