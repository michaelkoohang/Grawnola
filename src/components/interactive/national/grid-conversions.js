import {min} from 'lodash';
import NATIONAL_STATS from '../../../data/interactive/national_statistics';

export const MAX_GRID_SIZE = getTotalSquares(NATIONAL_STATS.budget);

// NOTE assumes emissions given in metric tons
function getTotalSquares(emissions) {
  // each square is worth 2 million metric tons
  return emissions / 2000000;
}

export function getGridSize(emissions) {
  return min([MAX_GRID_SIZE, getTotalSquares(emissions)]);
}

export function getInitEmissions() {
  return NATIONAL_STATS.total_emissions_2018;
}

export function getGridColor(emissions) {
  if (emissions > NATIONAL_STATS.budget) return '#FF453A'; // red
  if (emissions <= (NATIONAL_STATS.budget * 0.75)) return '#32D74B'; // green
  return '#FFD60A'; // yellow
}

export function getGridLabel(emissions) {
  // TODO represent the number in terms of metric tons or millions of metric tons?
  if (emissions > NATIONAL_STATS.budget) {
    return `${NATIONAL_STATS.budget - emissions} tons of CO\u2082 over`;
  }
  return `${NATIONAL_STATS.budget - emissions} tons of CO\u2082 left`;
}
