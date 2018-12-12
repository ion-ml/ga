const consts = require('./consts');

const {
  BIT_OFF,
  BIT_ON,
  DEFAULT_PROBLEM_DOMAIN,
} = consts;

const generatePopulation = (
  populationSize,
  numBits,
  problemDomain = DEFAULT_PROBLEM_DOMAIN
) => {
  const population = [];

  for (var i = 0; i < populationSize; i++) {
    population.push({
      bits: generateRandomBits(numBits),
      fitness: null,
    });
  }

  return population;
};

const generateRandomBit = () => Math.random() < 0.5 ? BIT_OFF : BIT_ON;

const generateRandomBits = (numBits) => {
  const bitString = [];

  for (var i = 0; i < numBits; i++) {
    bitString.push(generateRandomBit());
  }

  return bitString;
};

module.exports = {
  generatePopulation: generatePopulation,
  generateRandomBit: generateRandomBit,
  generateRandomBits: generateRandomBits,
};
