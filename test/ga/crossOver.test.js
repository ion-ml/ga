const expect = require('chai').expect;

const crossOver = require('../../src/ga/crossOver');

describe('crossOver', () => {
  describe('generateRandomCrossOverPosition', () => {
    const { generateRandomCrossOverPosition } = crossOver;
    it('should generate a random value between 0 and the length of the selection', () => {
      const selectionLength = 20;
      expect(generateRandomCrossOverPosition(selectionLength)).to.be.within(0, selectionLength);
    });
  });

  describe('performCrossOver', () => {
    const { performCrossOver } = crossOver;
    describe('should return the crossed-over bits', () => {
      it(`where 'modifiedBitsA' contains all ones and 'modifiedBitsB' contains all zeros`, () => {
        const bitsA = [1, 0, 0, 0, 0];
        const bitsB = [0, 1, 1, 1, 1];
        const crossOverPosition = 1;

        const modifiedBitsA = performCrossOver(bitsA, bitsB, crossOverPosition);
        const modifiedBitsB = performCrossOver(bitsB, bitsA, crossOverPosition);

        modifiedBitsA.forEach(bit => {
          expect(bit).to.equal(1);
        });

        modifiedBitsB.forEach(bit => {
          expect(bit).to.equal(0);
        });
      });
    });
  });

  describe('singlePointCrossOver', () => {
    const { singlePointCrossOver } = crossOver;
    it('should perform the cross-over and return both of the updated objects within an array', () => {
      const selectionA = { bits: [1, 0, 0, 0, 0] };
      const selectionB = { bits: [0, 1, 1, 1, 1] };
      const crossOverPosition = 1;

      const results = singlePointCrossOver(
        selectionA,
        selectionB,
        crossOverPosition
      );

      const modifiedSelectionA = results[0];
      const modifiedSelectionB = results[1];

      const { bits: modifiedBitsA } = modifiedSelectionA;
      const { bits: modifiedBitsB } = modifiedSelectionB;

      modifiedBitsA.forEach(bit => {
        expect(bit).to.equal(1);
      });

      modifiedBitsB.forEach(bit => {
        expect(bit).to.equal(0);
      });
    });
  });

  describe('singlePointCrossOverWithProbabilityCheck', () => {
    const { singlePointCrossOverWithProbabilityCheck } = crossOver;

    it(`should return the origin selections when 'probabilityOfCrossOver' < 'probabilityThreshold'`, () => {
      const selectionA = { bits: [1, 0, 0, 0, 0] };
      const selectionB = { bits: [0, 1, 1, 1, 1] };
      const probabilityThreshold = 0.8;
      const probabilityOfCrossOver = 0.1;

      const results = singlePointCrossOverWithProbabilityCheck(
        selectionA,
        selectionB,
        probabilityThreshold,
        probabilityOfCrossOver
      );

      const { bits: bitsA } = results[0];
      const { bits: bitsB } = results[1];

      bitsA.forEach((bit, index) => {
        expect(bit).to.equal(selectionA.bits[index]);
      });

      bitsB.forEach((bit, index) => {
        expect(bit).to.equal(selectionB.bits[index]);
      });
    });
    it(`should return modified selections when 'probabilityOfCrossOver' > 'probabilityThreshold'`, () => {
      const selectionA = { bits: [1, 0, 0, 0, 0] };
      const selectionB = { bits: [0, 1, 1, 1, 1] };
      const probabilityThreshold = 0.2;
      const probabilityOfCrossOver = 0.9;
      const crossOverPosition = 1;

      const results = singlePointCrossOverWithProbabilityCheck(
        selectionA,
        selectionB,
        probabilityThreshold,
        probabilityOfCrossOver,
        crossOverPosition
      );

      const { bits: bitsA } = results[0];
      const { bits: bitsB } = results[1];

      bitsA.forEach((bit, index) => {
        expect(bit).to.equal(1);
      });

      bitsB.forEach((bit, index) => {
        expect(bit).to.equal(0);
      });
    });
  });
});
