const expect = require('chai').expect;

const schema = require('../src/schema');

describe('schema', () => {
  describe('calculateSchemaValues', () => {
    const { calculateSchemaValues } = schema;

    it('should return an object containing expected number of schema (next generation) and the current number', () => {
      const population = [
        { bits: [ 0, 1, 1, 0] }, // 2
        { bits: [ 0, 0, 1, 1] }, // 2
        { bits: [ 0, 0, 0, 0] }, // 0
        { bits: [ 1, 1, 0, 0] }, // 2
        { bits: [ 0, 0, 0, 0] }, // 0
        { bits: [ 0, 0, 1, 1] }, // 2
      ];
      const schema = [1, 1];

      const probabilityCrossOver = 0.7;
      const probabilityMutation = 0.001;
      const definingOrder = 2;
      const chromosomeLength = 2;
      const schemaOrder = 2;

      const expectedCrossOver = (1 - (probabilityCrossOver * (schemaOrder / (chromosomeLength - 1))));
      const expectedMutation = (1 - (probabilityMutation * (definingOrder / (chromosomeLength - 1))));
      const expectedSelection = (2 / (8 / 6) * 4);

      const result = calculateSchemaValues(
        schema,
        population,
        chromosomeLength,
        definingOrder,
        schemaOrder,
        probabilityCrossOver,
        probabilityMutation
      );

      const { numExpectedSchema, numSchema } = result;

      expect(numExpectedSchema).to.equal(expectedSelection * expectedCrossOver * expectedMutation);
      expect(numSchema).to.equal(4);
    });
  });

  describe('numExpectedSchemaPerSelection ', () => {
    const { numExpectedSchemaPerSelection  } = schema;

    it('should return the number of schema that will be found in the next population', () => {
      const population = [
        { bits: [ 0, 1, 1, 0] }, // 2
        { bits: [ 0, 0, 1, 1] }, // 2
        { bits: [ 0, 0, 0, 0] }, // 0
        { bits: [ 1, 1, 0, 0] }, // 2
        { bits: [ 0, 0, 0, 0] }, // 0
        { bits: [ 0, 0, 1, 1] }, // 2
      ];
      const schema = [1, 1];
      expect(numExpectedSchemaPerSelection(schema, population)).to.equal(2 / (8 / 6) * 4);
    });
  });

  describe('numSchema', () => {
    const { numSchema } = schema;

    it(`should return the number of instances of the 'schema' within the current 'population'`, () => {
      const population = [
        { bits: [ 0, 1, 1, 0] },
        { bits: [ 0, 0, 1, 1] },
        { bits: [ 1, 0, 1, 0] },
        { bits: [ 1, 1, 0, 0] },
        { bits: [ 0, 0, 0, 0] },
        { bits: [ 0, 0, 1, 1] },
      ];
      const schema = [1, 1];
      expect(numSchema(schema, population)).to.equal(4);
    });
    it(`should return zero where there are no instances of the 'schema' within the current 'population'`, () => {
      const population = [
        { bits: [ 0, 1, 0, 0] },
        { bits: [ 1, 0, 0, 1] },
        { bits: [ 1, 0, 1, 0] },
        { bits: [ 0, 1, 0, 0] },
        { bits: [ 0, 0, 1, 0] },
      ];
      const schema = [1, 1];
      expect(numSchema(schema, population)).to.equal(0);
    });
    it(`should return false when 'schema' is not an array`, () => {
      const population = [
        { bits: [ 0, 1, 0, 0] },
        { bits: [ 1, 0, 0, 1] },
        { bits: [ 1, 0, 1, 0] },
        { bits: [ 0, 1, 0, 0] },
        { bits: [ 0, 0, 1, 0] },
      ];
      const schema = null;
      expect(numSchema(schema, population)).to.equal(false);
    });
    it(`should return false when 'population' is not an array`, () => {
      const population = null;
      const schema = [1, 1];
      expect(numSchema(schema, population)).to.equal(false);
    });
  });

  describe('probabilitySchemaSurvivialPerCrossOver', () => {
    const { probabilitySchemaSurvivialPerCrossOver } = schema;

    it('should return the probability with which a given schema will survive a cross-over process', () => {
      const chromosomeLength = 8;
      const schemaOrder = 2;
      const probabilityCrossOver = 0.7;
      const expectedResult = (1 - (probabilityCrossOver * (schemaOrder / (chromosomeLength - 1))));
      expect(probabilitySchemaSurvivialPerCrossOver(chromosomeLength, schemaOrder, probabilityCrossOver)).to.equal(expectedResult);
    });
  });

  describe('probabilitySchemaSurvivialPerMutation', () => {
    const { probabilitySchemaSurvivialPerMutation } = schema;

    it('should return the probability with which a given schema will survive a mutation process', () => {
      const chromosomeLength = 8;
      const definingOrder = 2;
      const probabilityMutation = 0.001;
      const expectedResult = (1 - (probabilityMutation * (definingOrder / (chromosomeLength - 1))));
      expect(probabilitySchemaSurvivialPerMutation(chromosomeLength, definingOrder, probabilityMutation)).to.equal(expectedResult);
    });
  });
});
