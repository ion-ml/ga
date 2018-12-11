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
      const result = calculateSchemaValues(schema, population);
      const { numExpectedSchema, numSchema } = result;
      expect(numExpectedSchema).to.equal(2 / (8 / 6) * 4);
      expect(numSchema).to.equal(4);
    });
  });
  describe('numExpectedSchema', () => {
    const { numExpectedSchema } = schema;

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
      expect(numExpectedSchema(schema, population)).to.equal(2 / (8 / 6) * 4);
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
});
