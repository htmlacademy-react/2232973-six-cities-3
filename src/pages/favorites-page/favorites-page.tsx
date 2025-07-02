import OffersList from '@/components/offers-list';
import { useAppSelector } from '@/hooks';
import { selectFavourites } from '@/store/selectors';
import { Offer } from '@/types/offers';


function groupOffersByCity(offers: Offer[]): Record<string, Offer[]> {
  return offers.reduce<Record<string, Offer[]>>((acc, offer) => {
    const city = offer.city.name;
    if (!acc[city]) {
      acc[city] = [];
    }
    acc[city].push(offer);
    return acc;
  }, {});
}


export default function FavouritesPage(): JSX.Element {
  const offers = useAppSelector(selectFavourites);

  const groupedOffers = groupOffersByCity(offers);
  const isEmpty = offers.length === 0;

  return (
    <div className={`page${isEmpty ? ' page--favorites-empty' : ''}`}>
      <main className={`page__main page__main--favorites${isEmpty ? ' page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {isEmpty ? (
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          ) : (
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <ul className="favorites__list">
                {Object.entries(groupedOffers).map(([cityName, cityOffers]) => (
                  <li className="favorites__locations-items" key={cityName}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item">
                        <a className="locations__item-link" href="#">
                          <span>{cityName}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      <OffersList offers={cityOffers} variant="horizontal" />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
