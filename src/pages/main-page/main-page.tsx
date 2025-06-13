import OffersList from '@/components/offers-list';
import Map from '@/components/map';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setCity, setOffers } from '@/store/action';
import { mockOffers } from '@/mocks/offers';
import SortOptions from '@/components/sort-options/sort-options';
import { selectSortedOffers } from '@/store/selector';

const SIX_CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'] as const;

export default function MainPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const selectedCity = useAppSelector((state) => state.city.name);
  const offers = useAppSelector(selectSortedOffers);

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);

  const handleOfferHover = (offerId: string | null) => {
    setSelectedOfferId(offerId);
  };

  const handleCityClick = (cityName: string) => {
    const cityObj = mockOffers.find((offer) => offer.city.name === cityName)?.city;
    if (cityObj) {
      dispatch(setCity(cityObj));
      dispatch(setOffers(mockOffers.filter((offer) => offer.city.name === cityName)));
    }
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {SIX_CITIES.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  className={`locations__item-link tabs__item ${city === selectedCity ? 'tabs__item--active' : ''}`}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleCityClick(city);
                  }}
                >
                  <span>{city}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <div className="cities">
        <div className="cities__places-container container">
          <section className="cities__places places">
            <h2 className="visually-hidden">Places</h2>
            <b className="places__found">{offers.length} places to stay in {selectedCity}</b>
            <SortOptions />
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={offers}
                onOfferHover={handleOfferHover}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map" style={{ backgroundImage: 'none' }}>
              {offers.length > 0 && (
                <Map
                  city={offers[0].city}
                  offers={offers}
                  selectedOfferId={selectedOfferId}
                />
              )}
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
