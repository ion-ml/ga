const generateRandomCrossOverPosition = (selectionLength) =>
  Math.floor(Math.random() * selectionLength);

const performCrossOver = (bitsA, bitsB, crossOverPosition) =>
  [...bitsA.slice(0, crossOverPosition), ...bitsB.slice(crossOverPosition, bitsB.length)];

const singlePointCrossOver = (
  selectionA,
  selectionB,
  crossOverPosition = null
) => {
  const { bits: bitsA } = selectionA;
  const { bits: bitsB } = selectionB;

  if (bitsA.length !== bitsB.length) return false;

  if (!crossOverPosition) {
    crossOverPosition = generateRandomCrossOverPosition(bitsA.length);
  }

  const modifiedBitsA = performCrossOver(bitsA, bitsB, crossOverPosition);
  const modifiedBitsB = performCrossOver(bitsB, bitsA, crossOverPosition);

  return [
    Object.assign({}, selectionA, { bits: modifiedBitsA }),
    Object.assign({}, selectionB, { bits: modifiedBitsB }),
  ];
};

const singlePointCrossOverWithProbabilityCheck = (
  selectionA,
  selectionB,
  probabilityThreshold,
  probabilityOfCrossOver = null,
  crossOverPosition = null
) => {
  if (probabilityOfCrossOver === null) {
    probabilityOfCrossOver = Math.random();
  }

  if (probabilityOfCrossOver > (1 - probabilityThreshold)) {
    return singlePointCrossOver(
      selectionA,
      selectionB,
      crossOverPosition
    );
  }

  return [
    Object.assign({}, selectionA),
    Object.assign({}, selectionB),
  ];
};

module.exports = {
  generateRandomCrossOverPosition: generateRandomCrossOverPosition,
  performCrossOver: performCrossOver,
  singlePointCrossOver: singlePointCrossOver,
  singlePointCrossOverWithProbabilityCheck: singlePointCrossOverWithProbabilityCheck,
};
