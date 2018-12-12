const print = require('./print');
const ga = require('./ga').ga;

const populationSize = 4;
const numBits = 8;
const numIterations = 10;
const crossOverProbabilityThreshold = 0.7;
const mutationProbabilityThreshold = 0.001;
const mutationRate = 1;
const schema = [1, 1, 1];
const definingOrder = 3;
const schemaOrder = 3;

const { printSchemeValues, printSingleSummary } = print;

const { fitnessStart, fitnessEnd, schemaValues } = ga(
  populationSize,
  numBits,
  numIterations,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate,
  schema,
  definingOrder,
  schemaOrder
);

printSingleSummary(
  populationSize,
  numBits,
  fitnessStart,
  fitnessEnd
);

printSchemeValues(schema, schemaValues);
