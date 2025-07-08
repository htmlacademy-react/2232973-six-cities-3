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

  const baseClass = fullcard ? 'offer__bookmark-button' : 'place-card__bookmark-button';
  let activeClass = '';
  if (isFavorite) {
    activeClass = fullcard ? 'offer__bookmark-button--active' : 'place-card__bookmark-button--active';
  }

  return (
    <button
      className={`${baseClass} button ${activeClass}`.trim()}
      type="button"
      onClick={handleClick}
    >
      <svg
        className={fullcard ? 'offer__bookmark-icon' : 'place-card__bookmark-icon'}
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
