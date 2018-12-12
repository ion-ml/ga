const { log } = console;

const printSchemeValues = (schema, schemaValues) => {
  log('\n\n*********************');
  log(`\nSCHEMA VALUES: schema, ${schema.toString()}`);

  schemaValues.forEach((schemaValuePair, index) => {
    const { numExpectedSchema, numSchema } = schemaValuePair;
    log(`Index: ${index}, Num Schema: ${numSchema}, Num expected schema ${numExpectedSchema}`);
  });

  log('\n\n*********************');
};

const printSingleSummary = (
  populationSize,
  numBits,
  fitnessStart,
  fitnessEnd
) => {
  log('\n\n*********************');
  log(`\nGA: population size, ${populationSize}, with ${numBits} bits per row`);
  log(`\nAverage starting fitness across:`, fitnessStart);
  log(`Average final fitness:`, fitnessEnd);
  log('\n*********************');
};

const printTrialSummary = (
  trialSize,
  populationSize,
  numBits,
  numIterations,
  fitnessStart,
  fitnessEnd
) => {
  log('\n\n*********************');
  log(`\nTRAIL: population size, ${populationSize}, with ${numBits} bits per row`);
  log(`\nAverage starting fitness across ${trialSize} trials with ${numIterations} iterations each:`, fitnessStart);
  log(`Average final fitness across ${trialSize} trials with ${numIterations} iterations each:`, fitnessEnd);
  log('\n*********************');
};

module.exports = {
  printSchemeValues: printSchemeValues,
  printSingleSummary: printSingleSummary,
  printTrialSummary: printTrialSummary,
};
