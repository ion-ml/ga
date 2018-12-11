const BIT_OFF = 0;
const BIT_ON = 1;

const generatePopulation = (populationSize, numBits) => {
  const population = [];

  for (var i = 0; i < populationSize; i++) {
    population.push({
      bits: generateRandomBits(numBits),
      fitness: null,
    });
  }

  return population;
};

const generateRandomBit = () => {
  return Math.random() < 0.5 ? BIT_OFF : BIT_ON;
};

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
