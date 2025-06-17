import Map from '@/components/map/map';
import { useParams } from 'react-router-dom';
import NotFoundPage from '../not-found-page';
import ReviewsList from '@/components/reviews-list/reviews-list';
import OffersList from '@/components/offers-list';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectAuthStatus, selectOfferPageData } from '@/store/selectors';
import Loader from '@/components/loader/loader';
import { useEffect } from 'react';
import { clearNearbyOffers, clearSpecificOffer, fetchNearbyOffers, fetchOfferById } from '@/store/offers-slice';
import { capitalizeFirstLetter } from '@/common';
import { fetchComments } from '@/store/comments-slice';

const MAX_NEARBY_OFFERS = 3;

export default function OfferPage(): JSX.Element {
  const params = useParams();
  const dispatch = useAppDispatch();

  const {
    specificOffer: currentOffer,
    comments,
    isLoading,
    nearbyOffers,
    isNearbyLoading,
  } = useAppSelector(selectOfferPageData);

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
    };
  }, [params.id, dispatch]);

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
              images.map((image) => (
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
              <button className="offer__bookmark-button button" type="button">
                <svg className="offer__bookmark-icon" width="31" height="33">
                  <use xlinkHref="#icon-bookmark"></use>
                </svg>
                <span className="visually-hidden">To bookmarks</span>
              </button>
            </div>
            <div className="offer__rating rating">
              <div className="offer__stars rating__stars">
                <span style={{ width: '80%' }}></span>
                <span className="visually-hidden">Rating</span>
              </div>
              <span className="offer__rating-value rating__value">{rating}</span>
            </div>
            <ul className="offer__features">
              <li className="offer__feature offer__feature--entire">
                {capitalizeFirstLetter(type)}
              </li>
              <li className="offer__feature offer__feature--bedrooms">
                {bedrooms} Bedrooms
              </li>
              <li className="offer__feature offer__feature--adults">
                  Max {maxAdults} adults
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
                <div className="offer__avatar-wrapper offer__avatar-wrapper--pro user__avatar-wrapper">
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
            <ReviewsList authorizationStatus={authorizationStatus} reviews={comments}/>
          </div>
        </div>
        <section className="offer__map map">
          <Map
            city={currentOffer.city}
            offers={nearbyOffers.slice(0, MAX_NEARBY_OFFERS)}
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
              <OffersList offers={nearbyOffers.slice(0, MAX_NEARBY_OFFERS)} variant="vertical" />}
          </div>
        </section>
      </div>
    </main>
  );
}
