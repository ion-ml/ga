const consts = require('../ga/consts');
const print = require('../ga/print');
const trial = require('../ga').trial;

const { DEFAULT_PROBLEM_DOMAIN } = consts;
const { printTrialSummary } = print;

const trialSize = 100;
const populationSize = 4;
const numBits = 8;
const numIterations = 10;
const crossOverProbabilityThreshold = 0.7;
const mutationProbabilityThreshold = 0.001;
const mutationRate = 1;
const schema = [1, 1];

const { fitnessStart, fitnessEnd } = trial(
  trialSize,
  populationSize,
  numBits,
  numIterations,
  crossOverProbabilityThreshold,
  mutationProbabilityThreshold,
  mutationRate,
  schema,
  DEFAULT_PROBLEM_DOMAIN
);

printTrialSummary(
  trialSize,
  populationSize,
  numBits,
  numIterations,
  fitnessStart,
  fitnessEnd
);
