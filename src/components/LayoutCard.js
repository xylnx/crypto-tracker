import './LayoutCard.scss';

const LayoutCard = ({ cardTitle, children, fullWidth, classNames }) => {
  return (
    <div className={`card flow ${fullWidth ? 'grid-fw' : ''} ${classNames}`}>
      <h2 className="card__title">{cardTitle}</h2>
      {children}
    </div>
  );
};

export { LayoutCard };
