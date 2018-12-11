const expect = require('chai').expect;
const population = require('../src/population');

describe('population', () => {
  describe('generateRandomBit', () => {
    it('should return either a 1 or a 0', () => {
      const { generateRandomBit } = population;

      const numRepeats = 10000;
      let countOnes = 0;
      let countZeros = 0;
      let result;

      for (var i = 0; i < numRepeats; i++) {
        result = generateRandomBit();
        expect(result).to.be.oneOf([0, 1]);

        if (result === 0) countZeros++;
        if (result === 1) countOnes++;
      }

      expect(countZeros).to.be.within(4500, 5500);
      expect(countOnes).to.be.within(4400, 5500);
    });
  });
  describe('generateRandomBits', () => {
    it('should return an array of random bits', () => {
      const { generateRandomBits } = population;

      const maxNumBits = 100;

      for (var i = 1; i <= maxNumBits; i++) {
        expect(generateRandomBits(i)).to.have.lengthOf(i);
      }
    });
  });
  describe('generatePopulation', () => {
    const { generatePopulation } = population;

    const numBits = 100;
    const populationSize = 200;

    it(`should return a population of ${populationSize} where each entry contains ${numBits} numBits`, () => {
      const population = generatePopulation(populationSize, numBits);
      expect(population).to.have.lengthOf(populationSize);

      population.forEach(row => {
        expect(row.bits).to.have.lengthOf(numBits);
      });
    });
  });
});
