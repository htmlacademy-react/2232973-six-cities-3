import Map from '@/components/map/map';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page';
import ReviewsList from '@/components/reviews-list/reviews-list';
import OffersList from '@/components/offers-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthStatus, selectOfferPageData, selectSortedComments } from '@/store/selectors';
import Loader from '@/components/loader/loader';
import { memo, useEffect, useMemo } from 'react';
import { clearNearbyOffers, clearSpecificOffer, fetchNearbyOffers, fetchOfferById } from '@/store/offers-slice';
import { capitalizeFirstLetter, pluralizeWord, getRatingWidth } from '@/common';
import { clearComments, fetchComments } from '@/store/comments-slice';
import { FavouriteButton } from '@/components/favourite-button/favourite-button';

const MAX_NEARBY_OFFERS = 3;
const MAX_IMAGES = 6;

export const OfferPage = memo((): JSX.Element => {
  const params = useParams();
  const dispatch = useAppDispatch();

  const {
    specificOffer: currentOffer,
    isLoading,
    nearbyOffers,
    isNearbyLoading,
  } = useAppSelector(selectOfferPageData);

  const comments = useAppSelector(selectSortedComments);
  const authorizationStatus = useAppSelector(selectAuthStatus);

  useEffect(() => {
    if (params.id) {
      dispatch(fetchOfferById(params.id));
      dispatch(fetchNearbyOffers(params.id));
      dispatch(fetchComments(params.id));
    }

    return () => {
      dispatch(clearSpecificOffer());
      dispatch(clearNearbyOffers());
      dispatch(clearComments());
    };
  }, [params.id, dispatch]);

  const limitedNearbyOffers = nearbyOffers.slice(0, MAX_NEARBY_OFFERS);
  const mapOffers = useMemo(() => {
    if (!currentOffer) {
      return [];
    }
    const uniqueNearby = limitedNearbyOffers.filter((o) => o.id !== currentOffer.id);
    return [currentOffer, ...uniqueNearby];
  }, [currentOffer, limitedNearbyOffers]);

  if (isLoading) {
    return <Loader />;
  }

  if (!currentOffer) {
    return <NotFoundPage />;
  }

  const { title, images, type, bedrooms, maxAdults, price, rating, goods, description, host, isPremium } = currentOffer;

  return (
    <main className="page__main page__main--offer">
      <section className="offer">
        <div className="offer__gallery-container container">
          <div className="offer__gallery">
            {
              images.slice(0, MAX_IMAGES).map((image) => (
                <div className="offer__image-wrapper" key={image}>
                  <img className="offer__image" src={image} alt="Photo studio" />
                </div>
              ))
            }
          </div>
        </div>
        <div className="offer__container container">
          <div className="offer__wrapper">
            {isPremium && (
              <div className="offer__mark">
                <span>Premium</span>
              </div>
            )}
            <div className="offer__name-wrapper">
              <h1 className="offer__name">{title}</h1>
              <FavouriteButton
                offerId={currentOffer.id}
                isFavorite={currentOffer.isFavorite}
                fullcard
              />
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: getRatingWidth(rating) }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizeFirstLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} {pluralizeWord(bedrooms, 'bedroom')}
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} {pluralizeWord(maxAdults, 'adult')}
              </li>
            </ul>
            <div className="offer__price">
              <b className="offer__price-value">€{price}</b>
              <span className="offer__price-text">&nbsp;night</span>
            </div>
            <div className="offer__inside">
              <h2 className="offer__inside-title">What&apos;s inside</h2>
              <ul className="offer__inside-list">
                {goods.map((good) => (
                  <li className="offer__inside-item" key={good}>
                    {good}
                  </li>
                ))}
              </ul>
            </div>
            <div className="offer__host">
              <h2 className="offer__host-title">Meet the host</h2>
              <div className="offer__host-user user">
                <div className={`offer__avatar-wrapper user__avatar-wrapper${host.isPro ? ' offer__avatar-wrapper--pro' : ''}`}>
                  <img className="offer__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                </div>
                <span className="offer__user-name">
                  {host.name}
                </span>
                {host.isPro && (
                  <span className="offer__user-status">
                    Pro
                  </span>
                )}
              </div>
              <div className="offer__description">
                <p className="offer__text">{description}</p>
              </div>
            </div>
            <ReviewsList authorizationStatus={authorizationStatus} reviews={comments} offerId={params.id}/>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            city={currentOffer.city}
            offers={mapOffers}
            selectedOfferId={currentOffer.id}
          />
        </section>
      </section>
      <div className="container">
        <section className="near-places places">
          <h2 className="near-places__title">Other places in the neighbourhood</h2>
          <div className="near-places__list places__list">
            {isNearbyLoading ?
              <Loader /> :
              <OffersList offers={limitedNearbyOffers} variant="near-places" />}
          </div>
        </section>
      </div>
    </main>
  );
});

OfferPage.displayName = 'OfferPage';

export default OfferPage;
