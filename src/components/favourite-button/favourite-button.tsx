import { useAppDispatch } from '@/hooks';
import { toggleFavourite } from '@/store/offers-slice';

type FavouriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  fullcard?: boolean;
}
export function FavouriteButton ({ offerId, isFavorite, fullcard = false }: FavouriteButtonProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(toggleFavourite({ offerId, status: isFavorite ? 0 : 1}));
  };

  return (
    <button
      className={`${fullcard ? 'offer' : 'place-card'}__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`}
      type="button"
      onClick={handleClick}
    >
      <svg
        className="place-card__bookmark-icon"
        width={fullcard ? 31 : 18}
        height={fullcard ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In favorites' : 'To favorites'}
      </span>
    </button>
  );
}

