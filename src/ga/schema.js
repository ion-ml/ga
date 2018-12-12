const averageFitness = require('./fitness').averageFitness
const fitness = require('./fitness').fitness

const calculateSchemaValues = (
  schema,
  population,
  chromosomeLength,
  definingOrder,
  schemaOrder,
  probabilityCrossOver,
  probabilityMutation
) => ({
  numExpectedSchema: numExpectedSchema(
    schema,
    population,
    chromosomeLength,
    definingOrder,
    schemaOrder,
    probabilityCrossOver,
    probabilityMutation
  ),
  numSchema: numSchema(schema, population),
});

const numExpectedSchema = (
  schema,
  population,
  chromosomeLength,
  definingOrder,
  schemaOrder,
  probabilityCrossOver,
  probabilityMutation,
  avg = averageFitness,
  fit = fitness
) => {
  return (numExpectedSchemaPerSelection(
    schema,
    population,
    avg,
    fit
  ) * probabilitySchemaSurvivialPerCrossOver(
    chromosomeLength,
    definingOrder,
    probabilityCrossOver
  )
  * probabilitySchemaSurvivialPerMutation(
    chromosomeLength,
    schemaOrder,
    probabilityMutation
  ));
};

const numExpectedSchemaPerSelection = (
  schema,
  population,
  avg = averageFitness,
  fit = fitness
) => (fit(schema) / avg(population)) * numSchema(schema, population);

const numSchema = (schema, population) => {
  if (!Array.isArray(schema)) return false;
  if (!Array.isArray(population)) return false;

  return population.reduce((num, row) => {
    const { bits } = row;
    const bitString = bits.toString();
    const schemaString = schema.toString();

    if (bitString.includes(schemaString)) num++;

    return num;
  }, 0);
};

const probabilitySchemaSurvivialPerCrossOver = (
  chromosomeLength,
  definingOrder,
  probabilityCrossOver
) => (1 - (probabilityCrossOver * (definingOrder / (chromosomeLength - 1))));

const probabilitySchemaSurvivialPerMutation = (
  chromosomeLength,
  schemaOrder,
  probabilityMutation
) => (1 - (probabilityMutation * (schemaOrder / (chromosomeLength - 1))));

module.exports = {
  calculateSchemaValues: calculateSchemaValues,
  numExpectedSchema: numExpectedSchema,
  numExpectedSchemaPerSelection: numExpectedSchemaPerSelection,
  numSchema: numSchema,
  probabilitySchemaSurvivialPerCrossOver: probabilitySchemaSurvivialPerCrossOver,
  probabilitySchemaSurvivialPerMutation: probabilitySchemaSurvivialPerMutation,
};
