import Card from '@/components/card';
import { Offer } from '@/types/offers';


type OffersListProps = {
  offers: Offer[];
  onOfferHover?: (offerId: string | null) => void;
  variant?: 'vertical' | 'horizontal';
};

export default function OffersList({ offers, onOfferHover, variant = 'vertical' }: OffersListProps): JSX.Element {

  return (
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
  );
}
