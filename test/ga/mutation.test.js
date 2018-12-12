const expect = require('chai').expect;

const mutation = require('../../src/ga/mutation');

describe('mutation', () => {

  describe('generateRandomMutationPosition', () => {
    const { generateRandomMutationPosition } = mutation;

    it(`should return the received 'mutationPosition' when it is a number`, () => {
      const mutationPosition = 10;
      const selectionLength = 10;
      expect(generateRandomMutationPosition(mutationPosition)(selectionLength)).to.equal(mutationPosition);
    });
    it(`should generate a random value between '0' and 'selectionLength' when 'mutationProbability' is null`, () => {
      const mutationPosition = null;
      const selectionLength = 10;
      expect(generateRandomMutationPosition(mutationPosition)(selectionLength)).to.be.within(0, selectionLength);
    });
    it(`should generate a random value between '0' and 'selectionLength' when 'mutationPosition' is a non-numeric character`, () => {
      const mutationPosition = 'a';
      const selectionLength = 10;
      expect(generateRandomMutationPosition(mutationPosition)(selectionLength)).to.be.within(0, selectionLength);
    });
  });

  describe('generateRandomMutationProbability', () => {
    const { generateRandomMutationProbability } = mutation;

    it(`should return the received 'mutationProbability' when it is a number`, () => {
      const mutationProbability = 10;
      expect(generateRandomMutationProbability(mutationProbability)).to.equal(mutationProbability);
    });
    it(`should generate a random value when 'mutationProbability' is null`, () => {
      const mutationProbability = null;
      expect(generateRandomMutationProbability(mutationProbability)).to.be.within(0, 1);
    });
    it(`should generate a random value when 'mutationProbability' is a non-numeric character`, () => {
      const mutationProbability = 'a';
      expect(generateRandomMutationProbability(mutationProbability)).to.be.within(0, 1);
    });
  });

  describe('mutateSelection', () => {
    const { mutateSelection } = mutation;

    it('should not mutate the selction when mutationProbability < mutationProbabilityThreshold', () => {
      const selection = { bits: [0, 1, 1, 1, 1] };
      const mutationProbabilityThreshold = 0.5;
      const mutationProbability = 0.3
      const mutationPosition = 1;

      const result = mutateSelection(
        selection,
        mutationProbabilityThreshold,
        mutationProbability,
        mutationPosition
      );

      expect(result.bits).to.deep.equal(selection.bits);
    });

    it('should mutate the selction when mutationProbability > mutationProbabilityThreshold', () => {
      const selection = { bits: [0, 1, 1, 1, 1] };
      const mutationProbabilityThreshold = 0.5;
      const mutationProbability = 0.6
      const mutationPosition = 0;

      const result = mutateSelection(
        selection,
        mutationProbabilityThreshold,
        mutationProbability,
        mutationPosition
      );

      const expectedBits = [1, 1, 1, 1, 1];
      expect(result.bits).to.deep.equal(expectedBits);
    });
  });

  describe('mutateSelectionWithMutationRate', () => {
    const { mutateSelectionWithMutationRate } = mutation;

    it(`should perform 'n' mutations based upon the 'mutationRate'`, () => {
      const selection = { bits: [0, 1, 1, 1, 1] };
      const mutationProbabilityThreshold = 0.7;
      const mutationRate = 2;
      const mutationProbability = 0.9;
      const mutationPositions = [0, 2, 3];

      const result = mutateSelectionWithMutationRate(
        selection,
        mutationProbabilityThreshold,
        mutationRate,
        mutationProbability,
        mutationPositions
      );

      const { bits } = result;

      expect(bits[0]).to.equal(1);
      expect(bits[2]).to.equal(0);
      expect(bits[3]).to.equal(0);
    });
  });

  describe('retrieveMutationPosition', () => {
    const { retrieveMutationPosition } = mutation;
    it(`should return the 'mutationPosition' from 'mutationPositions' defined by 'index'`, () => {
      const mutationPositions = [1, 5, 7, 9];
      const index = 2;
      expect(retrieveMutationPosition(mutationPositions, index)).to.equal(7);
    });
    it(`should return the 'null' when 'mutationPositions' is not an array`, () => {
      const mutationPositions = null;
      const index = 2;
      expect(retrieveMutationPosition(mutationPositions, index)).to.equal(null);
    });
    it(`should return the 'null' when 'index' is not a number`, () => {
      const mutationPositions = [1, 5, 7, 9];
      const index = null;
      expect(retrieveMutationPosition(mutationPositions, index)).to.equal(null);
    });
    it(`should return the 'null' when 'index' does not represent a key within 'mutationPositions'`, () => {
      const mutationPositions = [1, 5, 7, 9];
      const index = 10;
      expect(retrieveMutationPosition(mutationPositions, index)).to.equal(null);
    });
  });
});
