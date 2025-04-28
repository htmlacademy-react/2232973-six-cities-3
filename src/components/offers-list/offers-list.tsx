import Card from '@/components/card';
import { Offer } from '@/types/offers';

type OffersListProps = {
  offers: Offer[];
};

export default function OffersList({ offers }: OffersListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
        />
      ))}
    </div>
  );
}
