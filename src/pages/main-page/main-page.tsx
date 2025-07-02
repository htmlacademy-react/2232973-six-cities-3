import OffersList from '@/components/offers-list';
import Map from '@/components/map';
import { useCallback, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCity } from '@/store/offers-slice';
import SortOptions from '@/components/sort-options/sort-options';
import { selectSortedOffers } from '@/store/selectors';
import { SIX_CITIES } from '@/const';
import { City } from '@/types/offers';
import Loader from '@/components/loader/loader';
import EmptyMain from '@/components/empty-main/empty-main';
import { pluralizeWord } from '@/common';

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.offers.city);
  const currentOffers = useAppSelector(selectSortedOffers);
  const isLoading = useAppSelector((state) => state.offers.isLoading);

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleOfferHover = useCallback((offerId: string | null) => {
    setSelectedOfferId(offerId);
  }, []);

  const handleCityClick = (city: City) => {
    dispatch(setCity(city));
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {SIX_CITIES.map((city) => (
              <li className="locations__item" key={city.name}>
                <a
                  className={`locations__item-link tabs__item ${city.name === selectedCity.name ? 'tabs__item--active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCityClick(city);
                  }}
                >
                  <span>{city.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="cities">
        <div className="cities__places-container container">
          {currentOffers.length === 0 ? (
            <EmptyMain city={selectedCity.name} />
          ) : (
            <>
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{currentOffers.length} {pluralizeWord(currentOffers.length, 'place')} to stay in {selectedCity.name}</b>
                <SortOptions />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={currentOffers}
                    onOfferHover={handleOfferHover}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <section className="cities__map map" style={{ backgroundImage: 'none' }}>
                  {currentOffers.length > 0 && (
                    <Map
                      city={selectedCity}
                      offers={currentOffers}
                      selectedOfferId={selectedOfferId}
                    />
                  )}
                </section>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
