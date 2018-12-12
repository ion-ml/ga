const expect = require('chai').expect;

const ga = require('../../src/ga');
const generatePopulation = require('../../src/ga/population').generatePopulation;


describe('ga', () => {
  describe('average', () => {
    const { average } = ga;

    it('should return the average', () => {
      const values = [1, 2, 3, 4];
      expect(average(values)).to.equal(2.5);
    });
  });

  describe('ga', () => {
    const { ga: gaMain } = ga;

    const populationSize = 100;
    const numBits = 20;
    const numIterations = 1000;
    const crossOverProbabilityThreshold = 0.7;
    const mutationProbabilityThreshold = 0.2;

    const { fitnessStart, population, fitnessEnd, schemaValues } = gaMain(
      populationSize,
      numBits,
      numIterations,
      crossOverProbabilityThreshold,
      mutationProbabilityThreshold
    );

    it('should return a processed population of the expected size', () => {
      expect(fitnessStart).to.be.a('number');
      expect(population).to.have.lengthOf(populationSize);
      expect(fitnessEnd).to.be.a('number');
      expect(schemaValues).to.be.a('array');
    });
  });

  describe('generateNextPopulation', () => {
    it('should return the next population, having performed selection, cross-over and mutation', () => {
      const { generateNextPopulation } = ga;

      const crossOverProbabilityThreshold = 0.3;
      const mutationProbabilityThreshold = 0.1;
      const populationSize = 100;
      const numBits = 10;

      const population = generatePopulation(populationSize, numBits);
      const nextPopulation = generateNextPopulation(
        population,
        population.length,
        crossOverProbabilityThreshold,
        mutationProbabilityThreshold
      );

      expect(nextPopulation).to.have.lengthOf(population.length);
      expect(nextPopulation).to.have.lengthOf(populationSize);

      nextPopulation.forEach(row => {
        const { bits } = row;
        expect(bits).to.have.lengthOf(numBits);
      });
    });
  });

  describe('performCrossOverWithMutation', () => {
    it('should return the crossed-over child of the parents, with mutation', () => {
      const { performCrossOverWithMutation } = ga;

      const parentSelectionA = { bits: [0, 1, 1, 1, 1] };
      const parentSelectionB = { bits: [1, 0, 0, 0, 0] };
      const crossOverProbabilityThreshold = 0.9;
      const mutationProbabilityThreshold = 0.9;

      const result = performCrossOverWithMutation(
        parentSelectionA,
        parentSelectionB,
        crossOverProbabilityThreshold,
        mutationProbabilityThreshold
      );

      expect(result[0]).to.be.instanceOf(Object);
      expect(result[0].bits).to.have.lengthOf(5);

      expect(result[1]).to.be.instanceOf(Object);
      expect(result[1].bits).to.have.lengthOf(5);
    });
  });
});
