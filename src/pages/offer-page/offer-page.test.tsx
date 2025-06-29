import { render, screen } from '@testing-library/react';
import OfferPage from './offer-page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '@/store/offers-slice';
import { userReducer } from '@/store/user-slice';
import { commentsReducer } from '@/store/comments-slice';
import { SIX_CITIES, AuthorizationStatus } from '@/const';
import { vi } from 'vitest';
import type { State } from '@/types/state';

vi.mock('@/components/map/map', () => ({ default: () => <div data-testid="map" /> }));
vi.mock('@/components/loader/loader', () => ({ default: () => <div data-testid="loader" /> }));
vi.mock('@/components/offers-list', () => ({ default: () => <div data-testid="offers-list" /> }));
vi.mock('@/components/reviews-list/reviews-list', () => ({ default: () => <div data-testid="reviews-list" /> }));
vi.mock('@/components/favourite-button/favourite-button', () => ({ FavouriteButton: () => <button data-testid="fav-btn" /> }));
vi.mock('../not-found-page', () => ({ default: () => <div data-testid="not-found" /> }));

const mockOffer = {
  id: '1',
  city: SIX_CITIES[0],
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: false,
  isPremium: true,
  price: 100,
  rating: 4.5,
  title: 'Test Offer',
  description: 'desc',
  bedrooms: 2,
  goods: ['Wi-Fi', 'Kitchen'],
  host: { name: 'Host', avatarUrl: '', isPro: true },
  images: ['img1.jpg', 'img2.jpg'],
  maxAdults: 3,
  previewImage: '',
  type: 'apartment',
};

const mockNearby = [
  { ...mockOffer, id: '2', title: 'Nearby 1' },
  { ...mockOffer, id: '3', title: 'Nearby 2' },
  { ...mockOffer, id: '4', title: 'Nearby 3' },
  { ...mockOffer, id: '5', title: 'Nearby 4' },
];

const mockComments = [
  { id: 'c1', date: '2023-01-01', user: { name: 'User', avatarUrl: '', isPro: false }, comment: 'Nice!', rating: 5, offerId: '1' },
  { id: 'c2', date: '2023-01-02', user: { name: 'User2', avatarUrl: '', isPro: false }, comment: 'Bad', rating: 2, offerId: '1' },
];

function renderWithStore(preloadedState: Partial<State>) {
  const store = configureStore({
    reducer: { offers: offersReducer, user: userReducer, comments: commentsReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <OfferPage />
    </Provider>
  );
}

describe('OfferPage', () => {
  it('shows Loader when isLoading', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: true, sortType: 'Popular', favourites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows NotFoundPage if no offer', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favourites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByTestId('not-found')).toBeInTheDocument();
  });

  it('shows offer content, reviews, map and nearby offers', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favourites: [], specificOffer: mockOffer, error: null, nearbyCards: mockNearby, isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.Auth, user: null, error: null },
      comments: { comments: mockComments, isSending: false },
    });
    expect(screen.getByText('Test Offer')).toBeInTheDocument();
    expect(screen.getByTestId('reviews-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('fav-btn')).toBeInTheDocument();
  });

  it('shows Loader for nearby offers if isNearbyLoading', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favourites: [], specificOffer: mockOffer, error: null, nearbyCards: mockNearby, isNearbyLoading: true },
      user: { authorizationStatus: AuthorizationStatus.Auth, user: null, error: null },
      comments: { comments: mockComments, isSending: false },
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });
});
