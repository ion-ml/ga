const consts = require('./consts');
const fitness = require('./fitness');

const {
  DEFAULT_PROBLEM_DOMAIN,
  DEGREES_MAX,
  DEGREES_MIN,
} = consts;

const generateRandomRouletteWheelPosition = () =>
  Math.floor(Math.random() * DEGREES_MAX) + DEGREES_MIN;

const generateRouletteWheel = (
  population,
  fit = fitness
) => {
  const { populateFitness, populateNormalisedFitness, sumFitness } = fit;
  const rouletteWheel = [];
  const populationLocal = populateFitness(population);

  if (!populationLocal) return false;

  const sum = sumFitness(populationLocal);

  populateNormalisedFitness(population)(sum).forEach((row, index) => {
    for (var i = 0; i < row.normalisedFitnessDegrees; i++) {
      rouletteWheel.push(index);
    }
  });

  return rouletteWheel;
};

const selectByFitness = (
  population,
  numSelect,
  problemDomain = DEFAULT_PROBLEM_DOMAIN,
  genRouletteWheel = generateRouletteWheel
) => {
  const selectedPopulationRows = [];
  const rouletteWheel = genRouletteWheel(population);

  if (!rouletteWheel) return false;

  let selectedRowIndex;
  let selectedPopulationRow;

  for (var i = 0; i < numSelect; i++) {
    selectedRowIndex = selectRandomRouletteWheelValue(rouletteWheel);
    selectedPopulationRow = population[selectedRowIndex];
    selectedPopulationRows.push(selectedPopulationRow);
  }

  return selectedPopulationRows;
};

const selectRandomRouletteWheelValue = (
  rouletteWheel,
  position = null
) => {
  const positionLocal = position || generateRandomRouletteWheelPosition();
  return rouletteWheel[positionLocal];
};

module.exports = {
  generateRandomRouletteWheelPosition: generateRandomRouletteWheelPosition,
  generateRouletteWheel: generateRouletteWheel,
  selectByFitness: selectByFitness,
  selectRandomRouletteWheelValue: selectRandomRouletteWheelValue,
};
