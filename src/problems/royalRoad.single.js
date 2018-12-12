const consts = require('../ga/consts');
const print = require('../ga/print');
const ga = require('../ga').ga;

const { ROYAL_ROAD_PROBLEM_DOMAIN } = consts;
const { printSchemeValues, printSingleSummary } = print;

const populationSize = 128;
const numBits = 16;
const numIterations = 200;
const crossOverProbabilityThreshold = 0.7;
const mutationProbabilityThreshold = 0.005;
const mutationRate = 1;
const schema = [1, 1, 1];
const definingOrder = 3;
const schemaOrder = 3;

const { fitnessStart, fitnessEnd, schemaValues } = ga(
  populationSize,
  numBits,
  numIterations,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate,
  schema,
  definingOrder,
  schemaOrder,
  ROYAL_ROAD_PROBLEM_DOMAIN
);

printSingleSummary(
  populationSize,
  numBits,
  fitnessStart,
  fitnessEnd
);

printSchemeValues(schema, schemaValues);
