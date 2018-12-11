const BASE_TEN = 10;

const averageFitness = population =>
  sumFitness(populateFitness(population)) / population.length;

const fitness = (bits) => bits.filter(bit => bit === 1).length;

const populateFitness = (population) => {
  if (Array.isArray(population) === false) return false;

  return population.map(row => {
    const { bits } = row;

    if (Array.isArray(bits) === false) {
      return Object.assign({}, row, {
        fitness: false
      });
    }

    return Object.assign({}, row, {
      fitness: fitness(bits),
    });
  });
};

const populateNormalisedFitness = population => sum => populateFitness(population).map((row) => {
  const normalisedFitness = parseInt(row.fitness, BASE_TEN) / parseInt(sum, BASE_TEN);

  return Object.assign({}, row, {
    normalisedFitness,
    normalisedFitnessDegrees: normalisedFitness * 360,
  });
});

const sumFitness = (population) => population.reduce((sum, row) => sum += row.fitness, 0);

module.exports = {
  averageFitness: averageFitness,
  fitness: fitness,
  populateFitness: populateFitness,
  populateNormalisedFitness: populateNormalisedFitness,
  sumFitness: sumFitness,
};
