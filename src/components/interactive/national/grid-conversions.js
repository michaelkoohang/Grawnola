import {min, round} from 'lodash';
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

export function getEmissions(carbon, people) {
  const avgEmissions = (NATIONAL_STATS.total_pop - people) *
    NATIONAL_STATS.avg_per_capita_emissions;
  const calculatedEmissions = people * carbon;
  return avgEmissions + calculatedEmissions;
}

export function getGridColor(emissions) {
  if (emissions > NATIONAL_STATS.budget) return '#FF453A'; // red
  if (emissions <= (NATIONAL_STATS.budget * 0.75)) return '#32D74B'; // green
  return '#FFD60A'; // yellow
}

export function getGridLabel(emissions) {
  // const formatted = ((NATIONAL_STATS.budget - emissions) / 1000000).toPrecision(4);
  const formatted = round(NATIONAL_STATS.budget - emissions).toLocaleString();
  if (emissions > NATIONAL_STATS.budget) {
    return `${formatted} metric tons of CO\u2082 over`;
  }
  return `${formatted} metric tons of CO\u2082 left`;
}
