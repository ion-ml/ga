const averageFitness = require('./fitness').averageFitness
const fitness = require('./fitness').fitness

const calculateSchemaValues = (schema, population) => ({
  numExpectedSchema: numExpectedSchema(schema, population),
  numSchema: numSchema(schema, population),
});

const numExpectedSchema = (
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

module.exports = {
  calculateSchemaValues: calculateSchemaValues,
  numExpectedSchema: numExpectedSchema,
  numSchema: numSchema,
};
