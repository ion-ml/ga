const expect = require('chai').expect;

const selection = require('../src/selection');

const BASE_TEN = 10;

describe('selection', () => {
  describe('generateRandomRouletteWheelPosition', () => {
    const { generateRandomRouletteWheelPosition } = selection;
    it('should return a random number between 0 and 359', () => {
      let randomRouletteWheelPosition;

      for (var i = 0; i < 100; i++) {
        randomRouletteWheelPosition = generateRandomRouletteWheelPosition();
        expect(randomRouletteWheelPosition).to.be.within(0, 359);
      }
    });
  });

  describe('generateRouletteWheel', () => {
    const { generateRouletteWheel } = selection;
    it('should return a generated roulette wheel with appropriate fitness positioning', () => {
      const population = [
        { bits: [1, 0, 0, 1, 0] }, // Fitness 2; Normalised Fitness 1/5; Num degrees 72
        { bits: [0, 1, 1, 1, 0] }, // Fitness 3; Normalised Fitness 3/10; Num degrees 108
        { bits: [1, 1, 0, 1, 1] }, // Fitness 4; Normalised Fitness 4/10; Num degrees 144
        { bits: [0, 0, 1, 0, 0] }, // Fitness 1; Normalised fitness 1/10; Num degrees 36
      ];

      const expectedNumDegrees = [72, 108, 144, 36];
      const rouletteWheel = generateRouletteWheel(population);

      expectedNumDegrees.forEach((expectedNumDegreesPerRow, index) => {
        const foundNumDegreesPerRow = rouletteWheel.filter(degree => parseInt(degree, BASE_TEN) === parseInt(index, BASE_TEN)).length
        expect(foundNumDegreesPerRow).to.equal(expectedNumDegreesPerRow);
      });
    });
    it(`should return false when the calling 'populateFitness' returns false`, () => {
      const fitness = {
        populateFitness: (population) => false,
        populateNormalisedFitness: () => false,
        sumFitness: () => false,
      };

      const population = [
        { bits: [1, 0, 0, 1, 0] },
        { bits: [0, 1, 1, 1, 0] },
        { bits: [1, 1, 0, 1, 1] },
        { bits: [0, 0, 1, 0, 0] },
      ];

      expect(generateRouletteWheel(population, fitness)).to.equal(false);
    });
  });

  describe('selectByFitness', () => {

    const { selectByFitness } = selection;
    const population = [
      { bits: [1, 0, 0, 1, 0] },
      { bits: [0, 1, 1, 1, 0] },
      { bits: [1, 1, 0, 1, 1] },
      { bits: [0, 0, 1, 0, 0] },
    ];
    const numSelect = 2;

    it('should return 2 selections', () => {
      expect(selectByFitness(population, numSelect)).to.have.lengthOf(2);
    });
    it(`should return false when the call to 'generateRouletteWheel' returns false`, () => {
      const genRouletteWheel = (population) => false;
      expect(selectByFitness(population, numSelect, genRouletteWheel)).to.equal(false);
    });
  });

  describe('selectRandomRouletteWheelValue', () => {
    const {
      generateRandomRouletteWheelPosition,
      generateRouletteWheel,
      selectRandomRouletteWheelValue
    } = selection;

    it('should return the value within the roulette wheel represented by the position', () => {
      const population = [
        { bits: [1, 0, 0, 1, 0] }, // Fitness 2; Normalised Fitness 1/5; Num degrees 72
        { bits: [0, 1, 1, 1, 0] }, // Fitness 3; Normalised Fitness 3/10; Num degrees 108
        { bits: [1, 1, 0, 1, 1] }, // Fitness 4; Normalised Fitness 4/10; Num degrees 144
        { bits: [0, 0, 1, 0, 0] }, // Fitness 1; Normalised fitness 1/10; Num degrees 36
      ];
      const rouletteWheel = generateRouletteWheel(population);
      const randomPosition = generateRandomRouletteWheelPosition();
      expect(selectRandomRouletteWheelValue(rouletteWheel, randomPosition)).to.equal(rouletteWheel[randomPosition]);
    });
  });
});
