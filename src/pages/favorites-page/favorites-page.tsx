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

  return (
    <main className="page__main page__main--favorites">
      <div className="page__favorites-container container">
        <section className="favorites">
          {offers.length > 0 ? (
            <><h1 className="favorites__title">Saved listing</h1>
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
            </>
          ) : (
            <div className="favorites__status-wrapper">
              <b className="favorites__status">Nothing yet saved.</b>
              <p className="favorites__status-description">
                Save properties to narrow down search or plan your future trips.
              </p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
