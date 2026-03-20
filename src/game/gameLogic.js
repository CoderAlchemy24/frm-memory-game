const SMALL_GRID_VALUES = [1, 2, 3, 4, 5, 6, 7, 8];
const LARGE_GRID_VALUES = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18,
];

export const getUniqueCardValues = (is4x4 = true) => (
  is4x4 ? [...SMALL_GRID_VALUES] : [...LARGE_GRID_VALUES]
);

export const createShuffledDeck = (is4x4 = true, randomFn = Math.random) => {
  const deck = [...getUniqueCardValues(is4x4), ...getUniqueCardValues(is4x4)];

  for (let index = deck.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(randomFn() * (index + 1));
    [deck[index], deck[swapIndex]] = [deck[swapIndex], deck[index]];
  }

  return deck;
};

export const formatElapsedTime = (seconds) => {
  const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
  const remainingSeconds = (seconds % 60).toString().padStart(2, '0');

  return `${minutes}:${remainingSeconds}`;
};

export const isBoardComplete = (matchedIndices = [], boardCards = []) => (
  boardCards.length > 0 && matchedIndices.length === boardCards.length
);

export const cardsMatchAtIndices = (boardCards, firstIndex, secondIndex) => (
  boardCards[firstIndex] === boardCards[secondIndex]
);

export const clampPlayersCount = (playersCount = 2) => (
  Math.max(2, Math.min(4, playersCount))
);

export const createInitialScores = (playersCount = 2, initialScores = []) => {
  const clampedPlayers = clampPlayersCount(playersCount);
  const nextScores = initialScores.slice(0, clampedPlayers);

  while (nextScores.length < clampedPlayers) {
    nextScores.push(0);
  }

  return nextScores;
};

export const getNextPlayerIndex = ({ currentPlayer, isMatch, playersCount }) => {
  const clampedPlayers = clampPlayersCount(playersCount);

  return isMatch ? currentPlayer : (currentPlayer + 1) % clampedPlayers;
};

export const getWinnerNames = (scores = []) => {
  if (!scores.length) {
    return [];
  }

  const maxScore = Math.max(...scores);

  return scores
    .map((score, index) => (score === maxScore ? `Player ${index + 1}` : null))
    .filter(Boolean);
};

export const buildPlayersForPanel = (scores = [], playersCount = scores.length || 2) => {
  const clampedPlayers = clampPlayersCount(playersCount);
  const normalizedScores = createInitialScores(clampedPlayers, scores);

  return Array.from({ length: clampedPlayers }, (_, index) => ({
    player: `Player ${index + 1}`,
    score: normalizedScores[index],
  }));
};

export const buildPlayerSummaries = (scores = [], playersCount = scores.length || 2) => {
  const players = buildPlayersForPanel(scores, playersCount);

  return players.map((player, index) => ({
    ...player,
    index,
  }));
};