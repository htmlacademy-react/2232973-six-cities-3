import Card from '@/components/card';
import { Offer } from '@/types/offers';
import { useState } from 'react';

type OffersListProps = {
  offers: Offer[];
  variant?: 'vertical' | 'horizontal';
};

export default function OffersList({ offers, variant = 'vertical' }: OffersListProps): JSX.Element {
  const [activeOfferId, setActiveOfferId] = useState<string | null>(null);

  return (
    <>
      {offers.map((offer) => (
        <Card
          key={offer.id}
          offer={offer}
          onMouseEnter={() => setActiveOfferId(offer.id)}
          onMouseLeave={() => setActiveOfferId(null)}
          isActive={activeOfferId === offer.id}
          variant={variant}
        />
      ))}
    </>
  );
}
