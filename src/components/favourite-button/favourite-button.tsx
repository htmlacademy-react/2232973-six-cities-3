import { useAppDispatch, useAppSelector } from '@/hooks';
import { toggleFavourite } from '@/store/offers-slice';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { selectAuthStatus } from '@/store/selectors';
import { AuthorizationStatus, AppRoute } from '@/const';

type FavouriteButtonProps = {
  offerId: string;
  isFavorite: boolean;
  fullcard?: boolean;
}

export const FavouriteButton = memo(({ offerId, isFavorite, fullcard = false }: FavouriteButtonProps): JSX.Element => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useAppSelector(selectAuthStatus);

  const handleClick = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      navigate(AppRoute.Login);
      return;
    }
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
});

FavouriteButton.displayName = 'FavouriteButton';

export default FavouriteButton;
