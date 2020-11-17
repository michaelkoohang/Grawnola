import {keys, map, pick, sum, values} from 'lodash';
import {createSelector} from 'reselect';

import {offsets} from './emission_conversions';

const getCars = ({cars}) => sum(map(cars, car => car.carbon));
const getElectricity = ({electricity}) => electricity;
const getFlights = ({flights}) => sum(map(flights, flight => flight.carbon));
const getShipping = ({shipping}) => sum(map(shipping, s => s.carbon));

const getEmissions = createSelector(
  [getCars, getElectricity, getFlights, getShipping],
  (cars, electricity, flights, shipping) => (
    sum([cars, electricity, flights, shipping])
  )
);
const getOffsets = (props) => sum(values(pick(props, keys(offsets))));

export const getTotalCarbon = createSelector(
  [getEmissions, getOffsets],
  (emissions, offsets) => ((emissions + offsets) / 1000)
);
