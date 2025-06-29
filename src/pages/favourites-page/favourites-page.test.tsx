import { render, screen } from '@testing-library/react';
import FavouritesPage from './favourites-page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '@/store/offers-slice';
import { userReducer } from '@/store/user-slice';
import { commentsReducer } from '@/store/comments-slice';
import { SIX_CITIES, AuthorizationStatus } from '@/const';
import { vi } from 'vitest';
import type { State } from '@/types/state';

vi.mock('@/components/offers-list', () => ({ default: () => <div data-testid="offers-list" /> }));

const mockOfferParis = {
  id: '1',
  city: SIX_CITIES[0],
  location: { latitude: 0, longitude: 0, zoom: 10 },
  isFavorite: true,
  isPremium: false,
  price: 100,
  rating: 4,
  title: 'Paris Offer',
  description: '',
  bedrooms: 1,
  goods: [],
  host: { name: '', avatarUrl: '', isPro: false },
  images: [],
  maxAdults: 2,
  previewImage: '',
  type: '',
};
const mockOfferCologne = {
  ...mockOfferParis,
  id: '2',
  city: SIX_CITIES[1],
  title: 'Cologne Offer',
};

function renderWithStore(preloadedState: Partial<State>) {
  const store = configureStore({
    reducer: { offers: offersReducer, user: userReducer, comments: commentsReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <FavouritesPage />
    </Provider>
  );
}

describe('FavouritesPage', () => {
  it('shows empty state if no favourites', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favourites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('shows grouped favourites by city', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favourites: [mockOfferParis, mockOfferCologne], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Cologne')).toBeInTheDocument();
    expect(screen.getAllByTestId('offers-list')).toHaveLength(2);
  });
});
