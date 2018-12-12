const expect = require('chai').expect;

const averageFitness = require('../../src/ga/fitness').averageFitness;
const consts = require('../../src/ga/consts');
const fitness = require('../../src/ga/fitness').fitness;
const generatePopulation = require('../../src/ga/population').generatePopulation;
const populateFitness = require('../../src/ga/fitness').populateFitness;
const populateNormalisedFitness = require('../../src/ga/fitness').populateNormalisedFitness;
const sumFitness = require('../../src/ga/fitness').sumFitness;

const { DEFAULT_PROBLEM_DOMAIN } = consts;

describe('fitness', () => {
  describe('averageFitness', () => {
    it('should return the average fitness of the received population', () => {
      const population = [
        { bits: [1, 1, 1, 1, 1] },
        { bits: [0, 1, 0, 1, 0] },
        { bits: [1, 1, 0, 1, 1] },
        { bits: [0, 0, 0, 1, 0] },
      ];
      expect(averageFitness(population)).to.equal(3);
    });
  });
  describe('fitness', () => {
    it('should return a fitness value of 0 when an empty bit array is received', () => {
      expect(fitness([])).to.equal(0);
    });
    it('should return a fitness value of 1 when an bit array containing a single 1 is received', () => {
      const bits = [0, 0, 0, 1, 0];
      expect(fitness(bits)).to.equal(1);
    });
    it(`should return a fitness value of 1 when an bit array containing a single 1 and the 'problemDomain' is 'DEFAULT_PROBLEM_DOMAIN'`, () => {
      const bits = [0, 0, 0, 1, 0];
      const problemDomain = DEFAULT_PROBLEM_DOMAIN;
      expect(fitness(bits, problemDomain)).to.equal(1);
    });
    it('should return a fitness value of 1 when an bit array containing a single 1 is received (within the first position)', () => {
      const bits = [1, 0, 0, 0, 0];
      expect(fitness(bits)).to.equal(1);
    });
    it('should return a fitness value of 1 when an bit array containing a single 1 is received (within the last position)', () => {
      const bits = [0, 0, 0, 0, 1];
      expect(fitness(bits)).to.equal(1);
    });
    it('should return a fitness value of 2 when an bit array containing two 1s is received', () => {
      const bits = [0, 1, 0, 1, 0];
      expect(fitness(bits)).to.equal(2);
    });
    it('should return a fitness value of 10 when an bit array containing ten 1s is received', () => {
      const bits = [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0];
      expect(fitness(bits)).to.equal(10);
    });
    it(`should return false when 'problemDomain' is NOT equal to 'DEFAULT_PROBLEM_DOMAIN'`, () => {
      const bits = [0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0];
      const problemDomain = 'UNKNOWN_PROBLEM_DOMAIN';
      expect(fitness(bits, problemDomain)).to.equal(false);
    });
  });

  describe('populateFitness', () => {
    describe('should populate the fitness within each row', () => {
      const fit = fitness;
      const numBits = 5;
      const populationSize = 10;
      const population = generatePopulation(populationSize, numBits);

      populateFitness(population).forEach(row => {
        const { bits, fitness } = row;
        it(`when row.fitness is ${fitness}`, () => {
          expect(fitness).to.equal(fit(bits));
        });
      });
    });
    it(`should return false when 'population' is not an array`, () => {
      const population = null;
      expect(populateFitness(population)).to.equal(false);
    });
    it(`should return a 'fitness' value of false for 'bits' property that is not an array`, () => {
      const population = [
        { bits: null },
        { bits: [0, 1, 0, 1, 0] },
        { bits: [1, 1, 0, 1, 1] },
        { bits: false },
      ];
      const result = populateFitness(population);
      const { fitness: fitnessA } = result[0];
      const { fitness: fitnessB } = result[3];

      expect(fitnessA).to.equal(false);
      expect(fitnessB).to.equal(false);
    });
  });

  describe('populateNormalisedFitness', () => {
    describe('should populate the normalised fitness value per row', () => {
      let population = [
        { bits: [1, 0, 0, 1, 0] },
        { bits: [0, 1, 0, 1, 0] },
        { bits: [1, 1, 0, 1, 1] },
        { bits: [0, 0, 0, 0, 1] },
      ];

      population = populateFitness(population);
      const sum = sumFitness(population);

      populateNormalisedFitness(population)(sum).forEach(row => {
        it(`when row.fitness is ${row.fitness}`, () => {
          expect(row.normalisedFitness).to.equal(row.fitness / sum);
          expect(row.normalisedFitnessDegrees).to.equal((row.fitness / sum) * 360);
        });
      });
    });
  });

  describe('sumFitness', () => {
    it('should return the expect sum of the fitness properties', () => {
      const numBits = 5;
      const populationSize = 10;
      const population = populateFitness(
        generatePopulation(populationSize, numBits)
      );

      expect(sumFitness(population)).to.be.within(1, numBits * populationSize);
    });
    it('should return the expect sum of the fitness properties (from the mock population)', () => {
      const population = [
        { fitness: 1 },
        { fitness: 2 },
        { fitness: 3 },
        { fitness: 4 },
      ];
      expect(sumFitness(population)).to.equal(10);
    });
  });
});
