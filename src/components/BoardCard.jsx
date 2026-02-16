import images from './images';

export default function BoardCard({ card, index, matched, clicked, handleFlipCard, icons = false }) {
  const isMatched = matched.includes(index);
  const isClicked = clicked.includes(index);

  const wrapperClass = isMatched
    ? (icons ? 'card selected-iconcard' : 'card selected-card')
    : isClicked
    ? (icons ? 'card clicked-iconcard' : 'card clicked-card')
    : 'card';

  const iconClass = isMatched
    ? 'iconcard selected-iconcard'
    : isClicked
    ? 'iconcard clicked-iconcard'
    : 'iconcard';

  return (
    <div
      key={index}
      id={`card${index + 1}`}
      className={wrapperClass}
      onClick={handleFlipCard(card, index)}
    >
      {icons ? (
        <img src={images[card]} alt={`Card ${card}`} className={iconClass} />
      ) : (
        card
      )}
    </div>
  );
}