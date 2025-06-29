import { render, screen } from '@testing-library/react';
import OffersList from './offers-list';
import { vi } from 'vitest';

vi.mock('@/components/card', () => ({
  __esModule: true,
  default: ({ offer }: { offer: { title: string } }) => <div data-testid="card">{offer.title}</div>,
}));

const offer = {
  id: '1',
  city: { name: 'Paris', location: { latitude: 0, longitude: 0, zoom: 10 } },
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: false,
  isPremium: false,
  price: 100,
  rating: 4,
  title: 'Test Offer',
  description: '',
  bedrooms: 1,
  goods: [],
  host: { name: '', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 2,
  previewImage: '',
  type: '',
};

describe('OffersList', () => {
  it('renders a list of Card components', () => {
    render(<OffersList offers={[offer, { ...offer, id: '2', title: 'Second' }]} />);
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByText('Second')).toBeInTheDocument();
    expect(screen.getAllByTestId('card')).toHaveLength(2);
  });

  it('calls onOfferHover when provided (prop is passed)', () => {
    const onOfferHover = vi.fn();
    render(<OffersList offers={[offer]} onOfferHover={onOfferHover} />);
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
  });
});
