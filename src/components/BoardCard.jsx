import images from './images';

export default function BoardCard({ card, index, matched, clicked, handleFlipCard, icons = false }) {
  const isMatched = matched.includes(index);
  const isClicked = clicked.includes(index);
  const isVisible = isMatched || isClicked;

  const wrapperClass = isMatched
    ? (icons ? 'card selected-iconcard' : 'card selected-card')
    : isClicked
    ? (icons ? 'card clicked-iconcard' : 'card clicked-card')
    : 'card';

  const iconClass = isVisible ? 'iconcard is-visible' : 'iconcard';

  return (
    <button
      type="button"
      id={`card${index + 1}`}
      className={wrapperClass}
      aria-label={`Card ${index + 1}`}
      aria-pressed={isVisible}
      data-state={isMatched ? 'matched' : isClicked ? 'flipped' : 'hidden'}
      onClick={handleFlipCard(card, index)}
    >
      {icons ? (
        <img src={images[card]} alt={`Card ${card}`} className={iconClass} />
      ) : (
        isVisible ? card : null
      )}
    </button>
  );
}