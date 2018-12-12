const calculateSchemaValues = require('./schema').calculateSchemaValues;
const crossOver = require('./crossOver');
const mutation = require('./mutation');
const generatePopulation = require('./population').generatePopulation;
const populateFitness = require('./fitness').populateFitness;
const sumFitness = require('./fitness').sumFitness;
const selectByFitness = require('./selection').selectByFitness;

const DEFAULT_SCHEMA = [1, 1];
const DEFAULT_SCHEMA_DEFINING_ORDER = 2;
const DEFAULT_SCHEMA_SCHEMA_ORDER = 3;

const average = (values) =>
  values.reduce((sum, value) => sum += value, 0) / values.length;

const ga = (
  populationSize,
  numBits,
  numIterations,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate,
  schema = DEFAULT_SCHEMA,
  definingOrder = DEFAULT_SCHEMA_DEFINING_ORDER,
  schemaOrder = DEFAULT_SCHEMA_SCHEMA_ORDER
) => {
  const populationStart = generatePopulation(populationSize, numBits);
  const numSelect = populationStart.length;
  const schemaValues = [];

  let population = populationStart;
  const fitnessStart = sumFitness(populateFitness(population));

  schemaValues.push(calculateSchemaValues(
    schema,
    population,
    numBits,
    definingOrder,
    schemaOrder,
    crossOverProbabilityThreshold,
    mutationProbabilityThreshold
  ));

  for (var i = 0; i < numIterations; i++) {
    population = generateNextPopulation(
      population,
      numSelect,
      crossOverProbabilityThreshold,
      mutationProbabilityThreshold,
      mutationRate
    );
    schemaValues.push(calculateSchemaValues(
      schema,
      population,
      numBits,
      definingOrder,
      schemaOrder,
      crossOverProbabilityThreshold,
      mutationProbabilityThreshold      
    ));
    if (!population) break;
  }

  const fitnessEnd = sumFitness(populateFitness(population));
  return { fitnessStart, fitnessEnd, population, schemaValues };
};

const generateNextPopulation = (
  population,
  numSelect,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate
) => {
  const selectionsByFitness = selectByFitness(population, numSelect);

  if (!selectionsByFitness) return false;

  const nextPopulation = [];

  for (var i = 0; i < selectionsByFitness.length; i = i + 2) {
    const selectionA = selectionsByFitness[i];
    const selectionB = selectionsByFitness[i+1];

    const children = performCrossOverWithMutation(
      selectionA,
      selectionB,
      crossOverProbabilityThreshold,
      mutationProbabilityThreshold,
      mutationRate
    );

    nextPopulation.push(children[0]);
    nextPopulation.push(children[1]);
  }

  return nextPopulation;
};

const performCrossOverWithMutation = (
  selectionA,
  selectionB,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate
) => {
  const { singlePointCrossOverWithProbabilityCheck: singlePointCrossOver } = crossOver;
  const { mutateSelectionWithMutationRate: mutate } = mutation;

  const selectedChildren = singlePointCrossOver(
    selectionA,
    selectionB,
    crossOverProbabilityThreshold
  );

  return [
    mutate(
      selectedChildren[0],
      mutationProbabilityThreshold,
      mutationRate
    ),
    mutate(
      selectedChildren[1],
      mutationProbabilityThreshold,
      mutationRate
    ),
  ];
};

const trial = (
  trialSize,
  populationSize,
  numBits,
  numIterations,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate,
  schema = DEFAULT_SCHEMA
) => {
  const fitnessEnds = [];
  const fitnessStarts = [];
  let result;

  for (var i = 0; i < trialSize; i++) {
    result = ga(
      populationSize,
      numBits,
      numIterations,
      crossOverProbabilityThreshold,
      mutationProbabilityThreshold,
      mutationRate,
      schema
    );
    fitnessStarts.push(result.fitnessStart);
    fitnessEnds.push(result.fitnessEnd);
  }

  return {
    fitnessStart: average(fitnessStarts),
    fitnessEnd: average(fitnessEnds),
  };
};

module.exports = {
  average: average,
  ga: ga,
  generateNextPopulation: generateNextPopulation,
  performCrossOverWithMutation: performCrossOverWithMutation,
  trial: trial,
};
