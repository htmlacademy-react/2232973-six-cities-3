import OffersList from '@/components/offers-list';
import Map from '@/components/map';
import { Offer } from '@/types/offers';
import { useState } from 'react';

type MainPageProps = {
  rentalOffersCount: number;
  offers: Offer[];
};

const cities = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export default function MainPage({ rentalOffersCount, offers }: MainPageProps): JSX.Element {
  const activeCity = 'Amsterdam';

  const [selectedOfferId, setSelectedOfferId] = useState<string | null>(null);
  const handleOfferHover = (offerId: string | null) => {
    setSelectedOfferId(offerId);
  };

  return (
    <main className="page__main page__main--index">
      <h1 className="visually-hidden">Cities</h1>
      <div className="tabs">
        <section className="locations container">
          <ul className="locations__list tabs__list">
            {cities.map((city) => (
              <li className="locations__item" key={city}>
                <a
                  className={`locations__item-link tabs__item ${city === activeCity ? 'tabs__item--active' : ''}`}
                  href="#"
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
            <b className="places__found">{rentalOffersCount} places to stay in Amsterdam</b>
            <form className="places__sorting" action="#" method="get">
              <span className="places__sorting-caption">Sort by</span>
              <span className="places__sorting-type" tabIndex={0}>
                Popular
                <svg className="places__sorting-arrow" width="7" height="4">
                  <use xlinkHref="#icon-arrow-select"></use>
                </svg>
              </span>
              <ul className="places__options places__options--custom places__options--opened">
                <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                <li className="places__option" tabIndex={0}>Price: low to high</li>
                <li className="places__option" tabIndex={0}>Price: high to low</li>
                <li className="places__option" tabIndex={0}>Top rated first</li>
              </ul>
            </form>
            <div className="cities__places-list places__list tabs__content">
              <OffersList
                offers={offers}
                onOfferHover={handleOfferHover}
              />
            </div>
          </section>
          <div className="cities__right-section">
            <section className="cities__map map">
              <Map
                city={offers[0].city}
                offers={offers}
                selectedOfferId={selectedOfferId}
              />
            </section>
          </div>
        </div>
      </div>
    </main>
  );
}
