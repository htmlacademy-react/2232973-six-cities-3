import { render, screen } from '@testing-library/react';
import App from './app';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { offersReducer } from '@/store/offers-slice';
import { userReducer } from '@/store/user-slice';
import React from 'react';
import { vi } from 'vitest';
import { SIX_CITIES, AuthorizationStatus } from '@/const';


vi.mock('@/pages/main-page', () => ({ default: () => <div data-testid="main-page">Main Page</div> }));
vi.mock('@/pages/login-page', () => ({ default: () => <div data-testid="login-page">Login Page</div> }));
vi.mock('@/pages/favorites-page', () => ({ default: () => <div data-testid="favorites-page">Favourites Page</div> }));
vi.mock('@/pages/offer-page', () => ({ default: () => <div data-testid="offer-page">Offer Page</div> }));
vi.mock('@/pages/not-found-page', () => ({ default: () => <div data-testid="not-found-page">Not Found Page</div> }));

type RenderOptions = {
  preloadedState?: Record<string, unknown>;
};

const defaultOffersState = {
  city: SIX_CITIES[0],
  offers: [],
  specificOffer: null,
  sortType: 'Popular',
  favorites: [],
  isLoading: false,
  error: null,
  nearbyCards: [],
  isNearbyLoading: false,
};

const defaultUserState = {
  authorizationStatus: AuthorizationStatus.Unknown,
  user: null,
  error: null,
};

const withDefaultOffers = (preloadedState?: Record<string, unknown>) => ({
  offers: { ...defaultOffersState, ...(preloadedState?.offers || {}) },
  user: { ...defaultUserState, ...(preloadedState?.user || {}) },
});

const renderWithProviders = (ui: React.ReactElement, { preloadedState = {} }: RenderOptions = {}) => {
  const store = configureStore({
    reducer: { offers: offersReducer, user: userReducer },
    preloadedState: withDefaultOffers(preloadedState),
  });
  return render(
    <Provider store={store}>{ui}</Provider>
  );
};

describe('App', () => {
  it('renders main page on default route', () => {
    renderWithProviders(<App />);
    expect(screen.getByTestId('main-page')).toBeInTheDocument();
  });

  it('renders not found page on unknown route', () => {
    window.history.pushState({}, '', '/unknown');
    renderWithProviders(<App />);
    expect(screen.getByTestId('not-found-page')).toBeInTheDocument();
  });

  it('renders login page for /login if not authorized', () => {
    window.history.pushState({}, '', '/login');
    renderWithProviders(<App />, {
      preloadedState: { user: { authorizationStatus: AuthorizationStatus.NoAuth } },
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('redirects to main if authorized and tries to access /login', () => {
    window.history.pushState({}, '', '/login');
    renderWithProviders(<App />, {
      preloadedState: { user: { authorizationStatus: AuthorizationStatus.Auth } },
    });

    expect(screen.getByTestId('main-page')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('renders favorites page for /favorites if authorized', () => {
    window.history.pushState({}, '', '/favorites');
    renderWithProviders(<App />, {
      preloadedState: { user: { authorizationStatus: AuthorizationStatus.Auth } },
    });
    expect(screen.getByTestId('favorites-page')).toBeInTheDocument();
  });

  it('redirects to login if not authorized and tries to access /favorites', () => {
    window.history.pushState({}, '', '/favorites');
    renderWithProviders(<App />, {
      preloadedState: { user: { authorizationStatus: AuthorizationStatus.NoAuth } },
    });
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });

  it('renders offer page for /offer', () => {
    window.history.pushState({}, '', '/offer/123');
    renderWithProviders(<App />, {
      preloadedState: { user: { authorizationStatus: AuthorizationStatus.Auth } },
    });
    expect(screen.getByTestId('offer-page')).toBeInTheDocument();
  });
});
