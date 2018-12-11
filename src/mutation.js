const generateRandomMutationPosition = mutationPosition => selectionLength =>
  mutationPosition === null || isNaN(mutationPosition) ? Math.floor(Math.random() * selectionLength) : mutationPosition;

const generateRandomMutationProbability = mutationProbability =>
  mutationProbability === null || isNaN(mutationProbability) ? Math.random() : mutationProbability;

const mutateSelection = (
  selection,
  mutationProbabilityThreshold,
  mutationProbability = null,
  mutationPosition = null
) => {
  const mutationProbabilityLocal = generateRandomMutationProbability(mutationProbability);

  if (mutationProbabilityLocal < (1 - mutationProbabilityThreshold)) return selection;

  const selectionLength = selection.bits.length;
  const mutationPositionLocal = generateRandomMutationPosition(mutationPosition)(selectionLength);

  if (selection.bits[mutationPositionLocal] === 0) {
    selection.bits[mutationPositionLocal] = 1;
  } else {
    selection.bits[mutationPositionLocal] = 0;
  }

  return Object.assign({}, selection);
};

const mutateSelectionWithMutationRate = (
  selection,
  mutationProbabilityThreshold,
  mutationRate,
  mutationProbability = null,
  mutationPositions = null
) => {
  let mutatedSelection = Object.assign({}, selection);

  for (var i = 0; i <= mutationRate; i++) {
    mutatedSelection = mutateSelection(
      mutatedSelection,
      mutationProbabilityThreshold,
      mutationProbability,
      retrieveMutationPosition(mutationPositions, i)
    );
  }

  return mutatedSelection;
};

const retrieveMutationPosition = (mutationPositions, index) => {
  if (Array.isArray(mutationPositions) && !isNaN(index) && typeof mutationPositions[index] !== 'undefined') {
    return mutationPositions[index];
  }
  return null;
};

module.exports = {
  generateRandomMutationPosition: generateRandomMutationPosition,
  generateRandomMutationProbability: generateRandomMutationProbability,
  mutateSelection: mutateSelection,
  mutateSelectionWithMutationRate: mutateSelectionWithMutationRate,
  retrieveMutationPosition: retrieveMutationPosition,
};
