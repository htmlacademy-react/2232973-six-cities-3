import Card from '@/components/card';
import { Offer } from '@/types/offers';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
};

export default function OffersList({ offers }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
          isActive={activeOfferId === offer.id}
        />
      ))}
    </div>
  );
}
