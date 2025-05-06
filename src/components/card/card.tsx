import { Offer } from '@/types/offers';

type CardProps = {
  offer: Offer;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  isActive?: boolean;
  variant?: 'vertical' | 'horizontal';
};

const cardConfig = {
  vertical: {
    articleClass: 'cities__card place-card',
    imageWrapperClass: 'cities__image-wrapper place-card__image-wrapper',
    infoClass: 'place-card__info',
    imageWidth: 260,
    imageHeight: 200,
  },
  horizontal: {
    articleClass: 'favorites__card place-card',
    imageWrapperClass: 'favorites__image-wrapper place-card__image-wrapper',
    infoClass: 'favorites__card-info place-card__info',
    imageWidth: 150,
    imageHeight: 110,
  },
} as const;


export default function Card({
  offer,
  onMouseEnter,
  onMouseLeave,
  isActive,
  variant = 'vertical'
}: CardProps): JSX.Element {
  const { isPremium, price, title, type, rating, images} = offer;
  const ratingWidth = `${Math.round(rating) * 20}%`;

  const config = cardConfig[variant];

  return (
    <article
      className={config.articleClass}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ background: isActive ? 'lightblue' : 'white' }}
    >
      {isPremium && (
        <div className ="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={config.imageWrapperClass}>
        <a href="#">
          <img
            className="place-card__image"
            src={images[0]}
            width={config.imageWidth}
            height={config.imageHeight}
            alt="Place image"
          />
        </a>
      </div>
      <div className={config.infoClass}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className="place-card__bookmark-button button" type="button">
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: ratingWidth }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
