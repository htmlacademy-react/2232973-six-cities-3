import Card from '@/components/card';
import { Offer } from '@/types/offers';
import { memo } from 'react';

type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
  variant?: 'vertical' | 'horizontal';
};

const OffersList = memo<OffersListProps>(({ offers, onOfferHover, variant = 'vertical' }: OffersListProps) => (
  <>
    {offers.map((offer) => (
      <Card
        key={offer.id}
        offer={offer}
        onOfferHover={onOfferHover}
        variant={variant}
      />
    ))}
  </>
));

OffersList.displayName = 'OffersList';

export default OffersList;
