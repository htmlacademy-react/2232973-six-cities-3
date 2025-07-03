import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import MainPage from './main-page';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '@/store/offers-slice';
import { userReducer } from '@/store/user-slice';
import { commentsReducer } from '@/store/comments-slice';
import { SIX_CITIES, AuthorizationStatus } from '@/const';
import { vi } from 'vitest';
import type { State } from '@/types/state';

vi.mock('@/components/map', () => ({ default: () => <div data-testid="map" /> }));
vi.mock('@/components/loader/loader', () => ({ default: () => <div data-testid="loader" /> }));
vi.mock('@/components/offers-list', () => ({ default: () => <div data-testid="offers-list" /> }));
vi.mock('@/components/sort-options/sort-options', () => ({ default: () => <div data-testid="sort-options" /> }));
vi.mock('@/components/empty-main/empty-main', () => ({ default: ({ city }: { city: string }) => <div data-testid="empty-main">No places in {city}</div> }));

const mockOffer = {
  id: '1',
  city: SIX_CITIES[0],
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

function renderWithStore(preloadedState: Partial<State>) {
  const store = configureStore({
    reducer: { offers: offersReducer, user: userReducer, comments: commentsReducer },
    preloadedState,
  });
  return render(
    <Provider store={store}>
      <MainPage />
    </Provider>
  );
}

describe('MainPage', () => {
  it('shows Loader when isLoading', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: true, sortType: 'Popular', favorites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('shows empty state if no offers', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favorites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByTestId('empty-main')).toHaveTextContent('No places in Paris');
  });

  it('shows offers list if there are offers', () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [mockOffer], isLoading: false, sortType: 'Popular', favorites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    expect(screen.getByTestId('offers-list')).toBeInTheDocument();
    expect(screen.getByTestId('map')).toBeInTheDocument();
    expect(screen.getByTestId('sort-options')).toBeInTheDocument();
  });

  it('switches city by clicking', async () => {
    renderWithStore({
      offers: { city: SIX_CITIES[0], offers: [], isLoading: false, sortType: 'Popular', favorites: [], specificOffer: null, error: null, nearbyCards: [], isNearbyLoading: false },
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null, error: null },
      comments: { comments: [], isSending: false },
    });
    const amsterdamTab = screen.getByText('Amsterdam');
    fireEvent.click(amsterdamTab);
    await waitFor(() => {
      const amsterdamLink = amsterdamTab.closest('a');
      const parisLink = screen.getByText('Paris').closest('a');
      expect(amsterdamLink).toHaveClass('tabs__item--active');
      expect(parisLink).not.toHaveClass('tabs__item--active');
    });
  });
});
