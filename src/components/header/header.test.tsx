import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureMockStore } from '@jedmao/redux-mock-store';
import { AuthorizationStatus } from '@/const';

const mockStore = configureMockStore();

describe('Header', () => {
  it('renders Sign in when not authorized', () => {
    const store = mockStore({
      user: { authorizationStatus: AuthorizationStatus.NoAuth, user: null },
      offers: { favorites: [] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Sign in')).toBeInTheDocument();
    expect(screen.queryByText('Sign out')).not.toBeInTheDocument();
  });

  it('renders user email, avatar and favourite count when authorized', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@mail.com', avatarUrl: 'avatar.png', name: '', isPro: false, token: '' },
      },
      offers: { favorites: [{ id: 1 }, { id: 2 }] },
    });
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('test@mail.com')).toBeInTheDocument();
    expect(screen.getByAltText('User avatar')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('calls dispatch on sign out click', () => {
    const store = mockStore({
      user: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: { email: 'test@mail.com', avatarUrl: 'avatar.png', name: '', isPro: false, token: '' },
      },
      offers: { favorites: [{ id: 1 }] },
    });
    store.dispatch = vi.fn();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Header />
        </MemoryRouter>
      </Provider>
    );
    fireEvent.click(screen.getByText('Sign out'));
    expect(store.dispatch).toHaveBeenCalled();
  });
});
